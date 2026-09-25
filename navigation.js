/* ========================================
   GIRLS UNPLUGGED
   NAVIGATION JAVASCRIPT
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const menuToggle =
            document.querySelector(
                ".menu-toggle"
            );

        const mobileMenu =
            document.querySelector(
                ".mobile-menu"
            );


        /* ==================================
           CHECK ELEMENTS
        ================================== */

        if (
            !menuToggle ||
            !mobileMenu
        ) {
            return;
        }


        const menuLinks =
            mobileMenu.querySelectorAll(
                "a"
            );


        /* ==================================
           OPEN MENU
        ================================== */

        function openMenu() {

            mobileMenu.classList.add(
                "active"
            );

            menuToggle.classList.add(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

            document.body.classList.add(
                "menu-open"
            );

        }


        /* ==================================
           CLOSE MENU
        ================================== */

        function closeMenu() {

            mobileMenu.classList.remove(
                "active"
            );

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }


        /* ==================================
           TOGGLE MENU
        ================================== */

        function toggleMenu(event) {

            event.preventDefault();

            const isOpen =
                mobileMenu.classList.contains(
                    "active"
                );


            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }


        /* ==================================
           MENU BUTTON
        ================================== */

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );


        /* ==================================
           MOBILE LINKS
        ================================== */

        menuLinks.forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMenu();

                    }
                );

            }
        );


        /* ==================================
           ESCAPE KEY
        ================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    mobileMenu.classList.contains(
                        "active"
                    )
                ) {

                    closeMenu();

                    menuToggle.focus();

                }

            }
        );


        /* ==================================
           CLICK OUTSIDE
        ================================== */

        document.addEventListener(
            "click",
            (event) => {

                if (
                    !mobileMenu.classList.contains(
                        "active"
                    )
                ) {
                    return;
                }


                const clickedToggle =
                    menuToggle.contains(
                        event.target
                    );

                const clickedMenu =
                    mobileMenu.contains(
                        event.target
                    );


                if (
                    !clickedToggle &&
                    !clickedMenu
                ) {

                    closeMenu();

                }

            }
        );


        /* ==================================
           ACTIVE PAGE
        ================================== */

        const currentPath =
            window.location.pathname;


        let currentPage =
            currentPath
                .split("/")
                .pop();


        if (
            !currentPage ||
            currentPage === ""
        ) {

            currentPage =
                "index.html";

        }


        const navigationLinks =
            document.querySelectorAll(
                ".nav-links a, .mobile-menu a"
            );


        navigationLinks.forEach(
            (link) => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (!href) {
                    return;
                }


                if (
                    href.startsWith(
                        "http"
                    ) ||
                    href.startsWith(
                        "mailto:"
                    ) ||
                    href.startsWith(
                        "tel:"
                    )
                ) {
                    return;
                }


                const cleanHref =
                    href
                        .split("#")[0]
                        .split("?")[0];


                const normalizedHref =
                    cleanHref === "" ||
                    cleanHref === "/"
                        ? "index.html"
                        : cleanHref;


                if (
                    normalizedHref ===
                    currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );


        /* ==================================
           RESIZE
        ================================== */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 900
                ) {

                    closeMenu();

                }

            }
        );


        /* ==================================
           CLOSE AFTER PAGE VISIBILITY
        ================================== */

        document.addEventListener(
            "visibilitychange",
            () => {

                if (
                    document.hidden
                ) {

                    closeMenu();

                }

            }
        );

    }
);