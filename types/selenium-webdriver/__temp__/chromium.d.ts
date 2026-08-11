import type { MapOf, SuggestedString } from './_internal.js';
import type { Executor } from './http/index.js';
import type { Capabilities, Capability } from './lib/capabilities.js';
import * as Symbols from './lib/symbols.js';
import type { IDimensions, IWebDriver, WebDriver } from './lib/webdriver.js';
import type { DriverService } from './remote/index.js';

export { };

type ChromiumCommandGetCastSinks = 'getCastSinks';
type ChromiumCommandSetCastSinkToUse = 'setCastSinkToUse';
type ChromiumCommandStartDesktopMirroring = 'startDesktopMirroring';
type ChromiumCommandStartCastTabMirroring = 'setCastTabMirroring';
type ChromiumCommandGetCastIssueMessage = 'getCastIssueMessage';
type ChromiumCommandStopCasting = 'stopCasting';
type ChromiumCommandSendDevToolsCommand = 'sendDevToolsCommand';
type ChromiumCommandSendAndGetDevToolsCommand = 'sendAndGetDevToolsCommand';
type ChromiumCommandSetPermission = 'setPermission';
type ChromiumCommandGetNetworkConditions = 'getNetworkConditions';
type ChromiumCommandSetNetworkConditions = 'setNetworkConditions';
type ChromiumCommandDeleteNetworkConditions = 'deleteNetworkConditions';
type ChromiumCommandLaunchApp = 'launchApp';
export type Command = SuggestedString<
    | ChromiumCommandGetCastSinks
    | ChromiumCommandSetCastSinkToUse
    | ChromiumCommandStartDesktopMirroring
    | ChromiumCommandStartCastTabMirroring
    | ChromiumCommandGetCastIssueMessage
    | ChromiumCommandStopCasting
    | ChromiumCommandSendDevToolsCommand
    | ChromiumCommandSendAndGetDevToolsCommand
    | ChromiumCommandSetPermission
    | ChromiumCommandGetNetworkConditions
    | ChromiumCommandSetNetworkConditions
    | ChromiumCommandDeleteNetworkConditions
    | ChromiumCommandLaunchApp
>;
interface IChromiumCommand {
    LAUNCH_APP: ChromiumCommandLaunchApp;
    GET_NETWORK_CONDITIONS: ChromiumCommandGetNetworkConditions;
    SET_NETWORK_CONDITIONS: ChromiumCommandSetNetworkConditions;
    DELETE_NETWORK_CONDITIONS: ChromiumCommandDeleteNetworkConditions;
    SEND_DEVTOOLS_COMMAND: ChromiumCommandSendDevToolsCommand;
    SEND_AND_GET_DEVTOOLS_COMMAND: ChromiumCommandSendAndGetDevToolsCommand;
    SET_PERMISSION: ChromiumCommandSetPermission;
    GET_CAST_SINKS: ChromiumCommandGetCastSinks;
    SET_CAST_SINK_TO_USE: ChromiumCommandSetCastSinkToUse;
    START_CAST_DESKTOP_MIRRORING: ChromiumCommandStartDesktopMirroring;
    START_CAST_TAB_MIRRORING: ChromiumCommandStartCastTabMirroring;
    GET_CAST_ISSUE_MESSAGE: ChromiumCommandGetCastIssueMessage;
    STOP_CASTING: ChromiumCommandStopCasting;
}

type PermissionStateGranted = 'granted';
type PermissionStateDenied = 'denied';
type PermissionStatePrompt = 'prompt';
export type PermissionState = SuggestedString<PermissionStateDenied | PermissionStateGranted | PermissionStatePrompt>;

declare function createExecutor(url: Promise<string>, vendorPrefix: string): Executor;

declare function configureExecutor(executor: Executor, vendorPrefix: string): void;

/**
 * Creates {@link selenium-webdriver/remote.DriverService} instances that manage
 * a WebDriver server in a child process.
 */
export class ServiceBuilder extends DriverService.Builder {
    constructor(exe: string);

    setAdbPort(port: number): this;

    loggingTo(path: string): this;

    enableChromeLogging(): this;

    enableVerboseLogging(): this;

    setNumHttpThreads(n: number): this;

    setPath(path: string): this;
}

export interface IChromiumLocalStateAccessibilityCaptions extends Record<string, unknown> {
    soda_registered_language_packs: Array<string>;
}

export interface IChromiumLocalStateAccessibility extends Record<string, unknown> {
    captions: IChromiumLocalStateAccessibilityCaptions;
}

export interface IChromiumLocalStateAutofill extends Record<string, unknown> {
    ablation_seed: string;
}

export interface IChromiumLocalStateBreadcrumbs extends Record<string, unknown> {
    enabled: boolean;
    enabled_time: string;
}

export interface IChromiumLocalStateBrowserWhatsNew extends Record<string, unknown> {
    enabled_order: Array<string>;
}

export interface IChromiumLocalStateBrowser extends Record<string, unknown> {
    first_run_finished: boolean;
    last_whats_new_version: number;
    shortcut_migration_version: string;
    whats_new: IChromiumLocalStateBrowserWhatsNew;
}

export interface IChromiumLocalStateCbcm extends Record<string, unknown> {
    service_account_email: string;
    service_account_refresh_token: string;
}

