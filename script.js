document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* ==================================
           REDUCED MOTION
        ================================== */

        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        /* ==================================
           SCROLL REVEAL
        ================================== */

        const revealElements =
            document.querySelectorAll(
                ".reveal, " +
                ".fade-up, " +
                ".fade-in, " +
                ".slide-up"
            );


        if (
            !prefersReducedMotion &&
            revealElements.length
        ) {

            const revealObserver =
                new IntersectionObserver(
                    (entries) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "is-visible"
                                    );

                                    revealObserver.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.12
                    }
                );


            revealElements.forEach(
                (element) => {

                    revealObserver.observe(
                        element
                    );

                }
            );

        } else {

            revealElements.forEach(
                (element) => {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );

        }


        /* ==================================
           STAT COUNTERS
        ================================== */

        const counters =
            document.querySelectorAll(
                "[data-count]"
            );


        function animateCounter(
            element
        ) {

            const target =
                Number(
                    element.dataset.count
                );


            if (
                Number.isNaN(target)
            ) {
                return;
            }


            if (
                prefersReducedMotion
            ) {

                element.textContent =
                    target.toLocaleString();

                return;

            }


            const duration =
                1200;

            const startTime =
                performance.now();


            function updateCounter(
                currentTime
            ) {

                const elapsed =
                    currentTime -
                    startTime;


                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );


                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                const value =
                    Math.floor(
                        target * eased
                    );


                element.textContent =
                    value.toLocaleString();


                if (
                    progress < 1
                ) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    element.textContent =
                        target.toLocaleString();

                }

            }


            requestAnimationFrame(
                updateCounter
            );

        }


        if (
            counters.length
        ) {

            const counterObserver =
                new IntersectionObserver(
                    (entries) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    animateCounter(
                                        entry.target
                                    );

                                    counterObserver.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.5
                    }
                );


            counters.forEach(
                (counter) => {

                    counterObserver.observe(
                        counter
                    );

                }
            );

        }


        /* ==================================
           CURRENT YEAR
        ================================== */

        const yearElements =
            document.querySelectorAll(
                "[data-year]"
            );


        const currentYear =
            new Date().getFullYear();


        yearElements.forEach(
            (element) => {

                element.textContent =
                    currentYear;

            }
        );


        /* ==================================
           SMOOTH INTERNAL LINKS
        ================================== */

        const internalLinks =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        internalLinks.forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView(
                            {
                                behavior:
                                    prefersReducedMotion
                                        ? "auto"
                                        : "smooth",
                                block: "start"
                            }
                        );

                    }
                );

            }
        );


        /* ==================================
           EXTERNAL LINKS
        ================================== */

        const externalLinks =
            document.querySelectorAll(
                'a[target="_blank"]'
            );


        externalLinks.forEach(
            (link) => {

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }
        );


        /* ==================================
           IMAGE HANDLING
        ================================== */

        const images =
            document.querySelectorAll(
                "img"
            );


        images.forEach(
            (image) => {

                image.addEventListener(
                    "load",
                    () => {

                        image.classList.add(
                            "loaded"
                        );

                    }
                );


                image.addEventListener(
                    "error",
                    () => {

                        image.classList.add(
                            "image-error"
                        );

                    }
                );


                if (
                    image.complete
                ) {

                    image.classList.add(
                        "loaded"
                    );

                }

            }
        );


        /* ==================================
           BACK TO TOP
        ================================== */

        const backToTop =
            document.querySelector(
                ".back-to-top"
            );


        if (
            backToTop
        ) {

            function updateBackToTop() {

                if (
                    window.scrollY > 500
                ) {

                    backToTop.classList.add(
                        "visible"
                    );

                } else {

                    backToTop.classList.remove(
                        "visible"
                    );

                }

            }


            window.addEventListener(
                "scroll",
                updateBackToTop,
                {
                    passive: true
                }
            );


            updateBackToTop();


            backToTop.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();


                    window.scrollTo(
                        {
                            top: 0,
                            behavior:
                                prefersReducedMotion
                                    ? "auto"
                                    : "smooth"
                        }
                    );

                }
            );

        }


        /* ==================================
           IMPACT STATS
        ================================== */

        loadImpactStats();

    }
);


/* ======================================
   LOAD IMPACT DATA
====================================== */

async function loadImpactStats() {

    const statElements =
        document.querySelectorAll(
            "[data-impact]"
        );


    if (
        !statElements.length
    ) {
        return;
    }


    try {

        const response =
            await fetch(
                "impact.json"
            );


        if (
            !response.ok
        ) {

            throw new Error(
                "Unable to load impact data."
            );

        }


        const data =
            await response.json();


        statElements.forEach(
            (element) => {

                const key =
                    element.dataset.impact;


                if (
                    !key
                ) {
                    return;
                }


                if (
                    Object.prototype.hasOwnProperty.call(
                        data,
                        key
                    )
                ) {

                    element.textContent =
                        data[key];

                }

            }
        );


    } catch (error) {

        console.error(
            "Impact data error:",
            error
        );

    }

}


/* designed by Motunrayo Linda Idowu */