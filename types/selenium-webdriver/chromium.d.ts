import type { MapOf, SuggestedString } from './_internal.js';
import type * as http from './http/index.js';
import type { Capabilities, Capability } from './lib/capabilities.js';
import * as Symbols from './lib/symbols.js';
import type { IDimensions, IWebDriver, WebDriver } from './lib/webdriver.js';
import type * as remote from './remote/index.js';

declare function createExecutor(url: Promise<string>, vendorPrefix: string): http.Executor;

declare function configureExecutor(executor: http.Executor, vendorPrefix: string): void;

export namespace Chromium {
  export const Command: Command.Enum;
  export type Command = SuggestedString<Command._>;
  export namespace Command {
    export interface Enum {
      LAUNCH_APP: LaunchApp;
      DELETE_NETWORK_CONDITIONS: DeleteNetworkConditions;
      GET_CAST_ISSUE_MESSAGE: GetCastIssueMessage;
      GET_CAST_SINKS: GetCastSinks;
      GET_NETWORK_CONDITIONS: GetNetworkConditions;
      SEND_DEVTOOLS_COMMAND: SendDevToolsCommand;
      SEND_AND_GET_DEVTOOLS_COMMAND: SendAndGetDevToolsCommand;
      SET_CAST_SINK_TO_USE: SetCastSinkToUse;
      SET_NETWORK_CONDITIONS: SetNetworkConditions;
      SET_PERMISSION: SetPermission;
      START_CAST_DESKTOP_MIRRORING: StartDesktopMirroring;
      START_CAST_TAB_MIRRORING: StartCastTabMirroring;
      STOP_CASTING: StopCasting;
    }

    export type _ = DeleteNetworkConditions
                  | GetCastIssueMessage
                  | GetCastSinks
                  | GetNetworkConditions
                  | LaunchApp
                  | SendAndGetDevToolsCommand
                  | SendDevToolsCommand
                  | SetCastSinkToUse
                  | SetNetworkConditions
                  | SetPermission
                  | StartCastTabMirroring
                  | StartDesktopMirroring
                  | StopCasting;
    export type DeleteNetworkConditions = 'deleteNetworkConditions';
    export type GetCastIssueMessage = 'getCastIssueMessage';
    export type GetCastSinks = 'getCastSinks';
    export type GetNetworkConditions = 'getNetworkConditions';
    export type LaunchApp = 'launchApp';
    export type SendAndGetDevToolsCommand = 'sendAndGetDevToolsCommand';
    export type SendDevToolsCommand = 'sendDevToolsCommand';
    export type SetCastSinkToUse = 'setCastSinkToUse';
    export type SetNetworkConditions = 'setNetworkConditions';
    export type SetPermission = 'setPermission';
    export type StartCastTabMirroring = 'setCastTabMirroring';
    export type StartDesktopMirroring = 'startDesktopMirroring';
    export type StopCasting = 'stopCasting';
  }

  export class Driver extends WebDriver implements IWebDriver {
    /**
     * Creates a new session with the WebDriver server.
     *
     * @param caps The configuration options.
     * @param opt_serviceExecutor Either a DriverService to use for the remote end, or
     *     a preconfigured executor for an externally managed endpoint. If neither is provided, the
     *     {@linkplain ##getDefaultService default service} will be used by default.
     * @param vendorPrefix Either 'goog' or 'ms'
     * @param vendorCapabilityKey Either 'goog:chromeOptions' or 'ms:edgeOptions'
     * @return {!Driver} A new driver instance.
     */
    static createSession<T extends Record<Capability, unknown>>(
      caps: Chromium.Options<T> | Capabilities<T> | MapOf<T> | T,
      opt_serviceExecutor: remote.DriverService | http.Executor,
      vendorPrefix?: Chromium.Vendor.Prefix,
      vendorCapabilityKey?: Chromium.Vendor.CapabilityKey
    ): Driver;


    /**
     * This function is a no-op as file detectors are not supported by this
     * implementation.
     * @override
     */
    setFileDetector(): void;

    /**
     * Schedules a command to launch Chrome App with given ID.
     * @param id ID of the App to launch.
     * @return A promise that will be resolved when app is launched.
     */
    launchApp(id: string): Promise<void>;

    /**
     * Schedules a command to get Chromium network emulation settings.
     * @return A promise that will be resolved when network emulation settings are retrieved.
     */
    getNetworkConditions(): Promise<Chromium.NetworkConditions>;

    /**
     * Schedules a command to delete Chromium network emulation settings.
     * @return A promise that will be resolved when network emulation settings have been deleted.
     */
    deleteNetworkConditions(): Promise<void>;

    /**
     * Schedules a command to set Chromium network emulation settings.
     *
     * __Sample Usage:__
     *
     *  driver.setNetworkConditions({
     *    offline: false,
     *    latency: 5, // Additional latency (ms).
     *    download_throughput: 500 * 1024, // Maximal aggregated download throughput.
     *    upload_throughput: 500 * 1024 // Maximal aggregated upload throughput.
     * });
     *
     * @param spec Defines the network conditions to set
     * @return A promise that will be resolved when network emulation settings are set.
     */
    setNetworkConditions(spec: Partial<Chromium.NetworkConditions>): Promise<void>;

    /**
     * Sends an arbitrary devtools command to the browser.
     *
     * @param cmd The name of the command to send.
     * @param params The command parameters.
     * @return A promise that will be resolved when the command has finished.
     * @see <https://chromedevtools.github.io/devtools-protocol/>
     */
    sendDevToolsCommand<T>(cmd: string, params?: T): Promise<void>;

    /**
     * Sends an arbitrary devtools command to the browser and get the result.
     *
     * @param cmd The name of the command to send.
     * @param params The command parameters.
     * @return A promise that will be resolved when the command has finished.
     * @see <https://chromedevtools.github.io/devtools-protocol/>
     */
    sendAndGetDevToolsCommand<T>(cmd: string, params?: T): Promise<string>;

    /**
     * Set a permission state to the given value.
     *
     * @param name A name of the permission to update.
     * @param state State to set permission to.
     * @returns A promise that will be resolved when the command has finished.
     * @see <https://w3c.github.io/permissions/#permission-registry> for valid names
     */
    setPermission(name: string, state: Chromium.PermissionState): Promise<unknown>;

    /**
     * Sends a DevTools command to change the browser's download directory.
     *
     * @param path The desired download directory.
     * @return A promise that will be resolved when the command has finished.
     * @see #sendDevToolsCommand
     */
    setDownloadPath(path: string): Promise<void>;

    /**
     * Returns the list of cast sinks (Cast devices) available to the Chrome media router.
     *
     * @return A promise that will be resolved with an array of Strings containing the friendly
     *     device names of available cast sink targets.
     */
    getCastSinks(): Promise<Array<string>>;

