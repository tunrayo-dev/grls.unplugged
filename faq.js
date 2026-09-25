/* ========================================
   GIRLS UNPLUGGED
   FAQ JAVASCRIPT
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const faqItems =
            document.querySelectorAll(
                ".faq-item"
            );

        if (!faqItems.length) {
            return;
        }

        faqItems.forEach(
            (item) => {

                item.addEventListener(
                    "toggle",
                    () => {

                        if (!item.open) {
                            return;
                        }

                        faqItems.forEach(
                            (otherItem) => {

                                if (
                                    otherItem !== item &&
                                    otherItem.open
                                ) {
                                    otherItem.open =
                                        false;
                                }

                            }
                        );

                    }
                );

            }
        );

    }
);