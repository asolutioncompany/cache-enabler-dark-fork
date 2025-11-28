(function() { // Encapsulation
    'use strict';

    /*
     * Prefix used by Cache Enabler Dark Fork
     *
     * Do not change this value as it is used by Cache Enabler.
     */
    const cedf_prefix = 'cedf';

    /*
     * Text of the toggle added to the website to show the selected theme as the light theme.
     *
     * You may freely edit the text.
     */
    const cedf_light_theme_text = 'Light Mode';

    /*
     * Text of the toggle added to the website to show the selected theme as the dark theme.
     *
     * You may freely edit the text.
     */
    const cedf_dark_theme_text = 'Dark Mode';

    /*
     * Class of toggle to show and change selected theme
     *
     * Do not change the name since it is used by Cache Enabler.
     */
    const cedf_change_theme_button_class = cedf_prefix + '-selected-theme';
    const cedf_selected_theme = document.querySelector('.' + cedf_change_theme_button_class);

    /*
     * Cookie name used by Cache Enabler to store user preferences
     *
     * Do not change the name since it is used by Cache Enabler.
     */
    const cedf_cookie_name = cedf_prefix + '-theme';

    /*
     * Value of cookie set in Cache Enabler for the light theme
     *
     * Do not change the value since it is used by Cache Enabler.
     */
    const cedf_light_theme = '0'; // Equivalent value if cookie is not set

    /*
     * Value of cookie set in Cache Enabler for the dark theme
     *
     * Do not change the value since it is used by Cache Enabler.
     */
    const cedf_dark_theme = '1';

    /*
     * CSS selector added to the HTML body tag for the dark theme
     *
     * Do not change the value since it is used by Cache Enabler.
     */
    const cedf_body_class = cedf_prefix + '-dark-theme';

    /*
     * Cookie expiration time in milliseconds (1 year)
     *
     * You may freely edit this value.
     */
    const cedf_cookie_expiration_ms = 31536000000; // 365 * 24 * 60 * 60 * 1000

    /**
     * Set the Cache Enabler theme cookie.
     *
     * @param {string} value - The cookie value to set ('0' for light theme, '1' for dark theme).
     */
    function cedf_set_cookie(value) {
        if (typeof value !== 'string') {
            return;
        }
        const date = new Date();
        date.setTime(date.getTime() + cedf_cookie_expiration_ms);
        document.cookie = cedf_cookie_name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    }

    /**
     * Get the Cache Enabler theme cookie value.
     *
     * @returns {string} The cookie value ('0' for light theme, '1' for dark theme), or empty string if not set.
     */
    function cedf_get_cookie() {
        if (!document.cookie) {
            return '';
        }
        const cookieValue = ('; ' + document.cookie).split('; ' + cedf_cookie_name + '=').pop();
        if (!cookieValue) {
            return '';
        }
        return cookieValue.split(';')[0];
    }

    // Ensure document.body exists before proceeding
    if (!document.body) {
        return;
    }

    let cedf_new_theme = cedf_light_theme; // light theme is the default

    // Detect user preference.
    if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            cedf_new_theme = cedf_dark_theme;
        }
    }

    // Change to dark theme if user preference is the dark theme and cookie is not yet set.
    if (cedf_new_theme === cedf_dark_theme) {
        const existingCookie = cedf_get_cookie();
        if (!existingCookie) {
            document.body.classList.toggle(cedf_body_class);
            cedf_set_cookie(cedf_dark_theme);
        }
    }

    // Do not run the Javascript if the toggle is not added to the current page
    if (cedf_selected_theme) {
        // Set the text shown on the toggle added to your website
        if (document.body.classList.contains(cedf_body_class)) {
            cedf_selected_theme.innerHTML = cedf_dark_theme_text;
        } else {
            cedf_selected_theme.innerHTML = cedf_light_theme_text;
        }

        /**
         * Add event listener to the toggle added to your website.
         *
         * Toggle the cookie and text shown on the toggle added to your website
         * if the toggle is clicked.
         */
        cedf_selected_theme.addEventListener('click', function() {
            if (!document.body) {
                return;
            }
            document.body.classList.toggle(cedf_body_class);

            if (document.body.classList.contains(cedf_body_class)) {
                cedf_selected_theme.innerHTML = cedf_dark_theme_text;
                cedf_set_cookie(cedf_dark_theme);
            } else {
                cedf_selected_theme.innerHTML = cedf_light_theme_text;
                cedf_set_cookie(cedf_light_theme);
            }
        });
    }
})(this);