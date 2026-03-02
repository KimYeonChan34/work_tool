import ComponentBase from './ComponentBase.js';

export default class ViewBase extends ComponentBase {
    constructor() {
        super();

        if (new.target === ViewBase) {
            throw new Error('Cannot instantiate abstract class');
        }
    }

    async setup() {
        throw new Error('Override required');
    }
}