export interface IChromiumLocalStateEnterpriseReporting extends Record<string, unknown> {
    last_upload_succeeded_timestamp: string;
    last_upload_timestamp: string;
    last_upload_version: string;
}

export interface IChromiumLocalStateGcm extends Record<string, unknown> {
    product_category_for_subtypes: string;
}

export interface IChromiumLocalStateLegacyProfileName extends Record<string, unknown> {
    migrated?: boolean;
}

export interface IChromiumLocalStateLegacyProfile extends Record<string, unknown> {
    name?: IChromiumLocalStateLegacyProfileName;
}

export interface IChromiumLocalStateLegacy extends Record<string, unknown> {
    profile?: IChromiumLocalStateLegacyProfile;
}

export interface IChromiumLocalStateLocal extends Record<string, unknown> {
    password_hash_data_list?: Array<string>;
}

export interface IChromiumLocalStateManagementPlatform extends Record<string, unknown> {
    azure_active_directory?: number;
    enterprise_mdm_win?: number;
}

export interface IChromiumLocalStateManagement extends Record<string, unknown> {
    platform?: IChromiumLocalStateManagementPlatform;
}

export interface IChromiumLocalStateNetworkTimeMapping extends Record<string, unknown> {
    local?: number;
    network?: number;
    ticks?: number;
    uncertainty?: number;
}

export interface IChromiumLocalStateNetworkTime extends Record<string, unknown> {
    network_time_mapping?: IChromiumLocalStateNetworkTimeMapping;
}

export interface IChromiumLocalStateOptimizationGuideModelExecution extends Record<string, unknown> {
    last_usage_by_feature?: Record<string, unknown>;
}

export interface IChromiumLocalStateOptimizationGuideModelStoreMetadata extends Record<string, unknown> {
    et?: string;
    kbvd?: boolean;
    mbd?: string;
    v?: string;
}

export interface IChromiumLocalStateOptimizationGuideOnDevice extends Record<string, unknown> {
    last_version?: string;
    model_crash_count?: number;
    performance_class?: number;
    performance_class_version?: string;
}

export interface IChromiumLocalStateOptimizationGuide extends Record<string, unknown> {
    model_cache_key_mapping?: Record<string, string>;
    model_execution?: IChromiumLocalStateOptimizationGuideModelExecution;
    model_store_metadata?: Record<string, Record<string, IChromiumLocalStateOptimizationGuideModelStoreMetadata>>;
    on_device?: IChromiumLocalStateOptimizationGuideOnDevice;
}

export interface IChromiumLocalStateOsCrypt extends Record<string, unknown> {
    app_bound_encrypted_key?: string;
    audit_enabled?: boolean;
    encrypted_key?: string;
}

export interface IChromiumLocalStatePerformanceIntervention extends Record<string, unknown> {
    last_daily_sample?: string;
}

export interface IChromiumLocalStatePolicy extends Record<string, unknown> {
    last_statistics_update?: string;
}

export interface IChromiumLocalStatePrivacyBudget extends Record<string, unknown> {
    meta_experiment_activation_salt: number;
}

