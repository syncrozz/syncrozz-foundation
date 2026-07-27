const app = document.getElementById("app");

async function loadPage(page = "home") {

    try {

        const response = await fetch(`pages/${page}.html`);

        if (!response.ok) {
            throw new Error(`Unable to load ${page}.html`);
        }

        app.innerHTML = await response.text();

    } catch (error) {

        console.error(error);

        app.innerHTML = `
            <section class="error-page">

                <h1>404</h1>

                <p>Page not found.</p>

            </section>
        `;

    }

}

loadPage();