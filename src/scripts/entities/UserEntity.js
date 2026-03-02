import EntityBase from './EntityBase.js';

export default class UserEntity extends EntityBase {
    constructor(key, params) {
        super(key);

        this.username = params?.username ?? '';
        this.password = params?.password ?? '';
    }

    getPassword() {
        return this.password;
    }
}