    /**
     * Selects a cast sink (Cast device) as the recipient of media router intents (connect or play).
     *
     * @param deviceName name of the target device.
     * @return A promise that will be resolved when the target device has been selected to respond
     *     further webdriver commands.
     */
    setCastSinkToUse(deviceName: string): Promise<void>;

    /**
     * Initiates desktop mirroring for the current browser tab on the specified device.
     *
     * @param deviceName name of the target device.
     * @return A promise that will be resolved when the mirror command has been issued to the device.
     */
    startDesktopMirroring(deviceName: string): Promise<void>;

    /**
     * Initiates tab mirroring for the current browser tab on the specified device.
     *
     * @param deviceName name of the target device.
     * @return A promise that will be resolved when the mirror command has been issued to the device.
     */
    startCastTabMirroring(deviceName: string): Promise<void>;

    /**
     * Returns an error message when there is any issue in a Cast session.
     * @return A promise that will be resolved when the mirror command has been issued to the device.
     */
    getCastIssueMessage(): Promise<unknown>;

    /**
     * Stops casting from media router to the specified device, if connected.
     *
     * @param deviceName name of the target device.
     * @return A promise that will be resolved when the stop command has been issued to the device.
     */
    stopCasting(deviceName: string): Promise<void>;
  }

  export namespace MobileEmulation {
    export type Device = SuggestedString<'BlackBerry Z30'
      | 'Blackberry PlayBook'
      | 'Galaxy Note 3'
      | 'Galaxy Note II'
      | 'Galaxy S III'
      | 'Galaxy S8'
      | 'Galaxy S9+'
      | 'Galaxy Tab S4'
      | 'Kindle Fire HDX'
      | 'LG Optimus L70'
      | 'Microsoft Lumia 550'
      | 'Microsoft Lumia 950'
      | 'Moto G Power'
      | 'Moto G4'
      | 'Nexus 10'
      | 'Nexus 4'
      | 'Nexus 5'
      | 'Nexus 5X'
      | 'Nexus 6'
      | 'Nexus 6P'
      | 'Nexus 7'
      | 'Nokia Lumia 520'
      | 'Nokia N9'
      | 'Pixel 3'
      | 'Pixel 4'
      | 'JioPhone 2'
      | 'iPhone SE'
      | 'iPhone XR'
      | 'iPhone 12 Pro'
      | 'iPhone 14 Pro Max'
      | 'Pixel 3 XL'
      | 'Pixel 7'
      | 'Samsung Galaxy S8+'
      | 'Samsung Galaxy S20 Ultra'
      | 'iPad Mini'
      | 'iPad Air'
      | 'iPad Pro'
      | 'Surface Pro 7'
      | 'Surface Duo'
      | 'Galaxy Z Fold 5'
      | 'Asus Zenbook Fold'
      | 'Samsung Galaxy A51/71'
      | 'Nest Hub'
      | 'Nest Hub Max'
      | 'Galaxy S5'
      | 'Pixel 2'
      | 'Pixel 2 XL'
      | 'iPhone 4'
      | 'iPhone 5/SE'
      | 'iPhone 6/7/8'
      | 'iPhone 6/7/8 Plus'
      | 'iPhone X'
      | 'iPad'
      // | 'iPad Pro' // This one is duplicated in the Chrome DevTools device list for some reason?
      | 'Facebook on Android'>;

    export interface Named {
      deviceName: Chromium.MobileEmulation.Device;
    }

    export interface Resolution extends IDimensions {
      pixelRatio?: number;
    }
  }

  export interface NetworkConditions {
    download_throughput?: number;
    latency: number;
    offline?: boolean;
    upload_throughput?: number;
  }

  /**
   * Class for managing WebDriver options specific to a Chromium-based browser.
   */
  export class Options<T extends Record<Capability, unknown> = Record<Capability, unknown>> extends Capabilities<T> {
    readonly options_: T & Chromium.Options.Options;
    readonly BROWSER_NAME_VALUE: string;
    readonly CAPABILITY_KEY: string;

    /**
     * @param other Another set of capabilities to initialize this instance from.
     */
    constructor(other?: Options<T> | Capabilities<T> | MapOf<T> | T);

    /**
     * Add additional command line arguments to use when launching the browser.
     * Each argument may be specified with or without the '--' prefix
     * (e.g. '--foo' and 'foo'). Arguments with an associated value should be
     * delimited by an '=': 'foo=bar'.
     *
     * @param args The arguments to add.
     * @return A self reference.
     */
    addArguments(...args: Array<string>): this;

    /**
     * Sets the address of a Chromium remote debugging server to connect to.
     * Address should be of the form '{hostname|IP address}:port'
     * (e.g. 'localhost:9222').
     *
     * @param address The address to connect to.
     * @return A self reference.
     */
    debuggerAddress(address: string): this;

    /**
     * Sets the initial window size.
     *
     * @param size The desired window size.
     * @return A self reference.
     * @throws if width or height is unspecified, not a number, or less than or equal to 0.
     */
    windowSize(size?: Partial<IDimensions>): this;

    /**
     * List of Chrome command line switches to exclude that ChromeDriver by default
     * passes when starting Chrome.  Do not prefix switches with '--'.
     *
     * @param args The switches to exclude.
     * @return A self reference.
     */
    excludeSwitches(...args: Array<string>): this;

    /**
     * Add additional extensions to install when launching the browser. Each extension
     * should be specified as the path to the packed CRX file, or a Buffer for an
     * extension.
     * @param args The extensions to add.
     * @return A self reference.
     */
    addExtensions(...args: Array<string | Buffer>): this;

    /**
     * Sets the path to the browser binary to use. On Mac OS X, this path should
     * reference the actual Chromium executable, not just the application binary
     * (e.g. '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome').
     *
     * The binary path can be absolute or relative to the WebDriver server
     * executable, but it must exist on the machine that will launch the browser.
     *
     * @param path The path to the browser binary to use.
     * @return A self reference.
     */
    setBinaryPath(path: string): this;

    /**
     * Sets whether to leave the started browser process running if the controlling
     * driver service is killed before {@link webdriver.WebDriver#quit()} is
     * called.
     * @param detach Whether to leave the browser running if the driver service is killed before the session.
     * @return A self reference.
     */
    detachDriver(detach: boolean): this;

    /**
     * Sets the user preferences for Chrome's user profile. See the 'Preferences'
     * file in Chrome's user data directory for examples.
     * @param prefs Dictionary of user preferences to use.
     * @return A self reference.
     */
    setUserPreferences(prefs: Chromium.Options.Preferences): this;

