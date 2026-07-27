const ROUTES = [
    {
        id: "home",
        title: "Home",
        file: "home.html"
    },
    {
        id: "constitution",
        title: "Constitution",
        file: "constitution.html"
    },
    {
        id: "brand",
        title: "Brand",
        file: "brand.html"
    },
    {
        id: "language",
        title: "Language",
        file: "language.html"
    },
    {
        id: "ses",
        title: "Engineering Standard",
        file: "ses.html"
    },
    {
        id: "adr",
        title: "Architecture Decision",
        file: "adr.html"
    }
];

function getRoute(page) {

    return ROUTES.find(route => route.id === page);

}

function updateBreadcrumb(route) {

    const breadcrumb = document.getElementById("breadcrumb");

    if (!breadcrumb) return;

    breadcrumb.textContent = route.title;

}

function updateActiveMenu(page) {

    document
        .querySelectorAll("[data-page]")
        .forEach(link => {

            if (link.dataset.page === page) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

}

function updateNavigation(page) {

    const currentIndex = ROUTES.findIndex(route => route.id === page);

    const previous = ROUTES[currentIndex - 1];

    const next = ROUTES[currentIndex + 1];

    const prevButton = document.getElementById("prev-page");
    const nextButton = document.getElementById("next-page");

    if (prevButton) {

        if (previous) {

            prevButton.hidden = false;
            prevButton.textContent = `← ${previous.title}`;

            prevButton.onclick = () => loadPage(previous.id);

        } else {

            prevButton.hidden = true;

        }

    }

    if (nextButton) {

        if (next) {

            nextButton.hidden = false;
            nextButton.textContent = `${next.title} →`;

            nextButton.onclick = () => loadPage(next.id);

        } else {

            nextButton.hidden = true;

        }

    }

}

export async function loadPage(page = "home") {

    const container = document.getElementById("page-content");

    if (!container) return;

    const route = getRoute(page);

    if (!route) {

        container.innerHTML = `
            <section>

                <h1>404</h1>

                <p>Page "${page}" not found.</p>

            </section>
        `;

        return;

    }

    try {

        const response = await fetch(`pages/${route.file}`);

        if (!response.ok) {

            throw new Error();

        }

        container.innerHTML = await response.text();

        document.title = `${route.title} • SYNCROZZ Foundation`;

        updateBreadcrumb(route);

        updateActiveMenu(page);

        updateNavigation(page);

    } catch {

        container.innerHTML = `
            <section>

                <h1>404</h1>

                <p>Unable to load "${route.file}".</p>

            </section>
        `;

    }

}