import EntityBase from './EntityBase.js';

export default class SessionEntity extends EntityBase {
    constructor(key, params) {
        super(key);

        /** @type {number|null} 만료 시간 (단위: ms) */
        this.expires = params?.expires ?? null;
    }

    isValid(now) {
        if (this.expires === null) {
            return false;
        }

        return now <= this.expires;
    }
}
