import CryptoService from './CryptoService.js';
import SessionModel from '../models/SessisonModel.js';
import SessionEntity from '../entities/SessionEntity.js';

export default class SessionService extends ServiceBase {
    static SESSION_COOKIE = 'session';
    static SESSION_COOKIE_EXPRISE = 12 * 60 * 60;

    constructor(dependency) {
        super();

        /** @type {CryptoService} */
        this.cryptoService = dependency.cryptoService;
        /** @type {SessionModel} */
        this.model = dependency.model;
    }

    async create(username) {
        const nowMs = Date.now();
        const sessionId = await this.cryptoService.hash(username, nowMs);

        const session = new SessionEntity(sessionId, {
            expires: nowMs + SessionService.SESSION_COOKIE_EXPRISE * 1000,
        });

        const result = await this.model.create(session);

        if (!result) {
            return false;
        }

        CookieUtils.set(SessionService.SESSION_COOKIE, session.getKey(), SessionService.SESSION_COOKIE_EXPRISE);

        return true;
    }

    async isValid() {
        /** @type {SessionEntity} */
        const session = await this.#get();

        if (!session || !session.isValid(Date.now())) {
            return false;
        }

        return true;
    }

    async #get() {
        const sessionId = CookieUtils.get(SessionService.SESSION_COOKIE);

        if (!sessionId) {
            return null;
        }

        const session = await this.model.getById(sessionId);

        return session;
    }
}
