import DatabaseAdapter from '../database/DatabaseAdapter.js';
import SessionEntity from '../entities/SessionEntity.js';

export default class SessionModel extends ModelBase {
    constructor(dependency) {
        super();

        this.storeName = DatabaseAdapter.STORES.SESSION;

        /** @type {DatabaseAdapter} */
        this.db = dependency?.databaseAdapter;
    }

    /**
     * @param {SessionEntity} session
     */
    async create(session) {
        const key = session.getKey();
        const value = session.getValue();

        try {
            const result = await this.db.insert(this.storeName, key, value);

            return result;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getById(id) {
        try {
            const result = await this.db.select(this.storeName, id);

            if (!result) {
                return null;
            }

            return new SessionEntity(id, result);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
