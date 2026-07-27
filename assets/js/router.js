export async function loadPage(page = "home") {

    const container = document.getElementById("page-content");

    if (!container) return;

    try {

        const response = await fetch(`pages/${page}.html`);

        if (!response.ok) {
            throw new Error();
        }

        container.innerHTML = await response.text();

    } catch {

        container.innerHTML = `
            <section>

                <h1>404</h1>

                <p>Page "${page}" not found.</p>

            </section>
        `;

    }

}