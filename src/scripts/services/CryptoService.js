import HashAdapter from '../adapters/HashAdapter.js';

export default class CryptoService extends ServiceBase {
    constructor(dependency) {
        super();

        /** @type {HashAdapter} */
        this.hashAdapter = dependency.hashAdapter;
    }

    async hash(...args) {
        const data = args.join(':');

        return await this.hashAdapter.hash(data);
    }

    async verifyPassword(password, hashedPassword) {
        if (!password || !hashedPassword) {
            return false;
        }

        return (await this.hash(password)) === hashedPassword;
    }
}