    /**
     * Sets the performance logging preferences. Options include:
     *
     * - `enableNetwork`: Whether or not to collect events from Network domain.
     * - `enablePage`: Whether or not to collect events from Page domain.
     * - `enableTimeline`: Whether or not to collect events from Timeline domain.
     *     Note: when tracing is enabled, Timeline domain is implicitly disabled,
     *     unless `enableTimeline` is explicitly set to true.
     * - `traceCategories`: A comma-separated string of Chromium tracing
     *     categories for which trace events should be collected. An unspecified
     *     or empty string disables tracing.
     * - `bufferUsageReportingInterval`: The requested number of milliseconds
     *     between DevTools trace buffer usage events. For example, if 1000, then
     *     once per second, DevTools will report how full the trace buffer is. If
     *     a report indicates the buffer usage is 100%, a warning will be issued.
     *
     * @param prefs The performance logging preferences.
     * @return {!Options} A self reference.
     */
    setPerfLoggingPrefs(prefs: Chromium.Options.PerformanceLoggingPreferences): this;

    /**
     * Sets preferences for the "Local State" file in Chrome's user data
     * directory.
     * @param state Dictionary of local state preferences.
     * @return A self reference.
     */
    setLocalState(state: Chromium.Options.LocalState): this;

    /**
     * Sets the name of the activity hosting a Chrome-based Android WebView. This
     * option must be set to connect to an [Android WebView](
     * https://chromedriver.chromium.org/getting-started/getting-started---android)
     *
     * @param name The activity name.
     * @return A self reference.
     */
    androidActivity(name: string): this;

    /**
     * Sets the device serial number to connect to via ADB. If not specified, the
     * WebDriver server will select an unused device at random. An error will be
     * returned if all devices already have active sessions.
     *
     * @param serial The device serial number to connect to.
     * @return A self reference.
     */
    androidDeviceSerial(serial: string): this;

    /**
     * Sets the package name of the Chrome or WebView app.
     *
     * @param pkg The package to connect to, or `null` to disable Android
     *     and switch back to using desktop browser.
     * @return A self reference.
     */
    androidPackage(pkg: string | null): this;

    /**
     * Sets the process name of the Activity hosting the WebView (as given by
     * `ps`). If not specified, the process name is assumed to be the same as
     * {@link #androidPackage}.
     *
     * @param processName The main activity name.
     * @return A self reference.
     */
    androidProcess(processName: string): this;

    /**
     * Sets whether to connect to an already-running instead of the specified
     * {@linkplain #androidProcess app} instead of launching the app with a clean
     * data directory.
     *
     * @param useRunning Whether to connect to a running instance.
     * @return A self reference.
     */
    androidUseRunningApp(useRunning: boolean): this;

    /**
     * Sets the path to the browser's log file. This path should exist on the machine
     * that will launch the browser.
     * @param path Path to the log file to use.
     * @return A self reference.
     */
    setBrowserLogFile(path: string): this;

    /**
     * Sets the directory to store browser minidumps in. This option is only
     * supported when the driver is running on Linux.
     * @param path The directory path.
     * @return A self reference.
     */
    setBrowserMinidumpPath(path: string): this;

    /**
     * Configures the browser to emulate a mobile device. For more information, refer
     * to the ChromeDriver project page on [mobile emulation][em]. Configuration
     * options include:
     *
     * - `deviceName`: The name of a pre-configured [emulated device][devem]
     * - `width`: screen width, in pixels
     * - `height`: screen height, in pixels
     * - `pixelRatio`: screen pixel ratio
     *
     * __Example 1: Using a Pre-configured Device__
     *
     *     let options = new chrome.Options().setMobileEmulation(
     *         {deviceName: 'Google Nexus 5'});
     *
     *     let driver = chrome.Driver.createSession(options);
     *
     * __Example 2: Using Custom Screen Configuration__
     *
     *     let options = new chrome.Options().setMobileEmulation({deviceMetrics: {
     *         width: 360,
     *         height: 640,
     *         pixelRatio: 3.0
     *     }});
     *
     *     let driver = chrome.Driver.createSession(options);
     *
     * [em]: https://chromedriver.chromium.org/mobile-emulation
     * [devem]: https://developer.chrome.com/devtools/docs/device-mode
     *
     * @param config The mobile emulation configuration, or `null` to disable emulation.
     * @return A self reference.
     */
    setMobileEmulation(config: Chromium.MobileEmulation.Named | Chromium.MobileEmulation.Resolution): this;

    /**
     * Sets a list of the window types that will appear when getting window
     * handles. For access to <webview> elements, include 'webview' in the list.
     * @param args The window types that will appear when getting window handles.
     * @return A self reference.
     */
    windowTypes(...args: Array<string>): this;

    /**
     * Enable bidi connection
     */
    enableBidi(): this;
  }

  export namespace Options {
    export interface Extensions {
      extensions: Array<string | Buffer>;

      get length(): number;

      add(...args: Array<string | Buffer | Array<string | Buffer>>): void;

      [Symbols.serialize](): string;
    }

    export interface LocalState extends Record<string, unknown> {
      accessibility?: Chromium.Options.LocalState.Accessibility;
      autofill?: Chromium.Options.LocalState.Autofill;
      breadcrumbs?: Chromium.Options.LocalState.Breadcrumbs;
      browser?: Chromium.Options.LocalState.Browser;
      cbcm?: Chromium.Options.LocalState.Cbcm;
      enterprise_reporting?: Chromium.Options.LocalState.EnterpriseReporting;
      gcm?: Chromium.Options.LocalState.Gcm;
      hardware_acceleration_mode_previous?: boolean;
      legacy?: Chromium.Options.LocalState.Legacy;
      local?: Chromium.Options.LocalState.Local;
      management?: Chromium.Options.LocalState.Management;
      network_time?: Chromium.Options.LocalState.NetworkTime;
      optimization_guide?: Chromium.Options.LocalState.OptimizationGuide;
      os_crypt?: Chromium.Options.LocalState.OsCrypt;
      os_update_handler_enabled?: boolean;
      performance_intervention?: Chromium.Options.LocalState.PerformanceIntervention;
      policy?: Chromium.Options.LocalState.Policy;
      privacy_budget?: Chromium.Options.LocalState.PrivacyBudget;
      profile?: Chromium.Options.LocalState.Profile;
      profile_network_context_service?: Chromium.Options.LocalState.ProfileNetworkContextService;
      session_id_generator_last_value?: string;
      signin?: Chromium.Options.LocalState.Signin;
      subresource_filter?: Chromium.Options.LocalState.SubResourceFilter;
      tab_stats?: Chromium.Options.LocalState.TabStats;
      ukm?: Chromium.Options.LocalState.Ukm;
      uninstall_metrics?: Chromium.Options.LocalState.UninstallMetrics;
      updateclientdata?: Chromium.Options.LocalState.UpdateClientData;
      user_experience_metrics?: Chromium.Options.LocalState.UserExperienceMetrics;
      variations_compressed_seed?: string;
      variations_country?: string;
      variations_crash_streak?: number;
      variations_failed_to_fetch_seed_stream?: number;
      variations_google_groups?: Record<string, Array<string>>;
      variations_last_fetch_time?: string;
      variations_limited_entropy_synthetic_trial_seed_v2?: string;
      variations_permanent_consistency_country?: Array<string>;
      variations_safe_compressed_seed?: string;
      variations_safe_seed_date?: string;
      variations_safe_seed_fetch_time?: string;
      variations_safe_seed_locale?: string;
      variations_safe_seed_milestone?: number;
      variations_safe_seed_permanent_consistency_country?: string;
      variations_safe_seed_session_consistency_country?: string;
      variations_safe_seed_signature?: string;
      variations_seed_date?: string;
      variations_seed_milestone?: number;
      variations_seed_signature?: string;
      was?: Chromium.Options.LocalState.Was;
    }

