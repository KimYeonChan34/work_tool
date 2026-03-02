export default class DatabaseAdapter {
    static STORES = {
        USER: 'user',
        SESSION: 'session',
    };
    static STORE_CONFIG = {
        [DatabaseAdapter.STORES.USER]: { keyPath: 'id' },
        [DatabaseAdapter.STORES.SESSION]: { keyPath: 'id' },
    };

    constructor() {
        if (new.target === DatabaseAdapter) {
            throw new Error('Cannot instantiate abstract class');
        }
    }

    async setup() {
        throw new Error('Override required');
    }

    async insert(storeName, key, value) {
        throw new Error('Override required');
    }

    async selectAll(storeName, key) {
        throw new Error('Override required');
    }

    async select(storeName, key) {
        throw new Error('Override required');
    }

    async isExists(storeName, key) {
        throw new Error('Override required');
    }

    async update(storeName, key, value) {
        throw new Error('Override required');
    }

    async delete(storeName, key) {
        throw new Error('Override required');
    }
}
