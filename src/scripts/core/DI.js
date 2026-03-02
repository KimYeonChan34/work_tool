import DatabaseAdapter from '../database/DatabaseAdapter.js';

export default class DI {
    static DATABASE = 'database';
    static AUTHN_SERVICE = 'authnService';

    constructor() {
        this.container = new Map();
    }

    async bootstrap() {
        this.#setup();

        /** @type {DatabaseAdapter} */
        const database = this.container.get(DI.DATABASE);

        await database.setup();
    }

    get(name) {
        const dependency = this.container.get(name);

        if (!dependency) {
            throw new Error('Invalid name');
        }

        return dependency;
    }

    #setup() {
        const hashAdapter = new HashAdapter();
        const databaseAdapter = new IndexedDBAdapter();

        const userModel = new UserModel({ databaseAdapter });
        const sessionModel = new SessionModel({ databaseAdapter });

        const cryptoService = new CryptoService({ hashAdapter });
        const userService = new UserService({ cryptoService, userModel });
        const sessionService = new SessionService({ cryptoService, sessionModel });
        const authenticationService = new AuthenticationService({ userService, sessionService });

        this.container.set(DI.DATABASE, databaseAdapter);
        this.container.set(DI.AUTHN_SERVICE, authenticationService);
    }
}
