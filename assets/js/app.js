import { loadPage } from "./router.js";

const app = document.getElementById("app");

async function bootstrap() {

    const response = await fetch("layouts/shell.html");

    app.innerHTML = await response.text();

    bindNavigation();

    loadPage("home");

}

function bindNavigation() {

    document.addEventListener("click", (event) => {

        const link = event.target.closest("[data-page]");

        if (!link) return;

        event.preventDefault();

        loadPage(link.dataset.page);

    });

}

bootstrap();