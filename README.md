# Cache Enabler Dark Fork

Cache Enabler Dark Fork adds the ability to cache light and dark themes and is a fork of the KeyCDN Cache Enabler plugin.
 
This plugin has been updated to significantly simplify the process of adding the ability to cache light and dark themes since the original pre-released versions of this plugin.
 
It is still undergoing refinement and review until it is ready for production use.

The next major tasks before production release is to allow the user to customize the front-end text values for the toggle, complete documentation for production release, perform testing, and perform final code and documentation review.

*This plugin is not affiliated with KeyCDN.*

*Visit the KeyCDN Cache Enabler plugin page on WordPress or its Github repository for more information about the original plugin.*

*https://wordpress.org/plugins/cache-enabler/*

*https://github.com/keycdn/cache-enabler*

## Setup Guide to Cache Dark and Light Themes

A lot of steps in setting up Dark and Light themes are done for you.

- The WordPress plugin automatically adds the dark theme class to the `<body>` tag on init based on cookie values.

- Pre-built Javascript automatically sets user preferences with a cookie on their first visit.

- Pre-built Javascript allows the user to toggle settings and change cookie values according to toggle settings.

- Configuration of prefixed CSS classes are done for you to make it easy to customize your new dark theme with CSS.

- It does all of this while creating a cache for both themes.

### Activate and configure Cache Enabler Dark Fork

Make sure you deactivate previous installations of caching plugins.

Install and activate the Cache Enabler Dark Fork plugin.

Configure Cache Enabler following the original Cache Enabler documentation.

Check the "Enable Light and Dark Theme Caching" option.

### Add toggle to your website with HTML

Add a `<div>` tag to your website to allow the user to switch themes. This `<div>` tag is referred to as a toggle in this guide.

Do not change the "cedf-selected-theme" class name since it is used by Cache Enabler.

Do not add any inner HTML to this tag since Javascript will update the value and may cause flicker. There will still be a delay before it is shown as Javascript checks for a cookie and setups a cookie based on user preferences if not yet created.

``` html
<!-- Do not change the class name since it is used by Cache Enabler -->
<div class="cedf-selected-theme"></div> <!-- Do not add any inner HTML to this tag. -->
```

### Markup the toggle with CSS

Add CSS to your website to mark up the toggle added. Basic hover and click effects are added to get you started.

Do not change the "cedf-selected-theme" class name since it is used by Cache Enabler.

``` css
.cedf-selected-theme { /* Do not change the class name since it is used by Cache Enabler */
    cursor: pointer;
}
.cedf-selected-theme:hover,
.cedf-selected-theme:active { /* Do not change the class name since it is used by Cache Enabler */
    opacity: 0.7;
}
```
### Markup your new dark theme with CSS

The light theme is the default CSS being used by Cache Enabler. Add CSS to change the default CSS for the dark theme when the user enables the dark theme. You will likely need to adjust colors to several selectors. I have provided a brief example of this step and added an example of how to swap light and dark logos.

``` css
/*
 * Adjust and add your own CSS to complete your dark theme.
 *
 * Use "cedf-dark-theme" as the selector for the dark theme.
 *
 * Do not change this class name since it is used by Cache Enabler.
 */

/* Example to change the default website colors for the dark theme */
body.cedf-dark-theme {
    background-color: #121212;
    color: #f7f7f7;
}


/* Example to change colors for a section of the dark theme */
body.cedf-dark-theme article {
    background-color: #232323;
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

Test and make sure Cache Enabler is creating a cache for both themes by examining the wp-content/cache/cache-enabler directory.

If it isn't creating a cache for both themes, make sure the cookie is being set correctly, clear your cookies for your staging website, check your CSS, and make sure you don't have the original KeyCDN Cache Enabler plugin installed.
