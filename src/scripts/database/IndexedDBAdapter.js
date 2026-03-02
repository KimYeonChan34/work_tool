import DatabaseAdapter from './DatabaseAdapter.js';

export default class IndexedDBAdapter extends DatabaseAdapter {
    static TRANSACTION = {
        READWRITE: 'readwrite',
        READONLY: 'readonly',
    };
    static NAME = 'work_tool_db';
    static VERSION = 1;

    constructor() {
        super();

        this.db = null;
    }

    async setup() {
        await this.#open();
    }

    insert(storeName, key, value) {
        const preparedValue = this.#prepareValue(storeName, key, value);

        return this.#query(storeName, 'readwrite', (store) => {
            return store.add(preparedValue);
        });
    }

    selectAll(storeName) {
        return this.#query(storeName, IndexedDBAdapter.TRANSACTION.READONLY, (store) => {
            return store.getAll();
        });
    }

    select(storeName, key) {
        return this.#query(storeName, IndexedDBAdapter.TRANSACTION.READONLY, (store) => {
            return store.get(key);
        });
    }

    isExists(storeName, key) {
        return this.#query(storeName, IndexedDBAdapter.TRANSACTION.READONLY, (store) => {
            return store.getKey(key);
        });
    }

    update(storeName, key, value) {
        const preparedValue = this.#prepareValue(storeName, key, value);

        return this.#query(storeName, IndexedDBAdapter.TRANSACTION.READWRITE, (store) => {
            return store.put(preparedValue);
        });
    }

    delete(storeName, key) {
        return this.#query(storeName, IndexedDBAdapter.TRANSACTION.READWRITE, (store) => {
            return store.delete(key);
        });
    }

    close() {
        if (this.db !== null) {
            this.db.close();
        }

        this.db = null;
    }

    #open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(IndexedDBAdapter.NAME, IndexedDBAdapter.VERSION);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                for (const storeName of Object.values(DatabaseAdapter.STORES)) {
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName, DatabaseAdapter.STORE_CONFIG[storeName]);
                    }
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;

                resolve(true);
            };

            request.onerror = () => {
                console.error(request.error);

                reject(new Error('IndexedDB open failed'));
            };

            request.onblocked = () => {
                reject(new Error('IndexedDB open blocked'));
            };
        });
    }

    #prepareValue(storeName, key, value) {
        const config = DatabaseAdapter.STORE_CONFIG[storeName];
        if (!config) {
            throw new Error('Invalid storeName');
        }

        value[config.keyPath] = key;

        return value;
    }

    #query(storeName, mode, operation) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, mode);
            const store = transaction.objectStore(storeName);

            const request = operation(store);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }
}
