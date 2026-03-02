export default class ComponentBase extends HTMLElement {
    constructor() {
        super();

        if (new.target === ComponentBase) {
            throw new Error('Cannot instantiate abstract class');
        }

        this.attachShadow({ mode: 'open' });
    }

    set html(value) {
        this.shadowRoot.innerHTML = value;
    }

    render() {
        throw new Error('Override required');
    }
}
