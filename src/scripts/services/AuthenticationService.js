import ServiceBase from './ServiceBase.js';
import UserService from './UserService.js';
import SessionService from './SessionService.js';

export default class AuthenticationService extends ServiceBase {
    constructor(dependency) {
        super();

        /** @type {UserService} */
        this.userService = dependency.userService;
        /** @type {SessionService} */
        this.sessionService = dependency.sessionService;
    }

    async isLogin() {
        const isAuthenticated = await this.sessionService.isValid();

        return isAuthenticated;
    }

    async login(username, password) {
        const result = await this.userService.login(username, password);

        if (!result) {
            return false;
        }

        await this.sessionService.create(username);

        return true;
    }
}
