<?php
/*
 * Plugin Name: Cache Enabler Dark Fork
 * Text Domain: cache-enabler-dark-fork
 * Description: Lightweight and fast WordPress caching plugin with features to cache light and dark themes.
 * Author: aSolution.company
 * Author URI: https://asolution.company
 * License: GPLv2 or later
 * Version: 1.8.15-fork.1
 * 
 * Cache Enabler Dark Fork adds the ability to cache light and dark themes and is a fork of the KeyCDN 
 * Cache Enabler plugin.
 * 
 * This plugin has been updated to significantly simplify the process of adding the ability to cache 
 * light and dark themes since the original pre-released versions of this plugin.
 * 
 * It is still undergoing refinement and review until it is ready for production use.
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