    export namespace LocalState {
      export interface AccessibilityCaptions extends Record<string, unknown> {
        soda_registered_language_packs: Array<string>;
      }

      export interface Accessibility extends Record<string, unknown> {
        captions: Chromium.Options.LocalState.AccessibilityCaptions;
      }

      export interface Autofill extends Record<string, unknown> {
        ablation_seed: string;
      }

      export interface Breadcrumbs extends Record<string, unknown> {
        enabled: boolean;
        enabled_time: string;
      }

      export interface Browser extends Record<string, unknown> {
        first_run_finished: boolean;
        last_whats_new_version: number;
        shortcut_migration_version: string;
        whats_new: Chromium.Options.LocalState.Browser.WhatsNew;
      }

      export namespace Browser {
        export interface WhatsNew extends Record<string, unknown> {
          enabled_order: Array<string>;
        }
      }

      export interface Cbcm extends Record<string, unknown> {
        service_account_email: string;
        service_account_refresh_token: string;
      }

      export interface EnterpriseReporting extends Record<string, unknown> {
        last_upload_succeeded_timestamp: string;
        last_upload_timestamp: string;
        last_upload_version: string;
      }

      export interface Gcm extends Record<string, unknown> {
        product_category_for_subtypes: string;
      }

      export interface Legacy extends Record<string, unknown> {
        profile?: Chromium.Options.LocalState.Legacy.Profile;
      }

      export namespace Legacy {
        export interface Profile extends Record<string, unknown> {
          name?: Chromium.Options.LocalState.Legacy.Profile.Name;
        }

        export namespace Profile {
          export interface Name extends Record<string, unknown> {
            migrated?: boolean;
          }
        }
      }

      export interface Local extends Record<string, unknown> {
        password_hash_data_list?: Array<string>;
      }

      export interface Management extends Record<string, unknown> {
        platform?: Chromium.Options.LocalState.Management.Platform;
      }

      export namespace Management {
        export interface Platform extends Record<string, unknown> {
          azure_active_directory?: number;
          enterprise_mdm_win?: number;
        }
      }

      export interface NetworkTime extends Record<string, unknown> {
        network_time_mapping?: Chromium.Options.LocalState.NetworkTime.Mapping;
      }

      export namespace NetworkTime {
        export interface Mapping extends Record<string, unknown> {
          local?: number;
          network?: number;
          ticks?: number;
          uncertainty?: number;
        }
      }

      export interface OptimizationGuide extends Record<string, unknown> {
        model_cache_key_mapping?: Record<string, string>;
        model_execution?: Chromium.Options.LocalState.OptimizationGuide.ModelExecution;
        model_store_metadata?: Record<string, Record<string, Chromium.Options.LocalState.OptimizationGuide.ModelStoreMetadata>>;
        on_device?: Chromium.Options.LocalState.OptimizationGuide.OnDevice;
      }

      export namespace OptimizationGuide {
        export interface ModelExecution extends Record<string, unknown> {
          last_usage_by_feature?: Record<string, unknown>;
        }

        export interface ModelStoreMetadata extends Record<string, unknown> {
          et?: string;
          kbvd?: boolean;
          mbd?: string;
          v?: string;
        }

        export interface OnDevice extends Record<string, unknown> {
          last_version?: string;
          model_crash_count?: number;
          performance_class?: number;
          performance_class_version?: string;
        }
      }

      export interface OsCrypt extends Record<string, unknown> {
        app_bound_encrypted_key?: string;
        audit_enabled?: boolean;
        encrypted_key?: string;
      }

      export interface PerformanceIntervention extends Record<string, unknown> {
        last_daily_sample?: string;
      }

      export interface Policy extends Record<string, unknown> {
        last_statistics_update?: string;
      }

      export interface PrivacyBudget extends Record<string, unknown> {
        meta_experiment_activation_salt: number;
      }

      export interface Profile extends Record<string, unknown> {
        info_cache?: Record<string, Chromium.Options.LocalState.Profile.InfoCache>;
        last_active_profiles?: Array<unknown>;
        metrics?: Chromium.Options.LocalState.Profile.Metrics;
        profile_counts_reported?: string;
        profiles_order?: Array<string>;
      }

      export namespace Profile {
        export interface InfoCache extends Record<string, unknown> {
          active_time?: number;
          avatar_icon?: string;
          background_apps?: boolean;
          default_avatar_fill_color?: number;
          default_avatar_stroke_color?: number;
          enterprise_label?: string;
          force_signin_profile_locked?: boolean;
          gaia_given_name?: string;
          gaia_id?: string;
          gaia_name?: string;
          hosted_domain?: string;
          is_consented_primary_account?: boolean;
          is_ephemeral?: boolean;
          is_glic_eligible?: boolean;
          is_using_default_avatar?: boolean;
          is_using_default_name?: boolean;
          managed_user_id?: string;
          metrics_bucket_index?: number;
          name?: string;
          profile_color_seed?: number;
          profile_highlight_color?: number;
          shortcut_name?: string;
          'signin.with_credential_provider'?: boolean;
          user_name?: string;
        }

        export interface Metrics extends Record<string, unknown> {
          next_bucket_index: number;
        }
      }

      export interface ProfileNetworkContextService extends Record<string, unknown> {
        http_cache_finch_experiment_groups: string;
      }

      export interface Signin extends Record<string, unknown> {
        active_accounts_last_emitted: string;
      }

      export interface UninstallMetrics extends Record<string, unknown> {
        installation_date2?: string;
      }

      export interface SubResourceFilterRulesetVersion extends Record<string, unknown> {
        checksum?: number;
        content?: string;
        format?: number;
      }

      export interface SubResourceFilter extends Record<string, unknown> {
        ruleset_version: Chromium.Options.LocalState.SubResourceFilterRulesetVersion;
      }

      export interface TabStats extends Record<string, unknown> {
        discards_external?: number;
        discards_frozen?: number;
        discards_proactive?: number;
        discards_suggested?: number;
        discards_urgent?: number;
        last_daily_sample?: string;
        max_tabs_per_window?: number;
        reloads_external?: number;
        reloads_frozen?: number;
        reloads_proactive?: number;
        reloads_suggested?: number;
        reloads_urgent?: number;
        total_tab_count_max?: number;
        window_count_max?: number;
      }

      export interface Ukm extends Record<string, unknown> {
        persisted_logs?: Array<unknown>;
      }

