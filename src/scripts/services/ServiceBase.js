export default class ServiceBase {
    constructor() {
        if (new.target === ServiceBase) {
            throw new Error('Cannot instantiate abstract class');
        }
    }
}