export interface IChromiumLocalStateProfileInfoCache extends Record<string, unknown> {
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

export interface IChromiumLocalStateProfileMetrics extends Record<string, unknown> {
    next_bucket_index: number;
}

export interface IChromiumLocalStateProfile extends Record<string, unknown> {
    info_cache?: Record<string, IChromiumLocalStateProfileInfoCache>;
    last_active_profiles?: Array<unknown>;
    metrics?: IChromiumLocalStateProfileMetrics;
    profile_counts_reported?: string;
    profiles_order?: Array<string>;
}

export interface IChromiumLocalStateProfileNetworkContextService extends Record<string, unknown> {
    http_cache_finch_experiment_groups: string;
}

export interface IChromiumLocalStateSignin extends Record<string, unknown> {
    active_accounts_last_emitted: string;
}

export interface IChromiumLocalStateUninstallMetrics extends Record<string, unknown> {
    installation_date2?: string;
}

export interface IChromiumUpdateClientDataApp extends Record<string, unknown> {
    cohort?: string;
    cohortname?: string;
    dlrc?: number;
    fp?: string;
    installdate?: number;
    max_pv?: string;
    pf?: string;
}

export interface IChromiumLocalStateSubResourceFilterRulesetVersion extends Record<string, unknown> {
    checksum?: number;
    content?: string;
    format?: number;
}

export interface IChromiumLocalStateSubResourceFilter extends Record<string, unknown> {
    ruleset_version: IChromiumLocalStateSubResourceFilterRulesetVersion;
}

export interface IChromiumLocalStateTabStats extends Record<string, unknown> {
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

export interface IChromiumLocalStateUkm extends Record<string, unknown> {
    persisted_logs?: Array<unknown>;
}

export interface IChromiumLocalStateUpdateClientData extends Record<string, unknown> {
    apps?: Record<string, IChromiumUpdateClientDataApp>;
}

export interface IChromiumLocalStateUserExperienceMetricsStability extends Record<string, unknown> {
    browser_last_live_timestamp?: string;
    exited_cleanly?: boolean;
    stats_buildtime?: string;
    stats_version?: string;
    system_crash_count?: number;
}

export interface IChromiumLocalStateUserExperienceMetrics extends Record<string, unknown> {
    default_opt_in?: number;
    limited_entropy_randomization_source?: string;
    low_entropy_source3?: number;
    machine_id?: number;
    pseudo_low_entropy_source?: number;
    session_id?: number;
    stability?: IChromiumLocalStateUserExperienceMetricsStability;
}

export interface IChromiumLocalStateWas extends Record<string, unknown> {
    restarted: boolean;
}

export interface IChromiumLocalState extends Record<string, unknown> {
    accessibility?: IChromiumLocalStateAccessibility;
    autofill?: IChromiumLocalStateAutofill;
    breadcrumbs?: IChromiumLocalStateBreadcrumbs;
    browser?: IChromiumLocalStateBrowser;
    cbcm?: IChromiumLocalStateCbcm;
    enterprise_reporting?: IChromiumLocalStateEnterpriseReporting;
    gcm?: IChromiumLocalStateGcm;
    hardware_acceleration_mode_previous?: boolean;
    legacy?: IChromiumLocalStateLegacy;
    local?: IChromiumLocalStateLocal;
    management?: IChromiumLocalStateManagement;
    network_time?: IChromiumLocalStateNetworkTime;
    optimization_guide?: IChromiumLocalStateOptimizationGuide;
    os_crypt?: IChromiumLocalStateOsCrypt;
    os_update_handler_enabled?: boolean;
    performance_intervention?: IChromiumLocalStatePerformanceIntervention;
    policy?: IChromiumLocalStatePolicy;
    privacy_budget?: IChromiumLocalStatePrivacyBudget;
    profile?: IChromiumLocalStateProfile;
    profile_network_context_service?: IChromiumLocalStateProfileNetworkContextService;
    session_id_generator_last_value?: string;
    signin?: IChromiumLocalStateSignin;
    subresource_filter?: IChromiumLocalStateSubResourceFilter;
    tab_stats?: IChromiumLocalStateTabStats;
    ukm?: IChromiumLocalStateUkm;
    uninstall_metrics?: IChromiumLocalStateUninstallMetrics;
    updateclientdata?: IChromiumLocalStateUpdateClientData;
    user_experience_metrics?: IChromiumLocalStateUserExperienceMetrics;
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
    was?: IChromiumLocalStateWas;
}

export interface IChromiumOptionsPerformanceLoggingPreferences extends Record<string, unknown> {
    bufferUsageReportingInterval?: number;
    enableNetwork?: boolean;
    enablePage?: boolean;
    enableTimeline?: boolean;
    traceCategories?: string;
}

export interface IChromiumOptionsPreferencesNewTabPage extends Record<string, unknown> {
    PrevNavigationTime?: string;
}

export interface IChromiumOptionsPreferencesAccessibilityCaptions extends Record<string, unknown> {
    headless_caption_enabled?: boolean;
    live_caption_language?: string;
}

export interface IChromiumOptionsPreferencesAccessibility extends Record<string, unknown> {
    captions?: IChromiumOptionsPreferencesAccessibilityCaptions;
}

export interface IChromiumOptionsPreferencesAlternateErrorPages extends Record<string, unknown> {
    backup?: boolean;
}

export interface IChromiumOptionsPreferencesApps extends Record<string, unknown> {
    shortcuts_arch?: string;
    shortcuts_version?: number;
}

export interface IChromiumOptionsPreferencesAutocomplete extends Record<string, unknown> {
    retention_policy_last_version?: number;
}

export interface IChromiumOptionsPreferencesAutofill extends Record<string, unknown> {
    last_version_deduped?: number;
}

export interface IChromiumOptionsPreferncesBookmark extends Record<string, unknown> {
    storage_computation_last_update?: number;
}

export interface IChromiumOptionsPreferencesBrowserWindowPlacement extends Record<string, unknown> {
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

export interface IChromiumOptionsPreferencesBrowser extends Record<string, unknown> {
    has_seen_welcome_page?: boolean;
    window_placement?: IChromiumOptionsPreferencesBrowserWindowPlacement;
}

export interface IChromiumOptionsPreferencesDefaultSearchProvider extends Record<string, unknown> {
    guid?: string;
}

export interface IChromiumOptionsPreferencesDomainDiversity extends Record<string, unknown> {
    last_reporting_timestamp?: string;
}

export interface IChromiumOptionsPreferencesExtensionsSettingsManifestAppLaunch extends Record<string, unknown> {
    web_url?: string;
}

export interface IChromiumOptionsPreferencesExtensionsSettingsManifestApp extends Record<string, unknown> {
    launch?: IChromiumOptionsPreferencesExtensionsSettingsManifestAppLaunch;
    urls?: Array<string>;
}

export interface IChromiumOptionsPreferencesExtensionsSettingsManifestBackground extends Record<string, unknown> {
    service_worker?: string;
}

export interface IChromiumOptionsPreferencesExtensionsSettingsManifestCommand extends Record<string, unknown> {
    suggested_key?: string | Record<string, string>;
    was_assigned?: boolean;
}

export interface IChromiumOptionsPreferencesExtensionsSettingsManifestContentSettings extends Record<string, unknown> {
    js?: Array<string>;
    matches?: Array<string>;
    run_at?: string;
}

export interface IChromiumOptionsPreferencesExtensionsSettingsManifestContentSettingsContentSecurityPolicy
    extends Record<string, unknown> {
    extension_pages?: string;
}

export interface IChromiumOptionsPreferencesExtensionsSettingsManifestExternallyConnectable
    extends Record<string, unknown> {
    matches?: Array<string>;
}

export interface IChromiumOptionsPreferencesExtensionsSettingsManifestOptionsUi extends Record<string, unknown> {
    open_in_tab?: boolean;
    page?: string;
}

export interface IChromiumOptionsPreferencesExtensionsSettingsManifestTtsEngineVoice extends Record<string, unknown> {
    event_types?: Array<string>;
    gender?: string;
    lang?: string;
    remote?: boolean;
    voice_name?: string;
}

export interface IChromiumOptionsPreferencesExtensionsSettingsManifestTtsEngine extends Record<string, unknown> {
    voices?: Array<IChromiumOptionsPreferencesExtensionsSettingsManifestTtsEngineVoice>;
}

export interface IChromiumOptionsPreferencesExtensionsSettingsManifestWebAccessibleResource
    extends Record<string, unknown> {
    matches?: Array<string>;
    resources?: Array<string>;
}

export interface IChromiumOptionsPreferencesExtensionsSettingsManifest extends Record<string, unknown> {
    app?: IChromiumOptionsPreferencesExtensionsSettingsManifestApp;
    background?: IChromiumOptionsPreferencesExtensionsSettingsManifestBackground;
    content_security_policy?: IChromiumOptionsPreferencesExtensionsSettingsManifestContentSettingsContentSecurityPolicy;
    current_locale?: string;
    default_locale?: string;
    description?: string;
    externally_connectable?: IChromiumOptionsPreferencesExtensionsSettingsManifestExternallyConnectable;
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
    options_ui?: IChromiumOptionsPreferencesExtensionsSettingsManifestOptionsUi;
    permissions?: Array<string | Record<string, Array<string>>>;
    tts_engine?: IChromiumOptionsPreferencesExtensionsSettingsManifestTtsEngine;
    version?: string;
    web_accessible_resources?: Array<IChromiumOptionsPreferencesExtensionsSettingsManifestWebAccessibleResource>;
}

export interface IChromiumOptionsPreferencesExtensionsAlerts extends Record<string, unknown> {
    initialized?: boolean;
}

export interface IChromiumOptionsPreferencesExtensionsCommand extends Record<string, unknown> {
    command_name?: string;
    extension?: string;
    global?: boolean;
}

export interface IChromiumOptionsPreferencesExtensionsInstallSignature extends Record<string, unknown> {
    expire_date?: string;
    ids?: Array<string>;
    invalid_ids?: Array<string>;
    salt?: string;
    signature?: string;
    signature_format_version?: number;
    timestamp?: string;
}

export interface IChromiumOptionsPreferencesExtensionsSettings extends Record<string, unknown> {
    account_extension_type?: number;
    ack_external?: boolean;
    active_bit?: boolean;
    active_permissions?: Record<string, Array<string>>;
    allowlist?: number;
    app_launcher_ordinal?: unknown;
    commands?: Record<string, IChromiumOptionsPreferencesExtensionsSettingsManifestCommand>;
    content_settings?: Array<IChromiumOptionsPreferencesExtensionsSettingsManifestContentSettings>;
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
    manifest?: IChromiumOptionsPreferencesExtensionsSettingsManifest;
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

export interface IChromiumOptionsPreferencesExtensions extends Record<string, unknown> {
    alerts?: IChromiumOptionsPreferencesExtensionsAlerts;
    chrome_url_overrides?: Record<string, unknown>;
    commands?: Record<string, IChromiumOptionsPreferencesExtensionsCommand>;
    install_signature?: IChromiumOptionsPreferencesExtensionsInstallSignature;
    last_chrome_version?: string;
    settings?: Record<string, IChromiumOptionsPreferencesExtensionsSettings>;
}

export interface IChromiumOptionsPreferencesGaiaCookie extends Record<string, unknown> {
    changed_time?: number;
    hash?: string;
    last_list_accounts_binary_data?: string;
    periodic_report_time?: number;
}

export interface IChromiumOptionsPreferencesGcm extends Record<string, unknown> {
    product_category_for_subtypes?: string;
}

export interface IChromiumOptionsPreferencesGoogleServices extends Record<string, unknown> {
    signin_scoped_device_id?: string;
}

export interface IChromiumOptionsPreferencesGoogle extends Record<string, unknown> {
    services?: IChromiumOptionsPreferencesGoogleServices;
}

export interface IChromiumOptionsPreferencesHistoryCluster extends Record<string, unknown> {
    keywords?: Record<string, unknown>;
    timestamp?: string;
}

export type ChromiumOptionsPreferencesHistoryCluster<T extends string> = {
    [K in keyof IChromiumOptionsPreferencesHistoryCluster as `${T}${K & string}`]:
    IChromiumOptionsPreferencesHistoryCluster[K];
};

export type ChromiumOptionsPreferencesHistoryClusterRecord<T> = {
    [K in string & keyof T as `${K}_cache`]: ChromiumOptionsPreferencesHistoryCluster<K>;
};

export interface IChromiumOptionsPreferencesInProductHelpNewBadge extends Record<string, unknown> {
    feature_enabled_time?: string;
    show_count?: number;
    used_count?: number;
}

export interface IChromiumOptionsPreferencesInProductHelp extends Record<string, unknown> {
    new_badge?: Record<string, IChromiumOptionsPreferencesInProductHelpNewBadge>;
    recent_session_enabled_time?: string;
    recent_session_start_times?: Array<string>;
    session_last_active_time?: string;
    session_start_time?: string;
}

export interface IChromiumOptionsPreferencesIntl extends Record<string, unknown> {
    selected_languages?: string;
}

export interface IChromiumOptionsPreferencesInvalidation extends Record<string, unknown> {
    per_sender_topics_to_handler?: Record<string, unknown>;
}

export interface IChromiumOptionsPreferencesMediaEngagement extends Record<string, unknown> {
    schema_version?: number;
}

export interface IChromiumOptionsPreferencesMedia extends Record<string, unknown> {
    device_id_salt?: string;
    engagement?: IChromiumOptionsPreferencesMediaEngagement;
}

export interface IChromiumOptionsPreferencesMediaRouter extends Record<string, unknown> {
    receiver_id_hash_token?: string;
}

export interface IChromiumOptionsPreferencesNet extends Record<string, unknown> {
    network_prediction_options?: number;
}

export interface IChromiumOptionsPreferencesNtp extends Record<string, unknown> {
    num_personal_suggestions?: number;
}

export interface IChromiumOptionsPreferencesOmnibox extends Record<string, unknown> {
    shown_count_history_scope_promo?: number;
}

export interface IChromiumOptionsPreferencesOptimizationGuideHintsFetcher extends Record<string, unknown> {
    hosts_successfully_fetched?: Record<string, unknown>;
}

export interface IChromiumOptionsPreferencesOptimizationGuidePredictionModelFetcher extends Record<string, unknown> {
    last_fetch_attempt?: string;
    last_fetch_success?: string;
}

export interface IChromiumOptionsPreferencesOptimizationGuide extends Record<string, unknown> {
    hintsfetcher?: IChromiumOptionsPreferencesOptimizationGuideHintsFetcher;
    predictionmodelfetcher?: IChromiumOptionsPreferencesOptimizationGuidePredictionModelFetcher;
    previous_optimization_types_with_filter?: Record<string, boolean>;
    previously_registered_optimization_types?: Record<string, boolean>;
    store_file_paths_to_delete?: Record<string, unknown>;
}

export interface IChromiumOptionsPreferencesPasswordManager extends Record<string, unknown> {
    account_store_migrated_to_os_crypt_async?: boolean;
    autofillable_credentials_account_store_login_database?: boolean;
    autofillable_credentials_profile_store_login_database?: boolean;
    profile_store_migrated_to_os_crypt_async?: boolean;
}

export interface IChromiumOptionsPreferencesPrivacySandboxFakeNotice extends Record<string, unknown> {
    prompt_shown_time?: string;
    prompt_shown_time_sync?: string;
}

export interface IChromiumOptionsPreferencesPrivacySandboxM1 extends Record<string, unknown> {
    ad_measurement_enabled?: boolean;
    fledge_enabled?: boolean;
    row_notice_acknowledged?: boolean;
    topics_enabled?: boolean;
}

export interface IChromiumOptionsPreferencesPrivacySandboxNoticeEvent extends Record<string, unknown> {
    event?: number;
    timestamp?: string;
}

export interface IChromiumOptionsPreferencesPrivacySandboxNotice extends Record<string, unknown> {
    chrome_version?: string;
    events?: Array<IChromiumOptionsPreferencesPrivacySandboxNoticeEvent>;
    schema_version?: number;
}

export interface IChromiumOptionsPreferencesPrivacySandbox extends Record<string, unknown> {
    fake_notice?: IChromiumOptionsPreferencesPrivacySandboxFakeNotice;
    first_party_sets_data_access_allowed_initialized?: boolean;
    m1?: IChromiumOptionsPreferencesPrivacySandboxM1;
    notices?: Record<string, IChromiumOptionsPreferencesPrivacySandboxNotice>;
}

export interface IChromiumOptionsPreferencesProfileBackgroundPasswordCheck extends Record<string, unknown> {
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

export interface IChromiumOptionsPreferencesProfileContentSettingsPermissionAction extends Record<string, unknown> {
    action?: number;
    prompt_disposition?: number;
    time?: string;
}

export interface IChromiumOptionsPreferencesProfileContentSettings extends Record<string, unknown> {
    exceptions?: Record<string, Record<string, unknown>>;
    permission_actions?: Record<string, Array<IChromiumOptionsPreferencesProfileContentSettingsPermissionAction>>;
}

export interface IChromiumOptionsPreferencesProfileManaged extends Record<string, unknown> {
    locally_parent_approved_extensions?: Record<string, unknown>;
    locally_parent_approved_extensions_migration_state?: number;
}

export interface IChromiumOptionsPreferencesProfileSafetyHubMenuNotificationResult extends Record<string, unknown> {
    timestamp?: string;
    triggeringExtensions?: Array<unknown>;
}

export interface IChromiumOptionsPreferencesProfileSafetyHubMenuNotification extends Record<string, unknown> {
    isCurrentlyActive?: boolean;
    result?: IChromiumOptionsPreferencesProfileSafetyHubMenuNotificationResult;
}

export interface IChromiumOptionsPreferencesProfile extends Record<string, unknown> {
    avatar_index?: number;
    background_password_check?: IChromiumOptionsPreferencesProfileBackgroundPasswordCheck;
    content_settings?: IChromiumOptionsPreferencesProfileContentSettings;
    created_by_version?: string;
    creation_time?: string;
    exit_type?: string;
    family_member_role?: string;
    icon_version?: number;
    icon_win11_format?: boolean;
    last_engagement_time?: string;
    last_time_obsolete_http_credentials_removed?: number;
    last_time_password_store_metrics_reported?: number;
    managed?: IChromiumOptionsPreferencesProfileManaged;
    managed_user_id?: string;
    name?: string;
    one_time_permission_prompts_decided_count?: number;
    password_hash_data_list?: Array<unknown>;
    safety_hub_menu_notifications?: Record<string, IChromiumOptionsPreferencesProfileSafetyHubMenuNotification>;
    were_old_google_logins_removed?: boolean;
}

export interface IChromiumOptionsPreferencesProtectionBrowser extends Record<string, unknown> {
    show_home_button?: string;
}

export interface IChromiumOptionsPreferencesProtectionUi extends Record<string, unknown> {
    developer_mode?: string;
}

export interface IChromiumOptionsPreferencesProtectionAccountValuesExtensions extends Record<string, unknown> {
    ui?: IChromiumOptionsPreferencesProtectionUi;
}

export interface IChromiumOptionsPreferencesProtectionSession extends Record<string, unknown> {
    restore_on_startup?: string;
    startup_urls?: string;
}

export interface IChromiumOptionsPreferencesProtectionAccountValues extends Record<string, unknown> {
    browser?: IChromiumOptionsPreferencesProtectionBrowser;
    extensions?: IChromiumOptionsPreferencesProtectionAccountValuesExtensions;
    homepage?: string;
    homepage_is_newtabpage?: string;
    session?: IChromiumOptionsPreferencesProtectionSession;
}

export interface IChromiumOptionsPreferencesProtectionDefaultSearchProviderData extends Record<string, unknown> {
    template_url_data?: string;
}

export interface IChromiumOptionsPreferencesProtectionEnterpriseSignin extends Record<string, unknown> {
    policy_recovery_token?: string;
}

export interface IChromiumOptionsPreferencesProtectionExtensions extends Record<string, unknown> {
    settings?: Record<string, string>;
    ui?: IChromiumOptionsPreferencesProtectionUi;
}

export interface IChromiumOptionsPreferencesProtectionGoogle extends Record<string, unknown> {
    services?: Record<string, string>;
}

export interface IChromiumOptionsPreferencesProtectionMedia extends Record<string, unknown> {
    cdm?: Record<string, string>;
    storage_id_salt?: string;
}

export interface IChromiumOptionsPreferencesProtectionPreferences extends Record<string, unknown> {
    preference_reset_time?: string;
}

export interface IChromiumOptionsPreferencesProtectionSafeBrowsing extends Record<string, unknown> {
    incidents_sent?: string;
}

export interface IChromiumOptionsPreferencesProtection extends Record<string, unknown> {
    account_values?: IChromiumOptionsPreferencesProtectionAccountValues;
    browser?: IChromiumOptionsPreferencesProtectionBrowser;
    default_search_provider_data?: IChromiumOptionsPreferencesProtectionDefaultSearchProviderData;
    enterprise_signin?: IChromiumOptionsPreferencesProtectionEnterpriseSignin;
    extensions?: IChromiumOptionsPreferencesProtectionExtensions;
    google?: IChromiumOptionsPreferencesProtectionGoogle;
    homepage?: string;
    homepage_is_newtabpage?: string;
    media?: IChromiumOptionsPreferencesProtectionMedia;
    module_blocklist_cache_md5_digest?: string;
    pinned_tabs?: string;
    prefs?: IChromiumOptionsPreferencesProtectionPreferences;
    safebrowsing?: IChromiumOptionsPreferencesProtectionSafeBrowsing;
    search_provider_overrides?: string;
    session?: IChromiumOptionsPreferencesProtectionSession;
}

export interface IChromiumOptionsPreferencesSafeBrowsing extends Record<string, unknown> {
    event_timestamps?: Record<string, string>;
    hash_real_time_ohttp_expiration_time?: string;
    hash_real_time_ohttp_key?: string;
    metrics_last_log_time?: string;
    scout_reporting_enabled_when_deprecated?: boolean;
}

export interface IChromiumOptionsPreferencesSafetyHub extends Record<string, unknown> {
    unused_site_permissions_revocation?: Record<string, boolean>;
}

export interface IChromiumOptionsPreferencesSavedTabGroups extends Record<string, unknown> {
    did_enable_shared_tab_groups_in_last_session?: boolean;
    specifics_to_data_migration?: boolean;
}

export interface IChromiumOptionsPreferencesSegmentationPlatformDeviceSwitcherUtilResult
    extends Record<string, unknown> {
    labels?: Array<string>;
}

export interface IChromiumOptionsPreferencesSegmentationPlatformDeviceSwitcherUtil extends Record<string, unknown> {
    result?: IChromiumOptionsPreferencesSegmentationPlatformDeviceSwitcherUtilResult;
}

export interface IChromiumOptionsPreferencesSegmentationPlatform extends Record<string, unknown> {
    client_result_prefs?: string;
    device_switcher_util?: IChromiumOptionsPreferencesSegmentationPlatformDeviceSwitcherUtil;
    last_db_compaction_time?: string;
    uma_in_sql_start_time?: string;
}

export interface IChromiumOptionsPreferencesSessionsEvent extends Record<string, unknown> {
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

export interface IChromiumOptionsPreferencesSessions extends Record<string, unknown> {
    event_log?: Array<IChromiumOptionsPreferencesSessionsEvent>;
    session_data_status?: number;
}

export interface IChromiumOptionsPreferencesSettings extends Record<string, unknown> {
    force_google_safesearch?: boolean;
}

export interface IChromiumOptionsPreferencesSignin extends Record<string, unknown> {
    allowed?: boolean;
    cookie_clear_on_exit_migration_notice_complete?: boolean;
}

export interface IChromiumOptionsPreferencesSpellCheck extends Record<string, unknown> {
    dictionaries?: Array<string>;
    dictionary?: string;
}

export interface IChromiumOptionsPreferencesSync extends Record<string, unknown> {
    data_type_status_for_sync_to_signin?: Record<string, boolean>;
    encryption_bootstrap_token_per_account_migration_done?: boolean;
    feature_status_for_sync_to_signin?: number;
    passwords_per_account_pref_migration_done?: boolean;
}

export interface IChromiumOptionsPreferencesToolbar extends Record<string, unknown> {
    pinned_cast_migration_complete?: boolean;
    pinned_chrome_labs_migration_complete?: boolean;
    tab_search_migration_complete?: boolean;
}

export interface IChromiumOptionsPreferencesWebApps extends Record<string, unknown> {
    did_migrate_default_chrome_apps?: Array<string>;
    last_preinstall_synchronize_version?: string;
    migrated_default_apps?: Array<string>;
}

export interface IChromiumOptionsPreferencesZeroSuggest extends Record<string, unknown> {
    cachedresults?: string;
}

export interface IChromiumOptionsPreferences extends Record<string, unknown> {
    NewTabPage?: IChromiumOptionsPreferencesNewTabPage;
    accessibility?: IChromiumOptionsPreferencesAccessibility;
    account_tracker_service_last_update?: string;
    alternate_error_pages?: IChromiumOptionsPreferencesAlternateErrorPages;
    announcement_notification_service_first_run_time?: string;
    apps?: IChromiumOptionsPreferencesApps;
    autocomplete?: IChromiumOptionsPreferencesAutocomplete;
    autofill?: IChromiumOptionsPreferencesAutofill;
    bookmark?: IChromiumOptionsPreferncesBookmark;
    browser?: IChromiumOptionsPreferencesBrowser;
    commerce_daily_metrics_last_update_time?: string;
    countryid_at_install?: number;
    default_apps_install_state?: number;
    default_search_provider?: IChromiumOptionsPreferencesDefaultSearchProvider;
    domain_diversity?: IChromiumOptionsPreferencesDomainDiversity;
    enterprise_profile_guid?: string;
    extensions?: IChromiumOptionsPreferencesExtensions;
    gaia_cookie?: IChromiumOptionsPreferencesGaiaCookie;
    gcm?: IChromiumOptionsPreferencesGcm;
    google?: IChromiumOptionsPreferencesGoogle;
    history_clusters?: ChromiumOptionsPreferencesHistoryClusterRecord<Record<string, unknown>>;
    in_product_help?: IChromiumOptionsPreferencesInProductHelp;
    intl?: IChromiumOptionsPreferencesIntl;
    invalidation?: IChromiumOptionsPreferencesInvalidation;
    language_model_counters?: Record<string, number>;
    media?: IChromiumOptionsPreferencesMedia;
    media_router?: IChromiumOptionsPreferencesMediaRouter;
    migrated_user_scripts_toggle?: boolean;
    net?: IChromiumOptionsPreferencesNet;
    ntp?: IChromiumOptionsPreferencesNtp;
    omnibox?: IChromiumOptionsPreferencesOmnibox;
    optimization_guide?: IChromiumOptionsPreferencesOptimizationGuide;
    password_manager?: IChromiumOptionsPreferencesPasswordManager;
    pinned_tabs?: Array<unknown>;
    privacy_sandbox?: IChromiumOptionsPreferencesPrivacySandbox;
    profile?: IChromiumOptionsPreferencesProfile;
    protection?: Record<string, IChromiumOptionsPreferencesProtection>;
    safebrowsing?: IChromiumOptionsPreferencesSafeBrowsing;
    safety_hub?: IChromiumOptionsPreferencesSafetyHub;
    saved_tab_groups?: IChromiumOptionsPreferencesSavedTabGroups;
    segmentation_platform?: IChromiumOptionsPreferencesSegmentationPlatform;
    sessions?: IChromiumOptionsPreferencesSessions;
    settings?: IChromiumOptionsPreferencesSettings;
    signin?: IChromiumOptionsPreferencesSignin;
    spellcheck?: IChromiumOptionsPreferencesSpellCheck;
    sync?: IChromiumOptionsPreferencesSync;
    syncing_theme_prefs_migrated_to_non_syncing?: boolean;
    tab_group_saves_ui_update_migrated?: boolean;
    toolbar?: IChromiumOptionsPreferencesToolbar;
    total_passwords_available_for_account?: number;
    total_passwords_available_for_profile?: number;
    translate_site_blacklist?: Array<unknown>;
    translate_site_blocklist_with_time?: Array<unknown>;
    updateclientdata?: IChromiumUpdateClientDataApp;
    updateclientlastupdatecheckerror?: number;
    updateclientlastupdatecheckerrorcategory?: number;
    updateclientlastupdatecheckerrorextracode1?: number;
    web_apps?: IChromiumOptionsPreferencesWebApps;
    zerosuggest?: IChromiumOptionsPreferencesZeroSuggest;
}

export interface IChromiumOptions extends Record<string, unknown> {
    androidActivity?: string;
    androidDeviceSerial?: string;
    args?: Array<string>;
    binary?: string;
    debuggerAddress?: string;
    detach?: boolean;
    excludeSwitches?: Array<string>;
    extensions?: Extensions;
    localState?: IChromiumLocalState;
    prefs?: IChromiumOptionsPreferences;
    perfLoggingPrefs?: IChromiumOptionsPerformanceLoggingPreferences;
}

export type ChromiumMobileEmulationDevice = SuggestedString<
    | 'BlackBerry Z30'
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
    | 'Facebook on Android'
>;

export interface IChromiumMobileEmulationDevice {
    deviceName?: ChromiumMobileEmulationDevice;
}

export interface IChromiumMobileEmulationResolution extends IDimensions {
    pixelRatio?: number;
}

export interface INetworkConditionsSpec {
    download_throughput?: number;
    latency: number;
    offline?: boolean;
    upload_throughput?: number;
}

/**
 * Class for managing WebDriver options specific to a Chromium-based browser.
 */
export class Options<T extends Record<Capability, unknown> = Record<Capability, unknown>> extends Capabilities<T> {
    readonly options_: T;
    readonly BROWSER_NAME_VALUE: string;
    readonly CAPABILITY_KEY: undefined;