      export interface UpdateClientData extends Record<string, unknown> {
        apps?: Record<string, Chromium.Options.LocalState.UpdateClientData.App>;
      }

      export namespace UpdateClientData {
        export interface App extends Record<string, unknown> {
          cohort?: string;
          cohortname?: string;
          dlrc?: number;
          fp?: string;
          installdate?: number;
          max_pv?: string;
          pf?: string;
        }
      }

      export interface UserExperienceMetricsStability extends Record<string, unknown> {
        browser_last_live_timestamp?: string;
        exited_cleanly?: boolean;
        stats_buildtime?: string;
        stats_version?: string;
        system_crash_count?: number;
      }

      export interface UserExperienceMetrics extends Record<string, unknown> {
        default_opt_in?: number;
        limited_entropy_randomization_source?: string;
        low_entropy_source3?: number;
        machine_id?: number;
        pseudo_low_entropy_source?: number;
        session_id?: number;
        stability?: Chromium.Options.LocalState.UserExperienceMetricsStability;
      }

      export interface Was extends Record<string, unknown> {
        restarted: boolean;
      }
    }

    export interface Options extends Record<string, unknown> {
      androidActivity?: string;
      androidDeviceSerial?: string;
      args?: Array<string>;
      binary?: string;
      debuggerAddress?: string;
      detach?: boolean;
      excludeSwitches?: Array<string>;
      extensions?: Chromium.Options.Preferences.Extensions;
      localState?: Chromium.Options.LocalState;
      logPath?: string;
      minidumpPath?: string;
      prefs?: Chromium.Options.Preferences;
      perfLoggingPrefs?: Chromium.Options.PerformanceLoggingPreferences;
    }

    export interface PerformanceLoggingPreferences extends Record<string, unknown> {
      bufferUsageReportingInterval?: number;
      enableNetwork?: boolean;
      enablePage?: boolean;
      enableTimeline?: boolean;
      traceCategories?: string;
    }

    export interface Preferences extends Record<string, unknown> {
      NewTabPage?: Chromium.Options.Preferences.NewTabPage;
      accessibility?: Chromium.Options.Preferences.Accessibility;
      account_tracker_service_last_update?: string;
      alternate_error_pages?: Chromium.Options.Preferences.AlternateErrorPages;
      announcement_notification_service_first_run_time?: string;
      apps?: Chromium.Options.Preferences.Apps;
      autocomplete?: Chromium.Options.Preferences.Autocomplete;
      autofill?: Chromium.Options.Preferences.Autofill;
      bookmark?: Chromium.Options.Preferences.Bookmark;
      browser?: Chromium.Options.Preferences.Browser;
      commerce_daily_metrics_last_update_time?: string;
      countryid_at_install?: number;
      default_apps_install_state?: number;
      default_search_provider?: Chromium.Options.Preferences.DefaultSearchProvider;
      domain_diversity?: Chromium.Options.Preferences.DomainDiversity;
      enterprise_profile_guid?: string;
      extensions?: Chromium.Options.Preferences.Extensions;
      gaia_cookie?: Chromium.Options.Preferences.GaiaCookie;
      gcm?: Chromium.Options.Preferences.Gcm;
      google?: Chromium.Options.Preferences.Google;
      history_clusters?: Chromium.Options.Preferences.HistoryClusters;
      in_product_help?: Chromium.Options.Preferences.InProductHelp;
      intl?: Chromium.Options.Preferences.Intl;
      invalidation?: Chromium.Options.Preferences.Invalidation;
      language_model_counters?: Record<string, number>;
      media?: Chromium.Options.Preferences.Media;
      media_router?: Chromium.Options.Preferences.MediaRouter;
      migrated_user_scripts_toggle?: boolean;
      net?: Chromium.Options.Preferences.Net;
      ntp?: Chromium.Options.Preferences.Ntp;
      omnibox?: Chromium.Options.Preferences.Omnibox;
      optimization_guide?: Chromium.Options.Preferences.OptimizationGuide;
      password_manager?: Chromium.Options.Preferences.PasswordManager;
      pinned_tabs?: Array<unknown>;
      privacy_sandbox?: Chromium.Options.Preferences.PrivacySandbox;
      profile?: Chromium.Options.Preferences.Profile;
      protection?: Record<string, Chromium.Options.Preferences.Protection>;
      safebrowsing?: Chromium.Options.Preferences.SafeBrowsing;
      safety_hub?: Chromium.Options.Preferences.SafetyHub;
      saved_tab_groups?: Chromium.Options.Preferences.SavedTabGroups;
      segmentation_platform?: Chromium.Options.Preferences.SegmentationPlatform;
      sessions?: Chromium.Options.Preferences.Sessions;
      settings?: Chromium.Options.Preferences.Settings;
      signin?: Chromium.Options.Preferences.Signin;
      spellcheck?: Chromium.Options.Preferences.SpellCheck;
      sync?: Chromium.Options.Preferences.Sync;
      syncing_theme_prefs_migrated_to_non_syncing?: boolean;
      tab_group_saves_ui_update_migrated?: boolean;
      toolbar?: Chromium.Options.Preferences.Toolbar;
      total_passwords_available_for_account?: number;
      total_passwords_available_for_profile?: number;
      translate_site_blacklist?: Array<unknown>;
      translate_site_blocklist_with_time?: Array<unknown>;
      updateclientdata?: Chromium.Options.LocalState.UpdateClientData;
      updateclientlastupdatecheckerror?: number;
      updateclientlastupdatecheckerrorcategory?: number;
      updateclientlastupdatecheckerrorextracode1?: number;
      web_apps?: Chromium.Options.Preferences.WebApps;
      zerosuggest?: Chromium.Options.Preferences.ZeroSuggest;
    }

    export namespace Preferences {
      export interface NewTabPage extends Record<string, unknown> {
        PrevNavigationTime?: string;
      }

      export interface AccessibilityCaptions extends Record<string, unknown> {
        headless_caption_enabled?: boolean;
        live_caption_language?: string;
      }

      export interface Accessibility extends Record<string, unknown> {
        captions?: Chromium.Options.Preferences.AccessibilityCaptions;
      }

      export interface AlternateErrorPages extends Record<string, unknown> {
        backup?: boolean;
      }

      export interface Apps extends Record<string, unknown> {
        shortcuts_arch?: string;
        shortcuts_version?: number;
      }

      export interface Autocomplete extends Record<string, unknown> {
        retention_policy_last_version?: number;
      }

      export interface Autofill extends Record<string, unknown> {
        last_version_deduped?: number;
      }

      export interface Bookmark extends Record<string, unknown> {
        storage_computation_last_update?: number;
      }

      export interface Browser extends Record<string, unknown> {
        has_seen_welcome_page?: boolean;
        window_placement?: Chromium.Options.Preferences.Browser.WindowPlacement;
      }

