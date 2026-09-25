/* ========================================
   GIRLS UNPLUGGED
   ANIMATIONS JAVASCRIPT
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        /* ==================================
           REVEAL ELEMENTS
        ================================== */

        const elements =
            document.querySelectorAll(
                ".reveal, " +
                ".fade-up, " +
                ".fade-in, " +
                ".slide-up"
            );


        if (
            !elements.length
        ) {
            return;
        }


        /* ==================================
           REDUCED MOTION
        ================================== */

        if (
            prefersReducedMotion
        ) {

            elements.forEach(
                (element) => {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );

            return;

        }


        /* ==================================
           INTERSECTION OBSERVER
        ================================== */

        const observer =
            new IntersectionObserver(
                (
                    entries,
                    animationObserver
                ) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "is-visible"
                            );


                            animationObserver.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        elements.forEach(
            (element) => {

                observer.observe(
                    element
                );

            }
        );


        /* ==================================
           STAGGERED ANIMATIONS
        ================================== */

        const staggerGroups =
            document.querySelectorAll(
                "[data-stagger]"
            );


        staggerGroups.forEach(
            (group) => {

                const children =
                    group.children;


                Array.from(children)
                    .forEach(
                        (
                            child,
                            index
                        ) => {

                            child.style
                                .setProperty(
                                    "--animation-delay",
                                    `${index * 80}ms`
                                );

                            child.classList.add(
                                "stagger-item"
                            );

                        }
                    );

            }
        );


        /* ==================================
           HOVER TILT
        ================================== */

        const tiltElements =
            document.querySelectorAll(
                "[data-tilt]"
            );


        tiltElements.forEach(
            (element) => {

                element.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            element.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        const centerX =
                            rect.width / 2;


                        const centerY =
                            rect.height / 2;


                        const rotateX =
                            (
                                (y - centerY) /
                                centerY
                            ) * -3;


                        const rotateY =
                            (
                                (x - centerX) /
                                centerX
                            ) * 3;


                        element.style.transform =
                            `perspective(800px) ` +
                            `rotateX(${rotateX}deg) ` +
                            `rotateY(${rotateY}deg)`;

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        element.style.transform =
                            "";

                    }
                );

            }
        );

    }
);


/* designed by Motunrayo Linda Idowu */