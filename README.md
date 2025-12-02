# Cache Enabler Dark Fork

Cache Enabler Dark Fork is a fork of the KeyCDN Cache Enabler plugin that adds the ability to cache separate versions of your site for light and dark themes based on user preferences.

This plugin also significantly simplifies the process of setting up light and dark themes.

This fork extends Cache Enabler with the following features:

* **Light and Dark Theme Caching**: Automatically creates separate cache files for light and dark themes
* **Theme Toggle Shortcode**: Easy-to-use shortcode `[cedf_theme_toggle]` to add a theme toggle button to your site
* **Customizable Toggle Text**: Configure the text displayed on the toggle button from the settings page
* **Customizable Default Theme**: Configure whether light or dark theme is the default for new visitors

*This plugin is not affiliated with KeyCDN.*

*Visit the KeyCDN Cache Enabler plugin page on WordPress or its Github repository for more information about the original plugin.*

*https://wordpress.org/plugins/cache-enabler/*

*https://github.com/keycdn/cache-enabler*

## Setup Guide to Cache Dark and Light Themes

A lot of steps in setting up dark and light themes are done for you.

- The plugin automatically adds the appropriate theme class (`cedf-light-theme` or `cedf-dark-theme`) to the `<body>` tag according to cookie value or the configured default theme.

- You can configure a default theme (Light or Dark) that will be used when no cookie is set or if the cookie value is invalid.

- Pre-built Javascript allows the user to toggle between themes and update cookie values accordingly.

- Configuration of prefixed CSS classes are done for you to make it easy to customize your themes with CSS. Supports both CSS patterns (light base with dark override, or dark base with light override).

### Activate and configure Cache Enabler Dark Fork

Make sure you deactivate previous installations of caching plugins.

Install and activate the Cache Enabler Dark Fork plugin.

Configure Cache Enabler following the original Cache Enabler documentation.

Check the "Enable Light and Dark Theme Caching" option.

Optionally set the "Default Theme" to "Dark" if you want the dark theme to be the default for new visitors when no cookie is set or cookie value is invalid.

Optionally customize the "Light Mode Text" and "Dark Mode Text" fields to change the text displayed on the toggle button.

### Add the toggle to your website with a shortcode

Add the `[cedf_theme_toggle]` shortcode to your website to allow the user to switch themes. This shortcode is referred to as a toggle in this guide.

``` html
[cedf_theme_toggle]
```

### Markup the toggle with CSS

The shortcode creates the following `<div>` tag with the text configured in the Cache Enabler settings. You should not add the HTML directly since it is dynamically generated based on user preferences.

``` html
<div class="cedf-theme-toggle">Light Mode</div>
```

Add CSS to your website to mark up the toggle added. Basic colors, hover effects, and click effects are added to get you started.

``` css
.cedf-theme-toggle {
    cursor: pointer;
    background-color: #fff;
    color: #121212;
}
.cedf-theme-toggle:hover,
.cedf-theme-toggle:active {
    opacity: 0.7;
}
```
### Markup your themes with CSS

The plugin adds either `cedf-light-theme` or `cedf-dark-theme` class to the body tag based on the user's preference. You can use either CSS pattern:

**Pattern A: Light theme as base (default)**
- Your base CSS defines the light theme
- Add `.cedf-dark-theme` selectors to override for dark theme

**Pattern B: Dark theme as base**
- Your base CSS defines the dark theme  
- Add `.cedf-light-theme` selectors to override for light theme

#### Pattern A Example: Light theme as base

``` css
/*
 * Pattern A: Light theme as base, dark theme as override
 *
 * Base CSS defines the light theme (no class needed)
 * Use "cedf-dark-theme" as the selector for dark theme overrides.
 */

/* Base CSS - light theme */
body {
    background-color: #ffffff;
    color: #121212;
}

/* Dark theme overrides */
body.cedf-dark-theme,
body.cedf-dark-theme article,
body.cedf-dark-theme .cedf-theme-toggle {
    background-color: #121212;
    color: #f7f7f7;
}

/* Example to swap a default logo for a dark themed logo */
.my-dark-logo {
    display: none;
}
body.cedf-dark-theme .my-light-logo {
    display: none;
}
body.cedf-dark-theme .my-dark-logo {
    display: block;
}
```

#### Pattern B Example: Dark theme as base

``` css
/*
 * Pattern B: Dark theme as base, light theme as override
 *
 * Base CSS defines the dark theme (no class needed)
 * Use "cedf-light-theme" as the selector for light theme overrides.
 */

/* Base CSS - dark theme */
body {
    background-color: #121212;
    color: #f7f7f7;
}

/* Light theme overrides */
body.cedf-light-theme,
body.cedf-light-theme article,
body.cedf-light-theme .cedf-theme-toggle {
    background-color: #ffffff;
    color: #121212;
}

/* Example to swap a default logo for a light themed logo */
.my-light-logo {
    display: none;
}
body.cedf-light-theme .my-dark-logo {
    display: none;
}
body.cedf-light-theme .my-light-logo {
    display: block;
}
```

### Testing and Troubleshooting

Test and make sure Cache Enabler is creating a cache for both themes by examining the wp-content/cache/cache-enabler directory.

If it isn't creating a cache for both themes, make sure the cookie is being set correctly, clear your cookies for your staging website, check your CSS, and make sure you don't have the original KeyCDN Cache Enabler plugin installed.

Thoroughly test pages, posts, and archives to make sure you have configured all the necessary markup for both light and dark themes.