      export namespace Browser {
        export interface WindowPlacement extends Record<string, unknown> {
          bottom?: number;
          left?: number;
          maximized?: boolean;
          right?: number;
          top?: number;
          work_area_bottom?: number;
          work_area_left?: number;
          work_area_right?: number;
          work_area_top?: number;
        }
      }

      export interface DefaultSearchProvider extends Record<string, unknown> {
        guid?: string;
      }

      export interface DomainDiversity extends Record<string, unknown> {
        last_reporting_timestamp?: string;
      }

      export interface Extensions extends Record<string, unknown> {
        alerts?: Chromium.Options.Preferences.Extensions.Alerts;
        chrome_url_overrides?: Record<string, unknown>;
        commands?: Record<string, Chromium.Options.Preferences.Extensions.Command>;
        install_signature?: Chromium.Options.Preferences.Extensions.InstallSignature;
        last_chrome_version?: string;
        settings?: Record<string, Chromium.Options.Preferences.Extensions.Settings>;
      }

      export namespace Extensions {
        export interface Alerts extends Record<string, unknown> {
          initialized?: boolean;
        }

        export interface Command extends Record<string, unknown> {
          command_name?: string;
          extension?: string;
          global?: boolean;
        }

        export interface InstallSignature extends Record<string, unknown> {
          expire_date?: string;
          ids?: Array<string>;
          invalid_ids?: Array<string>;
          salt?: string;
          signature?: string;
          signature_format_version?: number;
          timestamp?: string;
        }

        export interface Settings extends Record<string, unknown> {
          account_extension_type?: number;
          ack_external?: boolean;
          active_bit?: boolean;
          active_permissions?: Record<string, Array<string>>;
          allowlist?: number;
          app_launcher_ordinal?: unknown;
          commands?: Record<string, Chromium.Options.Preferences.Extensions.Settings.Manifest.Command>;
          content_settings?: Array<Chromium.Options.Preferences.Extensions.Settings.Manifest.ContentSettings>;
          creation_flags?: number;
          'cws-info'?: unknown;
          disable_reasons?: Array<unknown>;
          events?: unknown;
          filtered_service_worker_events?: Record<string, Array<unknown>>;
          first_install_time?: string;
          from_webstore?: boolean;
          granted_permissions?: unknown;
          incognito_content_settings?: Array<unknown>;
          incognito_preferences?: Record<string, unknown>;
          last_update_time?: string;
          lastpingday?: string;
          location?: number;
          manifest?: Chromium.Options.Preferences.Extensions.Settings.Manifest;
          needs_sync?: unknown;
          page_ordinal?: unknown;
          path?: unknown;
          preferences?: unknown;
          regular_only_preferences?: Record<string, unknown>;
          running?: unknown;
          service_worker_registration_info?: unknown;
          serviceworkerevents?: unknown;
          was_installed_by_default?: boolean;
          was_installed_by_oem?: boolean;
        }

        export namespace Settings {
          export interface Manifest extends Record<string, unknown> {
            app?: Chromium.Options.Preferences.Extensions.Settings.Manifest.App;
            background?: Chromium.Options.Preferences.Extensions.Settings.Manifest.Background;
            content_security_policy?: Chromium.Options.Preferences.Extensions.Settings.Manifest.ContentSecurityPolicy;
            current_locale?: string;
            default_locale?: string;
            description?: string;
            externally_connectable?: Chromium.Options.Preferences.Extensions.Settings.Manifest.ExternallyConnectable;
            host_permissions?: Array<string>;
            icons?: Record<number, string>;
            incognito?: string;
            key?: string;
            manifest_version?: number;
            mime_types?: Array<string>;
            mime_types_handler?: string;
            name?: string;
            offline_enabled?: boolean;
            optional_permissions?: Array<string>;
            options_ui?: Chromium.Options.Preferences.Extensions.Settings.Manifest.OptionsUi;
            permissions?: Array<string | Record<string, Array<string>>>;
            tts_engine?: Chromium.Options.Preferences.Extensions.Settings.Manifest.TtsEngine;
            version?: string;
            web_accessible_resources?: Array<Chromium.Options.Preferences.Extensions.Settings.Manifest.WebAccessibleResource>;
          }

          export namespace Manifest {
            export interface App extends Record<string, unknown> {
              launch?: Chromium.Options.Preferences.Extensions.Settings.Manifest.App.Launch;
              urls?: Array<string>;
            }

            export namespace App {
              export interface Launch extends Record<string, unknown> {
                web_url?: string;
              }
            }

            export interface Background extends Record<string, unknown> {
              service_worker?: string;
            }

            export interface Command extends Record<string, unknown> {
              suggested_key?: string | Record<string, string>;
              was_assigned?: boolean;
            }

            export interface ContentSettings extends Record<string, unknown> {
              js?: Array<string>;
              matches?: Array<string>;
              run_at?: string;
            }

            export interface ContentSecurityPolicy extends Record<string, unknown> {
              extension_pages?: string;
            }

            export interface ExternallyConnectable extends Record<string, unknown> {
              matches?: Array<string>;
            }

            export interface OptionsUi extends Record<string, unknown> {
              open_in_tab?: boolean;
              page?: string;
            }

            export interface TtsEngine extends Record<string, unknown> {
              voices?: Array<Chromium.Options.Preferences.Extensions.Settings.Manifest.TtsEngine.Voice>;
            }

            export namespace TtsEngine {
              export interface Voice extends Record<string, unknown> {
                event_types?: Array<string>;
                gender?: string;
                lang?: string;
                remote?: boolean;
                voice_name?: string;
              }
            }

            export interface WebAccessibleResource extends Record<string, unknown> {
              matches?: Array<string>;
              resources?: Array<string>;
            }
          }
        }
      }

      export interface GaiaCookie extends Record<string, unknown> {
        changed_time?: number;
        hash?: string;
        last_list_accounts_binary_data?: string;
        periodic_report_time?: number;
      }

      export interface Gcm extends Record<string, unknown> {
        product_category_for_subtypes?: string;
      }

      export interface Google extends Record<string, unknown> {
        services?: Chromium.Options.Preferences.Google.Services;
      }

      export namespace Google {
        export interface Services extends Record<string, unknown> {
          signin_scoped_device_id?: string;
        }
      }

      export type HistoryClusters = {
        [K in string as `${K}_cache`]?: HistoryClusters.Entry<K>;
      };

      export namespace HistoryClusters {
        export type Entry<K extends string> = {
          [P in `${K}_keywords`]: Record<string, unknown>;
        } & {
          [P in `${K}_timestamp`]: string;
        };
      }

      export interface InProductHelpNewBadge extends Record<string, unknown> {
        feature_enabled_time?: string;
        show_count?: number;
        used_count?: number;
      }

      export interface InProductHelp extends Record<string, unknown> {
        new_badge?: Record<string, Chromium.Options.Preferences.InProductHelpNewBadge>;
        recent_session_enabled_time?: string;
        recent_session_start_times?: Array<string>;
        session_last_active_time?: string;
        session_start_time?: string;
      }

