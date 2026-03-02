import DI from '../core/DI.js';
import ViewBase from './base/ViewBase.js';

export default class HomeView extends ViewBase {
    static TAG_NAME = 'home-view';

    static {
        if (!customElements.get(this.TAG_NAME)) {
            customElements.define(this.TAG_NAME, this);
        }
    }

    constructor() {
        super();

        this.state = {
            isLogin: false,
        };
    }

    /** @param {DI} di */
    async setup(di) {
        /** @type {AuthenticationService} */
        this.authnService = di.get(DI.AUTHN_SERVICE);

        this.state.isLogin = await this.authnService.isLogin();

        this.render();

        this.#bindEvent();
    }

    render() {
        this.html = `
                <h1>hi</h1>

                <button type="button" class="login_button">로그인 / 회원 가입</button>
            `;
    }

    #bindEvent() {
        this.querySelector('.login_button').addEventListener('click', () => {
            if (this.state.isLogin) {
            } else {
            }
        });
    }
}
