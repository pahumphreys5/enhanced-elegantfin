(function () {
    'use strict';

    const KEY = "displayPreferences";

    function forceBackdrop() {
        try {
            let prefs = JSON.parse(localStorage.getItem(KEY)) || {};

            prefs.enableBackdrops = true;
            prefs.backdrops = true;
            prefs.enableBackdrop = true;

            localStorage.setItem(KEY, JSON.stringify(prefs));
        } catch (e) {}
    }

    function lockSettings() {
        const original = localStorage.setItem;

        localStorage.setItem = function (key, value) {
            if (key === KEY) {
                try {
                    let prefs = JSON.parse(value);

                    prefs.enableBackdrops = true;
                    prefs.backdrops = true;
                    prefs.enableBackdrop = true;

                    value = JSON.stringify(prefs);
                } catch (e) {}
            }
            return original.apply(this, arguments);
        };
    }

    function enhanceBackdropLoading() {
        const observer = new MutationObserver(() => {
            const bg = document.querySelector(".backdropImage");
            if (bg) {
                bg.style.opacity = "1";
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function init() {
        forceBackdrop();
        lockSettings();
        enhanceBackdropLoading();

        // Keep enforcing against sync
        setInterval(forceBackdrop, 2000);
    }

    document.addEventListener("DOMContentLoaded", init);
    window.addEventListener("load", init);

})();