      export interface Intl extends Record<string, unknown> {
        selected_languages?: string;
      }

      export interface Invalidation extends Record<string, unknown> {
        per_sender_topics_to_handler?: Record<string, unknown>;
      }

      export interface MediaEngagement extends Record<string, unknown> {
        schema_version?: number;
      }

      export interface Media extends Record<string, unknown> {
        device_id_salt?: string;
        engagement?: Chromium.Options.Preferences.MediaEngagement;
      }

      export interface MediaRouter extends Record<string, unknown> {
        receiver_id_hash_token?: string;
      }

      export interface Net extends Record<string, unknown> {
        network_prediction_options?: number;
      }

      export interface Ntp extends Record<string, unknown> {
        num_personal_suggestions?: number;
      }

      export interface Omnibox extends Record<string, unknown> {
        shown_count_history_scope_promo?: number;
      }

      export interface OptimizationGuideHintsFetcher extends Record<string, unknown> {
        hosts_successfully_fetched?: Record<string, unknown>;
      }

      export interface OptimizationGuidePredictionModelFetcher extends Record<string, unknown> {
        last_fetch_attempt?: string;
        last_fetch_success?: string;
      }

      export interface OptimizationGuide extends Record<string, unknown> {
        hintsfetcher?: Chromium.Options.Preferences.OptimizationGuideHintsFetcher;
        predictionmodelfetcher?: Chromium.Options.Preferences.OptimizationGuidePredictionModelFetcher;
        previous_optimization_types_with_filter?: Record<string, boolean>;
        previously_registered_optimization_types?: Record<string, boolean>;
        store_file_paths_to_delete?: Record<string, unknown>;
      }

      export interface PasswordManager extends Record<string, unknown> {
        account_store_migrated_to_os_crypt_async?: boolean;
        autofillable_credentials_account_store_login_database?: boolean;
        autofillable_credentials_profile_store_login_database?: boolean;
        profile_store_migrated_to_os_crypt_async?: boolean;
      }

      export interface PrivacySandboxFakeNotice extends Record<string, unknown> {
        prompt_shown_time?: string;
        prompt_shown_time_sync?: string;
      }

      export interface PrivacySandboxM1 extends Record<string, unknown> {
        ad_measurement_enabled?: boolean;
        fledge_enabled?: boolean;
        row_notice_acknowledged?: boolean;
        topics_enabled?: boolean;
      }

      export interface PrivacySandboxNoticeEvent extends Record<string, unknown> {
        event?: number;
        timestamp?: string;
      }

      export interface PrivacySandboxNotice extends Record<string, unknown> {
        chrome_version?: string;
        events?: Array<Chromium.Options.Preferences.PrivacySandboxNoticeEvent>;
        schema_version?: number;
      }

      export interface PrivacySandbox extends Record<string, unknown> {
        fake_notice?: Chromium.Options.Preferences.PrivacySandboxFakeNotice;
        first_party_sets_data_access_allowed_initialized?: boolean;
        m1?: Chromium.Options.Preferences.PrivacySandboxM1;
        notices?: Record<string, Chromium.Options.Preferences.PrivacySandboxNotice>;
      }

      export interface Profile extends Record<string, unknown> {
        avatar_index?: number;
        background_password_check?: Chromium.Options.Preferences.Profile.BackgroundPasswordCheck;
        content_settings?: Chromium.Options.Preferences.Profile.ContentSettings;
        created_by_version?: string;
        creation_time?: string;
        exit_type?: string;
        family_member_role?: string;
        icon_version?: number;
        icon_win11_format?: boolean;
        last_engagement_time?: string;
        last_time_obsolete_http_credentials_removed?: number;
        last_time_password_store_metrics_reported?: number;
        managed?: Chromium.Options.Preferences.Profile.Managed;
        managed_user_id?: string;
        name?: string;
        one_time_permission_prompts_decided_count?: number;
        password_hash_data_list?: Array<unknown>;
        safety_hub_menu_notifications?: Record<string, Chromium.Options.Preferences.Profile.SafetyHubMenuNotification>;
        were_old_google_logins_removed?: boolean;
      }

      export namespace Profile {
        export interface BackgroundPasswordCheck extends Record<string, unknown> {
          check_fri_weight?: number;
          check_interval?: string;
          check_mon_weight?: number;
          check_sat_weight?: number;
          check_sun_weight?: number;
          check_thu_weight?: number;
          check_tue_weight?: number;
          check_wed_weight?: number;
          next_check_time?: string;
        }

        export interface ContentSettings extends Record<string, unknown> {
          exceptions?: Record<string, Record<string, unknown>>;
          permission_actions?: Record<string, Array<Chromium.Options.Preferences.Profile.ContentSettings.PermissionAction>>;
        }

        export namespace ContentSettings {
          export interface PermissionAction extends Record<string, unknown> {
            action?: number;
            prompt_disposition?: number;
            time?: string;
          }
        }

        export interface Managed extends Record<string, unknown> {
          locally_parent_approved_extensions?: Record<string, unknown>;
          locally_parent_approved_extensions_migration_state?: number;
        }

        export interface SafetyHubMenuNotification extends Record<string, unknown> {
          isCurrentlyActive?: boolean;
          result?: Chromium.Options.Preferences.Profile.SafetyHubMenuNotification.Result;
        }

        export namespace SafetyHubMenuNotification {
          export interface Result extends Record<string, unknown> {
            timestamp?: string;
            triggeringExtensions?: Array<unknown>;
          }
        }
      }

      export interface ProtectionBrowser extends Record<string, unknown> {
        show_home_button?: string;
      }

      export interface ProtectionUi extends Record<string, unknown> {
        developer_mode?: string;
      }

      export interface ProtectionAccountValuesExtensions extends Record<string, unknown> {
        ui?: Chromium.Options.Preferences.ProtectionUi;
      }

      export interface ProtectionSession extends Record<string, unknown> {
        restore_on_startup?: string;
        startup_urls?: string;
      }

      export interface ProtectionAccountValues extends Record<string, unknown> {
        browser?: Chromium.Options.Preferences.ProtectionBrowser;
        extensions?: Chromium.Options.Preferences.ProtectionAccountValuesExtensions;
        homepage?: string;
        homepage_is_newtabpage?: string;
        session?: Chromium.Options.Preferences.ProtectionSession;
      }

      export interface ProtectionDefaultSearchProviderData extends Record<string, unknown> {
        template_url_data?: string;
      }

      export interface ProtectionEnterpriseSignin extends Record<string, unknown> {
        policy_recovery_token?: string;
      }

      export interface ProtectionExtensions extends Record<string, unknown> {
        settings?: Record<string, string>;
        ui?: Chromium.Options.Preferences.ProtectionUi;
      }

      export interface ProtectionGoogle extends Record<string, unknown> {
        services?: Record<string, string>;
      }

