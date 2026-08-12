import { Browser, Builder } from "selenium-webdriver";
import {
    Environment,
    ignore,
    IgnoredTestHooks,
    init,
    suite,
    SuiteOptions,
    TargetBrowser,
} from "selenium-webdriver/testing";

const target: TargetBrowser = {
    name: Browser.CHROME,
    platform: "linux",
    version: "stable",
};

const environment = new Environment(target);
new Environment(target, "http://localhost:4444/wd/hub");

// $ExpectType TargetBrowser
environment.browser;
// $ExpectType () => boolean
environment.browsers(Browser.CHROME, Browser.FIREFOX);
// $ExpectType Builder
environment.builder();

// $ExpectType SuiteOptions
new SuiteOptions();
// $ExpectType void
init();
// $ExpectType void
init(true);
// $ExpectType void
suite(env => {
    // $ExpectType Builder
    env.builder();
}, { browsers: [Browser.CHROME, target] });

// $ExpectType IgnoredTestHooks
const hooks: IgnoredTestHooks = ignore(() => false);
// $ExpectType TestHook
hooks.describe.only;

// @ts-expect-error
new Environment({});
// @ts-expect-error
suite(() => {}, { browsers: [42] });
