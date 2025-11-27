# Cache Enabler Dark Fork

Adds the capability to cache light and dark themes based on a cookie value.

The fork has been updated from the original version to simplify the process of adding the ability to cache light and dark theme for a website.

Follow the setup guide to create your own UX for allowing users to switch themes.

# Setup Guide to Cache Dark and Light Themes

Add a div tag to your website to allow the user to switch themes. This div tag is referred to as a toggle in this guide.

Use the prefix configured in Cache Enabler to prevent naming conflicts. The example prefix of "my" provided in Cache Enabler is being used for this guide. Do not change "selected-theme" since it is used by Cache Enabler.

Do not add any inner HTML to this tag since Javascript will update the value and may cause flicker.

``` html
<!-- Adjust the my prefix as needed -->
<div class="my-selected-theme"></div> <!-- Do not add any inner HTML to this tag. -->
```

Add CSS to your website to mark up your link or button. Basics of hover and click effects are added to get you started.

Use the prefix configured in Cache Enabler to prevent naming conflicts. The example prefix of "my" provided in Cache Enabler is being used for this guide. Do not change "selected-theme" since it is used by Cache Enabler.

``` css
.my-selected-theme { /* Adjust the my prefix and properties as needed */
    cursor: pointer;
}
.my-selected-theme:hover,
.my-selected-theme:active { /* Adjust the my prefix and properties as needed */
    opacity: 0.7;
}
```

Add Javascript to your website to change and set the cookie value. You should not need to change anything except the prefix if you set a different prefix in Cache Enabler.

You will need to set cedf_prefix to the prefix you set in Cache Enabler. You may also customize the text of the button. You should not adjust other constants and code since it Cache Enabler expects the names and values used and to simplify configuration.

Code is encapsulated in the example, but prefixes are added for clarity and if you decide not to encapsulate your Javascript.

``` javascript
(function() { // Encapsulation
    'use strict';

    /*
     * Prefix set by you in Cache Enabler
     *
     * You may need to change this if you set a different prefix in Cache Enabler.
     */
    const cedf_prefix = 'my';

    /*
     * Text of the toggle added to the website to show the selected theme as the light theme.
     *
     * You may wish to edit the text.
     */
    const cedf_light_theme_text = 'Light Mode';

    /*
     * Text of the toggle added to the website to show the selected theme as the dark theme.
     *
     * You may wish to edit the text.
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
     * Set the Cache Enabler theme cookie.
     */
    function cedf_set_cookie(value) {
        let date = new Date();
        date.setTime(date.getTime() + (365*24*60*60*100));
        document.cookie = cedf_cookie_name + '=' + value + ';expires=' + date.toUTCString()  + ';path=/';
    }

    /*
     * Remove the Cache Enabler theme cookie.
     *
     * Function is not used but provided for convenience.
     */
    function cedf_remove_cookie() {
        document.cookie = cedf_cookie_name + '=;expires=' + new Date(0).toUTCString() + ';path=/';
    }

    /*
     * Get the Cache Enabler theme cookie.
     */
    function cedf_get_cookie() {
        return ('; '+document.cookie).split('; ' + cedf_cookie_name + '=').pop().split(';')[0];
    }

    let cedf_new_theme = cedf_light_theme; // light theme is the default

    // Detect user preference.
    if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            cedf_new_theme = cedf_dark_theme;
        }
    }

    // Change to dark theme if user preference is the dark theme.
    if (cedf_new_theme == cedf_dark_theme) {
        if ( ! cedf_get_cookie() ) {
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

        /*
         * Add event listener to the toggle added to your website.
         *
         * Toggle the cookie and text shown on the toggle added to your website
         * if the toggle is clicked.
         */
        cedf_selected_theme.addEventListener('click', function() {
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
```

The light theme is the default CSS being used by Cache Enabler. Add CSS to change the default CSS for the dark theme when the user enables the dark theme. You will likely need to adjust colors to several selectors. I have provided a brief example of this step and added an example of how to swap light and dark logos.

``` css
/*
 * Adjust and add your own CSS to complete your dark theme.
 *
 * Use "my-dark-theme" as the selector for the dark theme, adjusting the "my" prefix set in Cache Enabler.
 */

/* Example to change the default website colors for the dark theme */
body.my-dark-theme {
    background-color: #121212;
    color: #f7f7f7;
}


/* Example to change colors for a section of the dark theme */
body.my-dark-theme article {
    background-color: #232323;
    color: #f7f7f7;
}


/* Example to swap a default logo for a dark themed logo */
.my-dark-logo {
    display: none;
}
body.my-dark-theme .my-light-logo {
    display: none;
}
body.my-dark-theme .my-dark-logo {
    display: block;
}

```

Test and make sure Cache Enabler is creating a cache for both themes by examining the wp-content/cache/cache-enabler directory.

If it isn't creating a cache for both themes, make sure the cookie is being set correctly, check your Javascript for errors, and make sure you don't have the original KeyCDN Cache Enabler plugin installed.

# Cache Enabler - WordPress Caching Plugin

Cache Enabler is a lightweight caching plugin for WordPress that makes your website faster by generating static HTML files. It supports converting inline image URLs to WebP, creating a separate mobile cache, and pre-compressing cached pages with Brotli and Gzip.

## Documentation

[Read the plugin documentation](https://www.keycdn.com/support/wordpress-cache-enabler-plugin).

## Changelog

[Learn about the latest improvements](https://wordpress.org/plugins/cache-enabler/#developers).

## Got a question?

Please do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests. Instead, use the [WordPress Support Forums](https://wordpress.org/support/plugin/cache-enabler/) to ask support-related questions.

## Want to help?

Want to file a bug, contribute some code, or improve translations? Excellent! Check out our [issues](https://github.com/keycdn/cache-enabler/issues) or [translations](https://translate.wordpress.org/projects/wp-plugins/cache-enabler/).