    /**
     * @param {(Capabilities|Map<string, ?>|Object)=} other Another set of
     *     capabilities to initialize this instance from.
     */
    constructor(other?: Options<T> | Capabilities<T> | MapOf<T> | T);

    addArguments(...args: Array<string>): this;

    debuggerAddress(address: string): this;

    windowSize(size: Partial<IDimensions>): this;

    excludeSwitches(...args: Array<string>): this;

    addExtensions(...args: Array<string | Buffer>): this;

    setBinaryPath(path: string): this;

    detachDriver(detach: boolean): this;

    setUserPreferences(prefs: IChromiumOptionsPreferences): this;

    setPerfLoggingPrefs(prefs: IChromiumOptionsPerformanceLoggingPreferences): this;

    setLocalState(state: IChromiumLocalState): this;

    androidActivity(name: string): this;

    androidDeviceSerial(serial: string): this;

    androidPackage(pkg: string): this;

    androidProcess(processName: string): this;

    androidUseRunningApp(useRunning: boolean): this;

    setBrowserLogFile(path: string): this;

    setBrowserMinidumpPath(path: string): this;

    setMobileEmulation(config: IChromiumMobileEmulationDevice | IChromiumMobileEmulationResolution): this;

    windowTypes(...args: Array<string>): this;

