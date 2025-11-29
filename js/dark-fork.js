(function() { // Encapsulation
    'use strict';

    // Ensure document.body exists before proceeding
    if (!document.body) {
        return;
    }

    /*
     * Prefix used by Cache Enabler Dark Fork
     */
    const cedf_prefix = 'cedf';

    /*
     * Class of toggle to show and change selected theme
     */
    const cedf_change_theme_button_class = cedf_prefix + '-theme-toggle';
    const cedf_theme_toggle = document.querySelector('.' + cedf_change_theme_button_class);

    // Do not run the Javascript if the toggle is not added to the current page
    if (!cedf_theme_toggle) {
        return;
    }

    /*
     * Text of the toggle added to the website to show the selected theme as the light theme.
     *
     * Uses text from WordPress settings if available, otherwise defaults to 'Light Mode'.
     */
    const cedf_light_theme_text = (typeof cacheEnablerDarkFork !== 'undefined' && cacheEnablerDarkFork.lightThemeText)
        ? cacheEnablerDarkFork.lightThemeText
        : 'Light Mode';

    /*
     * Text of the toggle added to the website to show the selected theme as the dark theme.
     *
     * Uses text from WordPress settings if available, otherwise defaults to 'Dark Mode'.
     */
    const cedf_dark_theme_text = (typeof cacheEnablerDarkFork !== 'undefined' && cacheEnablerDarkFork.darkThemeText)
        ? cacheEnablerDarkFork.darkThemeText
        : 'Dark Mode';

    /*
     * Cookie name used by Cache Enabler to store user preferences
     */
    const cedf_cookie_name = cedf_prefix + '-theme';

    /*
     * Value of cookie set in Cache Enabler for the light theme
     */
    const cedf_light_theme = '0';

    /*
     * Value of cookie set in Cache Enabler for the dark theme
     */
    const cedf_dark_theme = '1';

    /*
     * CSS selector added to the HTML body tag for the light theme
     */
    const cedf_light_body_class = cedf_prefix + '-light-theme';

    /*
     * CSS selector added to the HTML body tag for the dark theme
     */
    const cedf_dark_body_class = cedf_prefix + '-dark-theme';

    /*
     * Cookie expiration time in milliseconds (1 year)
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
     * Add event listener to the toggle added to your website.
     *
     * Toggle the cookie and text shown on the toggle added to your website
     * if the toggle is clicked.
     */
    cedf_theme_toggle.addEventListener('click', function() {
        if (!document.body) {
            return;
        }
        
        // Check current theme before removing classes
        const isCurrentlyDark = document.body.classList.contains(cedf_dark_body_class);
        
        // Remove both theme classes
        document.body.classList.remove(cedf_light_body_class, cedf_dark_body_class);
        
        if (isCurrentlyDark) {
            // Currently dark, switch to light
            document.body.classList.add(cedf_light_body_class);
            cedf_theme_toggle.innerHTML = cedf_light_theme_text;
            cedf_set_cookie(cedf_light_theme);
        } else {
            // Currently light, switch to dark
            document.body.classList.add(cedf_dark_body_class);
            cedf_theme_toggle.innerHTML = cedf_dark_theme_text;
            cedf_set_cookie(cedf_dark_theme);
        }
    });
})(this);