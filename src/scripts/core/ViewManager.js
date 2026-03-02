import ViewBase from '../views/base/ViewBase.js';

export default class ViewManager {
    constructor(dependency) {
        /** @type {DI} */
        this.di = dependency.di;

        this.container = document.querySelector('app');
    }

    async navigate(viewName) {
        /** @type {ViewBase} */
        const viewElement = document.createElement(viewName);

        await viewElement.setup(this.di);

        this.container.innerHTML = '';
        this.container.appendChild(viewElement);
    }
}
