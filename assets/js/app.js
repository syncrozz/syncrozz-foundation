import { loadPage } from "./router.js";

const app = document.getElementById("app");

class FoundationApp {

    async init() {

        await this.loadShell();

        this.bindNavigation();

        this.start();

    }

    async loadShell() {

        const response = await fetch("layouts/shell.html");

        app.innerHTML = await response.text();

    }

    bindNavigation() {

        document.addEventListener("click", (event) => {

            const link = event.target.closest("[data-page]");

            if (!link) return;

            event.preventDefault();

            this.navigate(link.dataset.page);

        });

    }

    navigate(page) {

        loadPage(page);

    }

    start() {

        this.navigate("home");

    }

}

new FoundationApp().init();