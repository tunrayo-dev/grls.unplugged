document.addEventListener("DOMContentLoaded", () => {
    loadTeamPage();
});


async function loadTeamPage() {
    try {
        const response = await fetch("team.json");

        if (!response.ok) {
            throw new Error("Unable to load team data.");
        }

        const data = await response.json();

        renderTeamMembers(data.team || []);
        renderTeamIntroduction(data.teamIntro);
        renderHowWeWork(data.howWeWork || []);
        renderFounder(data.founderSection);
        renderJoinTeam(data.joinTeam);

    } catch (error) {
        console.error("Team page error:", error);

        showTeamError();
    }
}


/* ------------------------------
   Team Members
------------------------------ */

function renderTeamMembers(teamMembers) {
    const teamGrid = document.getElementById("team-grid");

    if (!teamGrid) {
        return;
    }

    teamGrid.innerHTML = "";

    if (teamMembers.length === 0) {
        teamGrid.innerHTML = `
            <div class="empty-state">
                <p>
                    Our team information will be available soon.
                </p>
            </div>
        `;

        return;
    }

    teamMembers.forEach((member) => {
        const card = document.createElement("article");

        card.className = "team-card";

        const image = member.image
            ? `
                <img
                    src="${escapeHtml(member.image)}"
                    alt="${escapeHtml(member.imageAlt || member.name)}"
                    loading="lazy"
                >
            `
            : `
                <div
                    class="image-placeholder team-image-placeholder"
                    role="img"
                    aria-label="${escapeHtml(
                        member.imageAlt || "Team member photo placeholder"
                    )}"
                >
                    <div class="placeholder-icon">
                        <span>+</span>
                    </div>

                    <p>
                        Photo coming soon
                    </p>
                </div>
            `;

        const socials = renderSocialLinks(member.socials);

        card.innerHTML = `
            <div class="team-card-image">
                ${image}
            </div>

            <div class="team-card-content">

                <span class="team-card-role">
                    ${escapeHtml(member.role || "")}
                </span>

                <h3>
                    ${escapeHtml(member.name || "")}
                </h3>

                <p>
                    ${escapeHtml(member.bio || "")}
                </p>

                ${socials}

            </div>
        `;

        teamGrid.appendChild(card);
    });
}


/* ------------------------------
   Team Introduction
------------------------------ */

function renderTeamIntroduction(section) {
    if (!section) {
        return;
    }

    const heading = document.querySelector(
        ".team-section-intro"
    );

    if (!heading) {
        return;
    }

    const label = heading.querySelector(".section-label");
    const title = heading.querySelector("h2");
    const paragraphs = heading.querySelectorAll("p");

    if (label && section.label) {
        label.textContent = section.label;
    }

    if (title && section.title) {
        title.textContent = section.title;
    }

    if (section.paragraphs && paragraphs.length) {
        section.paragraphs.forEach((paragraph, index) => {
            if (paragraphs[index]) {
                paragraphs[index].textContent = paragraph;
            }
        });
    }
}


/* ------------------------------
   How We Work
------------------------------ */

function renderHowWeWork(items) {
    const container = document.querySelector(
        ".values-grid"
    );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    items.forEach((item) => {
        const card = document.createElement("article");

        card.className = "value-card";

        card.innerHTML = `
            <span class="card-number">
                ${escapeHtml(item.number || "")}
            </span>

            <h3>
                ${escapeHtml(item.title || "")}
            </h3>

            <p>
                ${escapeHtml(item.description || "")}
            </p>
        `;

        container.appendChild(card);
    });
}


/* ------------------------------
   Founder Section
------------------------------ */

function renderFounder(section) {
    if (!section) {
        return;
    }

    const founderSection = document.querySelector(
        ".founder-section"
    );

    if (!founderSection) {
        return;
    }

    const name = founderSection.querySelector(
        ".split-content h2"
    );

    const role = founderSection.querySelector(
        ".split-content .role"
    );

    const label = founderSection.querySelector(
        ".split-content .section-label"
    );

    const paragraphs = founderSection.querySelectorAll(
        ".split-content > p:not(.role):not(.founder-quote)"
    );

    const quote = founderSection.querySelector(
        ".founder-quote"
    );

    const imagePlaceholder = founderSection.querySelector(
        ".image-placeholder"
    );

    if (label && section.label) {
        label.textContent = section.label;
    }

    if (name && section.name) {
        name.textContent = section.name;
    }

    if (role && section.role) {
        role.textContent = section.role;
    }

    if (
        section.paragraphs &&
        paragraphs.length
    ) {
        section.paragraphs.forEach((paragraph, index) => {
            if (paragraphs[index]) {
                paragraphs[index].textContent = paragraph;
            }
        });
    }

    if (quote && section.quote) {
        quote.textContent = `“${section.quote}”`;
    }

    if (
        imagePlaceholder &&
        section.image
    ) {
        imagePlaceholder.innerHTML = `
            <img
                src="${escapeHtml(section.image)}"
                alt="${escapeHtml(
                    section.imageAlt || section.name
                )}"
                loading="lazy"
            >
        `;
    }
}


/* ------------------------------
   Join Team CTA
------------------------------ */

function renderJoinTeam(section) {
    if (!section) {
        return;
    }

    const ctaSection = document.querySelector(
        ".cta-section"
    );

    if (!ctaSection) {
        return;
    }

    const label = ctaSection.querySelector(
        ".section-label"
    );

    const title = ctaSection.querySelector("h2");

    const description = ctaSection.querySelector("p");

    const button = ctaSection.querySelector("a");

    if (label && section.label) {
        label.textContent = section.label;
    }

    if (title && section.title) {
        title.textContent = section.title;
    }

    if (description && section.description) {
        description.textContent = section.description;
    }

    if (button) {
        button.textContent =
            section.buttonText || "Get involved";

        button.href =
            section.buttonLink || "get-involved.html";
    }
}


/* ------------------------------
   Social Links
------------------------------ */

function renderSocialLinks(socials) {
    if (!socials) {
        return "";
    }

    const links = [];

    if (socials.linkedin) {
        links.push(`
            <a
                href="${escapeHtml(socials.linkedin)}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
            >
                LinkedIn
            </a>
        `);
    }

    if (socials.instagram) {
        links.push(`
            <a
                href="${escapeHtml(socials.instagram)}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
            >
                Instagram
            </a>
        `);
    }

    if (links.length === 0) {
        return "";
    }

    return `
        <div class="team-card-socials">
            ${links.join("")}
        </div>
    `;
}


/* ------------------------------
   Error State
------------------------------ */

function showTeamError() {
    const teamGrid = document.getElementById(
        "team-grid"
    );

    if (!teamGrid) {
        return;
    }

    teamGrid.innerHTML = `
        <div class="empty-state">
            <h3>
                Team information could not be loaded.
            </h3>

            <p>
                Please try refreshing the page.
            </p>
        </div>
    `;
}


/* ------------------------------
   HTML Safety
------------------------------ */

function escapeHtml(value) {
    const element = document.createElement("div");

    element.textContent = value ?? "";

    return element.innerHTML;
}


/* designed by Motunrayo Linda Idowu */