    enableBidi(): this;
}

declare class Extensions {
    extensions: Array<string | Buffer>;

    constructor();

    get length(): number;

    add(...args: Array<string | Buffer | Array<string | Buffer>>): void;

    [Symbols.serialize](): string;
}

// @ts-expect-error Selenium overrides the static constructor per implementation
export class Driver extends WebDriver implements IWebDriver {
    static createSession<T extends Record<Capability, unknown>>(
        caps: Options<T> | Capabilities<T> | MapOf<T> | T,
        opt_serviceExecutor: DriverService | Executor,
        vendorPrefix?: string,
        vendorCapabilityKey?: string,
    ): Driver;

    setFileDetector(): void;

    launchApp(id: string): Promise<void>;

    getNetworkConditions(): Promise<INetworkConditionsSpec>;

    deleteNetworkConditions(): Promise<void>;

    setNetworkConditions(spec: Partial<INetworkConditionsSpec>): Promise<void>;

    sendDevToolsCommand<T>(cmd: string, params?: T): Promise<void>;

    sendAndGetDevToolsCommand<T>(cmd: string, params?: T): Promise<string>;

    setPermission(name: string, state: PermissionState): Promise<void>;

    setDownloadPath(path: string): Promise<void>;

    getCastSinks(): Promise<Array<string>>;

    setCastSinkToUse(deviceName: string): Promise<void>;

    startDesktopMirroring(deviceName: string): Promise<void>;

    startCastTabMirroring(deviceName: string): Promise<void>;

    getCastIssueMessage(): Promise<string>;

    stopCasting(deviceName: string): Promise<void>;
}