      export interface ProtectionMedia extends Record<string, unknown> {
        cdm?: Record<string, string>;
        storage_id_salt?: string;
      }

      export interface ProtectionPreferences extends Record<string, unknown> {
        preference_reset_time?: string;
      }

      export interface ProtectionSafeBrowsing extends Record<string, unknown> {
        incidents_sent?: string;
      }

      export interface Protection extends Record<string, unknown> {
        account_values?: Chromium.Options.Preferences.ProtectionAccountValues;
        browser?: Chromium.Options.Preferences.ProtectionBrowser;
        default_search_provider_data?: Chromium.Options.Preferences.ProtectionDefaultSearchProviderData;
        enterprise_signin?: Chromium.Options.Preferences.ProtectionEnterpriseSignin;
        extensions?: Chromium.Options.Preferences.ProtectionExtensions;
        google?: Chromium.Options.Preferences.ProtectionGoogle;
        homepage?: string;
        homepage_is_newtabpage?: string;
        media?: Chromium.Options.Preferences.ProtectionMedia;
        module_blocklist_cache_md5_digest?: string;
        pinned_tabs?: string;
        prefs?: Chromium.Options.Preferences.ProtectionPreferences;
        safebrowsing?: Chromium.Options.Preferences.ProtectionSafeBrowsing;
        search_provider_overrides?: string;
        session?: Chromium.Options.Preferences.ProtectionSession;
      }

      export interface SafeBrowsing extends Record<string, unknown> {
        event_timestamps?: Record<string, string>;
        hash_real_time_ohttp_expiration_time?: string;
        hash_real_time_ohttp_key?: string;
        metrics_last_log_time?: string;
        scout_reporting_enabled_when_deprecated?: boolean;
      }

      export interface SafetyHub extends Record<string, unknown> {
        unused_site_permissions_revocation?: Record<string, boolean>;
      }

      export interface SavedTabGroups extends Record<string, unknown> {
        did_enable_shared_tab_groups_in_last_session?: boolean;
        specifics_to_data_migration?: boolean;
      }

      export interface SegmentationPlatformDeviceSwitcherUtilResult
        extends Record<string, unknown> {
        labels?: Array<string>;
      }

      export interface SegmentationPlatformDeviceSwitcherUtil extends Record<string, unknown> {
        result?: Chromium.Options.Preferences.SegmentationPlatformDeviceSwitcherUtilResult;
      }

      export interface SegmentationPlatform extends Record<string, unknown> {
        client_result_prefs?: string;
        device_switcher_util?: Chromium.Options.Preferences.SegmentationPlatformDeviceSwitcherUtil;
        last_db_compaction_time?: string;
        uma_in_sql_start_time?: string;
      }

      export interface SessionsEvent extends Record<string, unknown> {
        crashed?: boolean;
        did_schedule_command?: boolean;
        errored_reading?: boolean;
        first_session_service?: boolean;
        restore_browser?: boolean;
        synchronous?: boolean;
        tab_count?: number;
        time?: string;
        type?: number;
        window_count?: number;
      }

      export interface Sessions extends Record<string, unknown> {
        event_log?: Array<Chromium.Options.Preferences.SessionsEvent>;
        session_data_status?: number;
      }

      export interface Settings extends Record<string, unknown> {
        force_google_safesearch?: boolean;
      }

      export interface Signin extends Record<string, unknown> {
        allowed?: boolean;
        cookie_clear_on_exit_migration_notice_complete?: boolean;
      }

      export interface SpellCheck extends Record<string, unknown> {
        dictionaries?: Array<string>;
        dictionary?: string;
      }

      export interface Sync extends Record<string, unknown> {
        data_type_status_for_sync_to_signin?: Record<string, boolean>;
        encryption_bootstrap_token_per_account_migration_done?: boolean;
        feature_status_for_sync_to_signin?: number;
        passwords_per_account_pref_migration_done?: boolean;
      }

      export interface Toolbar extends Record<string, unknown> {
        pinned_cast_migration_complete?: boolean;
        pinned_chrome_labs_migration_complete?: boolean;
        tab_search_migration_complete?: boolean;
      }

      export interface WebApps extends Record<string, unknown> {
        did_migrate_default_chrome_apps?: Array<string>;
        last_preinstall_synchronize_version?: string;
        migrated_default_apps?: Array<string>;
      }

      export interface ZeroSuggest extends Record<string, unknown> {
        cachedresults?: string;
      }
    }
  }

  export type PermissionState = SuggestedString<PermissionState._>;
  export namespace PermissionState {
    export type _ = Denied | Granted | Prompt;
    export type Denied = 'denied';
    export type Granted = 'granted';
    export type Prompt = 'prompt';
  }

  /**
   * Creates {@link selenium-webdriver/remote.DriverService} instances that manage
   * a WebDriver server in a child process.
   */
  export class ServiceBuilder extends remote.DriverService.Builder {
    /**
     * @param exe Path to the server executable to use. Subclasses should ensure a valid
     *     path to the appropriate exe is provided.
     */
    constructor(exe: string);

    /**
     * Sets which port adb is listening to. _The driver will connect to adb
     * if an {@linkplain Options#androidPackage Android session} is requested, but
     * adb **must** be started beforehand._
     *
     * @param port Which port adb is running on.
     * @return A self reference.
     */
    setAdbPort(port: number): this;

    /**
     * Sets the path of the log file the driver should log to. If a log file is
     * not specified, the driver will log to stderr.
     * @param path Path of the log file to use.
     * @return A self reference.
     */
    loggingTo(path: string): this;

    /**
     * Enables Chrome logging.
     * @returns A self reference.
     */
    enableChromeLogging(): this;

    /**
     * Enables verbose logging.
     * @return A self reference.
     */
    enableVerboseLogging(): this;

    /**
     * Sets the number of threads the driver should use to manage HTTP requests.
     * By default, the driver will use 4 threads.
     * @param n The number of threads to use.
     * @return A self reference.
     */
    setNumHttpThreads(n: number): this;

    setPath(path: string): this;
  }

  export namespace Vendor {
    export type CapabilityKey = SuggestedString<CapabilityKey.Google | CapabilityKey.Microsoft>;
    export namespace CapabilityKey {
      export type Google = 'goog:chromeOptions';
      export type Microsoft = 'ms:edgeOptions';
    }

    export type Prefix = SuggestedString<Prefix.Google | Prefix.Microsoft>;
    export namespace Prefix {
      export type Google = 'goog';
      export type Microsoft = 'ms';
    }
  }
}

/**
 * The instance type historically exported for Chromium drivers.
 * @deprecated Use {@link Driver}. The runtime exports only `Driver`.
 */
export type ChromiumWebDriver = Chromium.Driver;
export import Driver = Chromium.Driver;
export import INetworkConditionsSpec = Chromium.NetworkConditions;
export import Options = Chromium.Options;
export import PermissionState = Chromium.PermissionState;
export import ServiceBuilder = Chromium.ServiceBuilder;
