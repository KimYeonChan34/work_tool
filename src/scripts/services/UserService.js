import ServiceBase from './ServiceBase.js';
import CryptoService from './CryptoService.js';
import UserModel from '../models/UserModel.js';
import UserEntity from '../entities/UserEntity.js';

export default class UserService extends ServiceBase {
    constructor(dependency) {
        super();

        /** @type {CryptoService} */
        this.cryptoService = dependency.cryptoService;
        /** @type {UserModel} */
        this.model = dependency.model;
    }

    async register(username, password) {
        const userId = await this.cryptoService.hash(username);
        const hashedPassword = await this.cryptoService.hash(password);

        const newUser = new UserEntity(userId, {
            username,
            password: hashedPassword,
        });

        const result = await this.model.create(newUser);

        return result;
    }

    async login(username, password) {
        const user = await this.#getUser(username);

        if (user === null) {
            return false;
        }

        const isValid = await this.#verifyPassword(user, password);

        if (!isValid) {
            return false;
        }

        return true;
    }

    async #getUser(username) {
        const userId = await this.cryptoService.hash(username);

        const user = await this.model.getById(userId);

        return user;
    }

    /**
     * @param {UserEntity} user
     * @param {string} password
     */
    async #verifyPassword(user, password) {
        const stored = user.getPassword();

        return await this.cryptoService.verifyPassword(password, stored);
    }
}
