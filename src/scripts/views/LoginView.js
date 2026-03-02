import DI from '../core/DI.js';
import ViewBase from './base/ViewBase.js';
import AuthenticationService from '../services/AuthenticationService.js';

export default class LoginView extends ViewBase {
    constructor() {
        super();
    }

    async setup(di) {
        this.#setupDependency(di);
        await this.#setupState();
        this.render();
        this.#bindEvent();
    }

    render() {
        this.html = `
                <section id="login_view" class="view">
                    <h2>Login</h2>

                    <form id="login_form">
                        <label>
                            username:
                            <input type="text" name="username" required />
                        </label>
                        <label>
                            password:
                            <input type="password" name="password" required />
                        </label>
                        <button type="submit">login</button>
                    </form>
                </section>
            `;
    }

    /** @param {DI} di */
    async #setupDependency(di) {
        /** @type {AuthenticationService} di */
        this.authnService = di.get(DI.AUTHN_SERVICE);
    }

    async #setupState() {
        this.state.isLogin = await this.authnService.isLogin();
    }

    #bindEvent() {
        // todo
    }

    async #handleLogin(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const username = formData.get('username');
        const password = formData.get('password');

        const result = await this.authnService.login(username, password);

        if (result) {
            this.state.isLogin = true;

            this.root.update();
        } else {
            alert('login failed');
        }
    }
}
