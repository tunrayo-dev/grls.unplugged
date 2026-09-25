/* =========================================================
   GIRLS' UNPLUGGED — NAVIGATION
   File: js/navigation.js
   ========================================================= */

(function () {
    "use strict";

    /* =====================================================
       1. DOM ELEMENTS
       ===================================================== */

    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileNavigation = document.querySelector(".mobile-navigation");
    const body = document.body;

    if (!menuToggle || !mobileNavigation) {
        return;
    }


    /* =====================================================
       2. OPEN / CLOSE MENU
       ===================================================== */

    function openMenu() {
        menuToggle.classList.add("is-active");
        mobileNavigation.classList.add("is-open");

        menuToggle.setAttribute("aria-expanded", "true");

        body.classList.add("menu-open");
    }


    function closeMenu() {
        menuToggle.classList.remove("is-active");
        mobileNavigation.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");

        body.classList.remove("menu-open");
    }


    function toggleMenu() {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    /* =====================================================
       3. MENU TOGGLE
       ===================================================== */

    menuToggle.addEventListener("click", function () {
        toggleMenu();
    });


    /* =====================================================
       4. CLOSE MENU WHEN A LINK IS CLICKED
       ===================================================== */

    const mobileLinks =
        mobileNavigation.querySelectorAll("a");

    mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu();
        });
    });


    /* =====================================================
       5. CLOSE WITH ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
            menuToggle.focus();
        }
    });


    /* =====================================================
       6. CLOSE WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", function (event) {

        const clickedInsideNavigation =
            mobileNavigation.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            mobileNavigation.classList.contains("is-open") &&
            !clickedInsideNavigation &&
            !clickedToggle
        ) {
            closeMenu();
        }
    });


    /* =====================================================
       7. CLOSE WHEN WINDOW BECOMES DESKTOP SIZE
       ===================================================== */

    const desktopBreakpoint = 1100;

    function handleResize() {
        if (window.innerWidth >= desktopBreakpoint) {
            closeMenu();
        }
    }

    window.addEventListener("resize", handleResize);


    /* =====================================================
       8. ACTIVE NAVIGATION
       ===================================================== */

    function getCurrentPage() {

        let pathname =
            window.location.pathname;

        pathname = pathname.split("/").pop();

        if (!pathname || pathname === "") {
            return "index.html";
        }

        return pathname;
    }


    function setActiveNavigation() {

        const currentPage = getCurrentPage();

        const allNavigationLinks =
            document.querySelectorAll(
                ".desktop-navigation a, .mobile-navigation a"
            );

        allNavigationLinks.forEach(function (link) {

            const href =
                link.getAttribute("href");

            if (!href) {
                return;
            }

            const cleanHref =
                href.split("#")[0].split("?")[0];

            const normalizedHref =
                cleanHref || "index.html";

            if (normalizedHref === currentPage) {

                link.classList.add("active");

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                link.classList.remove("active");

                link.removeAttribute(
                    "aria-current"
                );
            }
        });
    }

    setActiveNavigation();


    /* =====================================================
       9. HANDLE HOMEPAGE LINK
       ===================================================== */

    const homeLinks =
        document.querySelectorAll(
            'a[href="index.html"]'
        );

    homeLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                getCurrentPage() === "index.html" &&
                !link.getAttribute("href").includes("#")
            ) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        });
    });


    /* =====================================================
       10. SMOOTH INTERNAL ANCHOR SCROLLING
       ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length <= 1
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            closeMenu();

            const header =
                document.querySelector(".site-header");

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;

            window.scrollTo({
                top: Math.max(targetPosition, 0),
                behavior: "smooth"
            });

            /*
             * Update the URL without forcing
             * the browser to jump.
             */
            if (
                window.history &&
                window.history.pushState
            ) {
                window.history.pushState(
                    null,
                    "",
                    targetId
                );
            }
        });
    });


    /* =====================================================
       11. HANDLE HASH ON PAGE LOAD
       ===================================================== */

    function scrollToInitialHash() {

        if (!window.location.hash) {
            return;
        }

        const target =
            document.querySelector(
                window.location.hash
            );

        if (!target) {
            return;
        }

        window.setTimeout(function () {

            const header =
                document.querySelector(".site-header");

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;

            window.scrollTo({
                top: Math.max(targetPosition, 0),
                behavior: "smooth"
            });

        }, 100);
    }

    scrollToInitialHash();


    /* =====================================================
       12. UPDATE ACTIVE LINK AFTER HISTORY CHANGES
       ===================================================== */

    window.addEventListener(
        "popstate",
        function () {
            setActiveNavigation();
        }
    );


    /* =====================================================
       13. PREVENT MENU STATE FROM GETTING STUCK
       ===================================================== */

    window.addEventListener(
        "pageshow",
        function () {
            if (window.innerWidth >= desktopBreakpoint) {
                closeMenu();
            }
        }
    );


    /* =====================================================
       14. INITIAL ARIA STATE
       ===================================================== */

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

})();