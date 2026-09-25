/* =========================================================
   GIRLS' UNPLUGGED — ANIMATIONS
   File: js/animations.js
   ========================================================= */

(function () {
    "use strict";


    /* =====================================================
       1. REDUCED MOTION CHECK
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =====================================================
       2. SELECT REVEAL ELEMENTS
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale"
        );

    const staggerGroups =
        document.querySelectorAll(".stagger");

    const timelineElements =
        document.querySelectorAll(
            ".timeline, .timeline-item"
        );


    /* =====================================================
       3. MAKE ELEMENTS VISIBLE
       ===================================================== */

    function showElement(element) {
        element.classList.add("is-visible");
    }


    function showAllAnimatedElements() {

        revealElements.forEach(function (element) {
            showElement(element);
        });

        staggerGroups.forEach(function (group) {
            showElement(group);

            const children =
                group.children;

            Array.from(children).forEach(function (child) {
                child.classList.add("is-visible");
            });
        });

        timelineElements.forEach(function (element) {
            showElement(element);
        });
    }


    /* =====================================================
       4. REDUCED MOTION MODE
       ===================================================== */

    if (prefersReducedMotion) {

        showAllAnimatedElements();

    } else {

        /* =================================================
           5. INTERSECTION OBSERVER
           ================================================= */

        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -60px 0px",
            threshold: 0.12
        };


        const revealObserver =
            "IntersectionObserver" in window
                ? new IntersectionObserver(
                    function (entries, observer) {

                        entries.forEach(function (entry) {

                            if (!entry.isIntersecting) {
                                return;
                            }

                            showElement(entry.target);

                            observer.unobserve(
                                entry.target
                            );
                        });

                    },
                    observerOptions
                )
                : null;


        /* =================================================
           6. OBSERVE REVEAL ELEMENTS
           ================================================= */

        if (revealObserver) {

            revealElements.forEach(function (element) {
                revealObserver.observe(element);
            });

        } else {

            revealElements.forEach(function (element) {
                showElement(element);
            });
        }


        /* =================================================
           7. STAGGERED CONTENT
           ================================================= */

        const staggerObserver =
            "IntersectionObserver" in window
                ? new IntersectionObserver(
                    function (entries, observer) {

                        entries.forEach(function (entry) {

                            if (!entry.isIntersecting) {
                                return;
                            }

                            const group =
                                entry.target;

                            group.classList.add(
                                "is-visible"
                            );

                            const children =
                                Array.from(
                                    group.children
                                );

                            children.forEach(
                                function (child, index) {

                                    child.style.setProperty(
                                        "--stagger-index",
                                        index
                                    );

                                    child.classList.add(
                                        "is-visible"
                                    );
                                }
                            );

                            observer.unobserve(group);
                        });

                    },
                    observerOptions
                )
                : null;


        if (staggerObserver) {

            staggerGroups.forEach(function (group) {
                staggerObserver.observe(group);
            });

        } else {

            staggerGroups.forEach(function (group) {

                group.classList.add(
                    "is-visible"
                );

                Array.from(
                    group.children
                ).forEach(function (child) {
                    child.classList.add(
                        "is-visible"
                    );
                });
            });
        }


        /* =================================================
           8. TIMELINE ANIMATIONS
           ================================================= */

        const timelineObserver =
            "IntersectionObserver" in window
                ? new IntersectionObserver(
                    function (entries, observer) {

                        entries.forEach(function (entry) {

                            if (!entry.isIntersecting) {
                                return;
                            }

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        });

                    },
                    {
                        root: null,
                        rootMargin:
                            "0px 0px -50px 0px",
                        threshold: 0.15
                    }
                )
                : null;


        if (timelineObserver) {

            timelineElements.forEach(
                function (element) {
                    timelineObserver.observe(element);
                }
            );

        } else {

            timelineElements.forEach(
                function (element) {
                    showElement(element);
                }
            );
        }
    }


    /* =====================================================
       9. COUNTER ANIMATION
       ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    function animateCounter(element) {

        const targetValue =
            parseFloat(
                element.getAttribute(
                    "data-target"
                )
            );

        if (Number.isNaN(targetValue)) {
            return;
        }

        const duration =
            parseInt(
                element.getAttribute(
                    "data-duration"
                ),
                10
            ) || 1600;

        const suffix =
            element.getAttribute(
                "data-suffix"
            ) || "";

        const prefix =
            element.getAttribute(
                "data-prefix"
            ) || "";

        const decimals =
            parseInt(
                element.getAttribute(
                    "data-decimals"
                ),
                10
            ) || 0;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            /*
             * Ease-out effect.
             */
            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            const currentValue =
                targetValue *
                easedProgress;

            element.textContent =
                prefix +
                currentValue.toFixed(decimals) +
                suffix;

            if (progress < 1) {

                window.requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    prefix +
                    targetValue.toFixed(decimals) +
                    suffix;
            }
        }


        window.requestAnimationFrame(
            updateCounter
        );
    }


    /* =====================================================
       10. COUNTER OBSERVER
       ===================================================== */

    if (counters.length > 0) {

        if (prefersReducedMotion) {

            counters.forEach(function (counter) {

                const target =
                    parseFloat(
                        counter.getAttribute(
                            "data-target"
                        )
                    );

                if (Number.isNaN(target)) {
                    return;
                }

                const suffix =
                    counter.getAttribute(
                        "data-suffix"
                    ) || "";

                const prefix =
                    counter.getAttribute(
                        "data-prefix"
                    ) || "";

                const decimals =
                    parseInt(
                        counter.getAttribute(
                            "data-decimals"
                        ),
                        10
                    ) || 0;

                counter.textContent =
                    prefix +
                    target.toFixed(decimals) +
                    suffix;
            });

        } else if ("IntersectionObserver" in window) {

            const counterObserver =
                new IntersectionObserver(
                    function (entries, observer) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }

                                animateCounter(
                                    entry.target
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        );

                    },
                    {
                        root: null,
                        rootMargin:
                            "0px 0px -80px 0px",
                        threshold: 0.25
                    }
                );


            counters.forEach(function (counter) {
                counterObserver.observe(counter);
            });

        } else {

            counters.forEach(function (counter) {
                animateCounter(counter);
            });
        }
    }


    /* =====================================================
       11. IMAGE LOADING STATES
       ===================================================== */

    const lazyImages =
        document.querySelectorAll(
            ".lazy-image"
        );


    function markImageLoaded(image) {

        image.classList.add("loaded");

        image.classList.remove(
            "loading"
        );
    }


    function markImageFailed(image) {

        image.classList.add(
            "image-error"
        );

        image.classList.remove(
            "loading"
        );
    }


    lazyImages.forEach(function (image) {

        image.classList.add(
            "loading"
        );


        if (image.complete) {

            if (image.naturalWidth > 0) {
                markImageLoaded(image);
            } else {
                markImageFailed(image);
            }

            return;
        }


        image.addEventListener(
            "load",
            function () {
                markImageLoaded(image);
            },
            {
                once: true
            }
        );


        image.addEventListener(
            "error",
            function () {
                markImageFailed(image);
            },
            {
                once: true
            }
        );
    });


    /* =====================================================
       12. ALL IMAGES — LOADED STATE
       ===================================================== */

    const allImages =
        document.querySelectorAll(
            "img"
        );


    allImages.forEach(function (image) {

        if (
            image.classList.contains(
                "lazy-image"
            )
        ) {
            return;
        }


        if (image.complete) {

            if (image.naturalWidth > 0) {
                image.classList.add(
                    "loaded"
                );
            }

            return;
        }


        image.addEventListener(
            "load",
            function () {
                image.classList.add(
                    "loaded"
                );
            },
            {
                once: true
            }
        );
    });


    /* =====================================================
       13. INITIAL PAGE LOAD
       ===================================================== */

    window.addEventListener(
        "load",
        function () {

            document.body.classList.add(
                "page-loaded"
            );
        }
    );


    /* =====================================================
       14. SAFETY FALLBACK
       ===================================================== */

    /*
     * If the page has been open for a while and an element
     * somehow remains hidden because an observer failed,
     * make sure content remains accessible.
     */
    window.setTimeout(
        function () {

            revealElements.forEach(
                function (element) {

                    if (
                        !element.classList.contains(
                            "is-visible"
                        )
                    ) {
                        element.classList.add(
                            "is-visible"
                        );
                    }
                }
            );

        },
        5000
    );


    /* =====================================================
       15. END
       ===================================================== */

})();