/* =========================================================
   GIRLS' UNPLUGGED — MAIN JAVASCRIPT
   File: js/main.js
   ========================================================= */

(function () {
    "use strict";


    /* =====================================================
       1. CURRENT YEAR
       ===================================================== */

    function updateCurrentYear() {

        const yearElements =
            document.querySelectorAll(
                "[data-current-year]"
            );

        const currentYear =
            new Date().getFullYear();

        yearElements.forEach(function (element) {
            element.textContent = currentYear;
        });
    }

    updateCurrentYear();


    /* =====================================================
       2. CONTACT FORM
       ===================================================== */

    const contactForm =
        document.getElementById(
            "contact-form"
        );


    if (contactForm) {

        const nameInput =
            document.getElementById(
                "contact-name"
            );

        const emailInput =
            document.getElementById(
                "contact-email"
            );

        const subjectInput =
            document.getElementById(
                "contact-subject"
            );

        const messageInput =
            document.getElementById(
                "contact-message"
            );

        const consentInput =
            document.getElementById(
                "contact-consent"
            );

        const statusElement =
            document.getElementById(
                "contact-form-status"
            );


        /* =================================================
           2A. STATUS MESSAGE
           ================================================= */

        function showFormStatus(
            message,
            type
        ) {

            if (!statusElement) {
                return;
            }

            statusElement.textContent =
                message;

            statusElement.classList.remove(
                "success",
                "error"
            );

            statusElement.classList.add(
                type
            );

            statusElement.removeAttribute(
                "hidden"
            );

            statusElement.setAttribute(
                "role",
                "status"
            );

            statusElement.setAttribute(
                "aria-live",
                "polite"
            );
        }


        /* =================================================
           2B. CLEAR STATUS
           ================================================= */

        function clearFormStatus() {

            if (!statusElement) {
                return;
            }

            statusElement.textContent = "";

            statusElement.classList.remove(
                "success",
                "error"
            );

            statusElement.setAttribute(
                "hidden",
                ""
            );
        }


        /* =================================================
           2C. FIELD ERROR
           ================================================= */

        function setFieldError(
            field,
            message
        ) {

            if (!field) {
                return;
            }

            field.setAttribute(
                "aria-invalid",
                "true"
            );

            field.classList.add(
                "input-error"
            );

            /*
             * Store the message so it can be used
             * without requiring extra HTML.
             */
            field.dataset.errorMessage =
                message;
        }


        /* =================================================
           2D. CLEAR FIELD ERROR
           ================================================= */

        function clearFieldError(field) {

            if (!field) {
                return;
            }

            field.removeAttribute(
                "aria-invalid"
            );

            field.classList.remove(
                "input-error"
            );

            delete field.dataset.errorMessage;
        }


        /* =================================================
           2E. EMAIL VALIDATION
           ================================================= */

        function isValidEmail(email) {

            /*
             * This intentionally checks for a practical
             * email structure without trying to implement
             * the entire email specification.
             */
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            return emailPattern.test(
                email.trim()
            );
        }


        /* =================================================
           2F. VALIDATE FORM
           ================================================= */

        function validateContactForm() {

            let isValid = true;

            clearFieldError(
                nameInput
            );

            clearFieldError(
                emailInput
            );

            clearFieldError(
                subjectInput
            );

            clearFieldError(
                messageInput
            );

            clearFieldError(
                consentInput
            );


            /* NAME */

            if (
                !nameInput ||
                nameInput.value.trim().length < 2
            ) {

                setFieldError(
                    nameInput,
                    "Please enter your name."
                );

                isValid = false;
            }


            /* EMAIL */

            if (
                !emailInput ||
                !isValidEmail(
                    emailInput.value
                )
            ) {

                setFieldError(
                    emailInput,
                    "Please enter a valid email address."
                );

                isValid = false;
            }


            /* SUBJECT */

            if (
                !subjectInput ||
                subjectInput.value.trim() === ""
            ) {

                setFieldError(
                    subjectInput,
                    "Please choose what you would like to talk about."
                );

                isValid = false;
            }


            /* MESSAGE */

            if (
                !messageInput ||
                messageInput.value.trim().length < 10
            ) {

                setFieldError(
                    messageInput,
                    "Please tell us a little more in your message."
                );

                isValid = false;
            }


            /* CONSENT */

            if (
                !consentInput ||
                !consentInput.checked
            ) {

                setFieldError(
                    consentInput,
                    "Please confirm that you are happy for us to use your information to respond."
                );

                isValid = false;
            }


            return isValid;
        }


        /* =================================================
           2G. CLEAR ERRORS WHILE TYPING
           ================================================= */

        [
            nameInput,
            emailInput,
            subjectInput,
            messageInput,
            consentInput
        ].forEach(function (field) {

            if (!field) {
                return;
            }

            field.addEventListener(
                "input",
                function () {
                    clearFieldError(field);
                    clearFormStatus();
                }
            );

            field.addEventListener(
                "change",
                function () {
                    clearFieldError(field);
                    clearFormStatus();
                }
            );
        });


        /* =================================================
           2H. SUBMIT FORM
           ================================================= */

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                clearFormStatus();


                const formIsValid =
                    validateContactForm();


                if (!formIsValid) {

                    showFormStatus(
                        "Please check the highlighted fields and try again.",
                        "error"
                    );

                    const firstInvalidField =
                        contactForm.querySelector(
                            '[aria-invalid="true"]'
                        );

                    if (firstInvalidField) {
                        firstInvalidField.focus();
                    }

                    return;
                }


                /*
                 * The website is currently a static GitHub
                 * Pages site. We do NOT pretend that a message
                 * has been sent when there is no backend.
                 */
                showFormStatus(
                    "Thanks for reaching out! Online form submissions are not connected yet. Please email grlsunplugged@gmail.com for now so we can get back to you.",
                    "success"
                );


                /*
                 * Keep the user's entered information visible.
                 * This makes it clear that the form was validated
                 * rather than falsely submitted.
                 */
            }
        );
    }


    /* =====================================================
       3. EXTERNAL LINKS
       ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(function (link) {

        const existingRel =
            link.getAttribute("rel") || "";

        const relValues =
            existingRel
                .split(/\s+/)
                .filter(Boolean);

        if (!relValues.includes("noopener")) {
            relValues.push("noopener");
        }

        if (!relValues.includes("noreferrer")) {
            relValues.push("noreferrer");
        }

        link.setAttribute(
            "rel",
            relValues.join(" ")
        );
    });


    /* =====================================================
       4. EMAIL LINKS
       ===================================================== */

    const emailLinks =
        document.querySelectorAll(
            'a[href^="mailto:"]'
        );


    emailLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                /*
                 * Keep mailto links completely native.
                 * This listener only adds an accessible hint.
                 */
                link.setAttribute(
                    "aria-label",
                    link.getAttribute(
                        "aria-label"
                    ) ||
                    "Send us an email"
                );
            }
        );
    });


    /* =====================================================
       5. BUTTON PRESS FEEDBACK
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            "button, .btn"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "mousedown",
            function () {
                button.classList.add(
                    "is-pressed"
                );
            }
        );


        button.addEventListener(
            "mouseup",
            function () {
                button.classList.remove(
                    "is-pressed"
                );
            }
        );


        button.addEventListener(
            "mouseleave",
            function () {
                button.classList.remove(
                    "is-pressed"
                );
            }
        );


        button.addEventListener(
            "touchend",
            function () {
                button.classList.remove(
                    "is-pressed"
                );
            },
            {
                passive: true
            }
        );
    });


    /* =====================================================
       6. DISABLED ADMIN ACTIONS
       ===================================================== */

    const adminDisabledActions =
        document.querySelectorAll(
            ".admin-disabled-action"
        );


    adminDisabledActions.forEach(
        function (action) {

            action.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const message =
                        "This dashboard is currently a static preview. Secure content management will be connected when a backend is available.";

                    /*
                     * Use the browser's accessible alert
                     * rather than pretending an action occurred.
                     */
                    window.alert(message);
                }
            );
        }
    );


    /* =====================================================
       7. IMAGE ERROR HANDLING
       ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                image.classList.add(
                    "image-error"
                );

                /*
                 * Keep the broken-image area usable rather
                 * than replacing the user's image source.
                 */
            },
            {
                once: true
            }
        );
    });


    /* =====================================================
       8. CURRENT PAGE BODY CLASS
       ===================================================== */

    function addPageClass() {

        let page =
            window.location.pathname
                .split("/")
                .pop();

        if (!page) {
            page = "index.html";
        }

        const pageName =
            page
                .replace(
                    ".html",
                    ""
                )
                .toLowerCase();

        document.body.classList.add(
            "page-" + pageName
        );
    }

    addPageClass();


    /* =====================================================
       9. EXTERNAL RESOURCE SAFETY
       ===================================================== */

    /*
     * Prevent accidental submission of unfinished forms
     * that still use "#" as an action.
     */
    const unfinishedForms =
        document.querySelectorAll(
            'form[action="#"]'
        );


    unfinishedForms.forEach(
        function (form) {

            if (
                form.id === "contact-form"
            ) {
                return;
            }

            form.addEventListener(
                "submit",
                function (event) {
                    event.preventDefault();
                }
            );
        }
    );


    /* =====================================================
       10. BACK TO TOP BEHAVIOUR
       ===================================================== */

    const backToTopLinks =
        document.querySelectorAll(
            'a[href="#top"], a[href="#main-content"]'
        );


    backToTopLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    window.setTimeout(
                        function () {

                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });

                        },
                        0
                    );
                }
            );
        }
    );


    /* =====================================================
       11. FINAL PAGE READY STATE
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            function () {
                document.body.classList.add(
                    "site-ready"
                );
            },
            {
                once: true
            }
        );

    } else {

        document.body.classList.add(
            "site-ready"
        );
    }


    /* =====================================================
       12. END
       ===================================================== */

})();