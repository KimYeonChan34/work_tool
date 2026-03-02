import DI from './src/scripts/core/DI.js';
import ViewManager from './src/scripts/core/ViewManager.js';
import HomeView from './src/scripts/views/HomeView.js';

(() => {
    class App {
        constructor() {
            this.di = new DI();
            this.viewManager = new ViewManager({ di: this.di });
        }

        async run() {
            const success = await this.#boot();

            if (!success) {
                return;
            }

            this.viewManager.navigate(HomeView.TAG_NAME);
        }

        async #boot() {
            try {
                await this.di.bootstrap();

                return true;
            } catch (error) {
                console.error(error);

                return false;
            }
        }
    }

    window.document.addEventListener('load', () => {
        const app = new App();

        app.run();
    });
})();
