import DatabaseAdapter from '../database/DatabaseAdapter.js';
import UserEntity from '../entities/UserEntity.js';

export default class UserModel extends ModelBase {
    constructor(dependency) {
        super();

        this.storeName = DatabaseAdapter.STORES.USER;

        /** @type {DatabaseAdapter} */
        this.db = dependency?.databaseAdapter;
    }

    /**
     * @param {UserEntity} user
     */
    async create(user) {
        const key = user.getKey();
        const value = user.getValue();

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

            return new UserEntity(id, result);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async has(id) {
        try {
            const result = await this.db.isExists(this.storeName, id);

            return Boolean(result);
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
