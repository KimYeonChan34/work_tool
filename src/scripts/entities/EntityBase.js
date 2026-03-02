export default class EntityBase {
    constructor(key) {
        if (new.target === EntityBase) {
            throw new Error('Cannot instantiate abstract class');
        }

        this.key = key;
    }

    getKey() {
        return this.key;
    }

    getValue() {
        const { key, ...data } = this;
        return data;
    }
}
