export default class ModelBase {
    constructor() {
        if (new.target === ModelBase) {
            throw new Error('Cannot instantiate abstract class');
        }
    }
}
