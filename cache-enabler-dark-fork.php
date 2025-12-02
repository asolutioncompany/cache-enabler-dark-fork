<?php
/**
 * Cache Enabler Dark Fork
 *
 * Cache Enabler Dark Fork is a fork of the KeyCDN Cache Enabler plugin that adds the ability to
 * cache separate versions of your site for light and dark themes based on user preferences.
 *
 * This plugin also significantly simplifies the process of setting up light and dark themes.
 *
 * This fork extends Cache Enabler with the following features:
 *
 * Light and Dark Theme Caching: Automatically creates separate cache files for light and dark themes
 * Theme Toggle Shortcode: Easy-to-use shortcode to add a theme toggle button to your site
 * Customizable Toggle Text: Configure the text displayed on the toggle button from the settings page
 * Customizable Default Theme: Configure whether light or dark theme is the default for new visitors.
 *
 * Visit the Github page for the Setup Guide and more information:
 *
 * https://github.com/asolutioncompany/cache-enabler-dark-fork
 *
 * Forked from KeyCDN Cache Enabler v 1.8.15
 *
 * The original KeyCDN Cache Enabler plugin provides a lightweight page caching plugin for WordPress that
 * makes your website faster by generating static HTML files.
 *
 * It is quick and easy to setup and use and plays well with other performance enhancing plugins,
 * such as Autoptimize, without redundancy of functionality.
 *
 * The original Cache Enabler plugin is available at:
 *
 * https://github.com/keycdn/cache-enabler
 *
 * https://wordpress.org/plugins/cache-enabler/
 *
 * This plugin is not affiliated with KeyCDN.
 *
 * @wordpress-plugin
 * Plugin Name: Cache Enabler Dark Fork
 * Plugin URI: https://github.com/asolutioncompany/cache-enabler-dark-fork
 * Description: Lightweight and fast WordPress caching plugin with features to cache light and dark themes.
 * Version: 1.8.15-fork.1-beta
 * Requires PHP: 8.1
 * Author: aSolution.company
 * Author URI: https://asolution.company
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: cache-enabler-dark-fork
 * Domain Path: /languages
 */

/*
Copyright (C) 2024 KeyCDN

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require __DIR__ . '/constants.php';

add_action( 'plugins_loaded', array( 'Cache_Enabler', 'init' ) );
register_activation_hook( CACHE_ENABLER_FILE, array( 'Cache_Enabler', 'on_activation' ) );
register_deactivation_hook( CACHE_ENABLER_FILE, array( 'Cache_Enabler', 'on_deactivation' ) );
register_uninstall_hook( CACHE_ENABLER_FILE, array( 'Cache_Enabler', 'on_uninstall' ) );

spl_autoload_register( 'cache_enabler_autoload' );

function cache_enabler_autoload( $class_name ) {
    if ( in_array( $class_name, array( 'Cache_Enabler', 'Cache_Enabler_Engine', 'Cache_Enabler_Disk' ), true ) ) {
        require_once sprintf(
            '%s/inc/%s.class.php',
            CACHE_ENABLER_DIR,
            strtolower( $class_name )
        );
    }
}

if ( defined( 'WP_CLI' ) && WP_CLI && class_exists( 'WP_CLI' ) ) {
    require_once CACHE_ENABLER_DIR . '/inc/cache_enabler_cli.class.php';
    WP_CLI::add_command( 'cache-enabler', 'Cache_Enabler_CLI' );
}
