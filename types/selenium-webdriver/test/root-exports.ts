import {
    BrowsingContextInspector,
    Color,
    Colors,
    NetworkInspector,
    ScriptManager,
    Select,
    version,
} from "selenium-webdriver";

const color = new Color(255, 0, 0);
const parsed: Color = Color.fromString("rgba(255, 0, 0, 0.5)");
const red: Color = Colors.red;
const rgba: string = parsed.asRgba();
const packageVersion: string = version;

declare const driver: import("selenium-webdriver").WebDriver;
declare const element: import("selenium-webdriver").WebElement;
const select = new Select(element);
const contexts: Promise<BrowsingContextInspector.Instance> = BrowsingContextInspector(driver);
const network: Promise<NetworkInspector.Instance> = NetworkInspector(driver);
const scriptManagerFactory: typeof ScriptManager = ScriptManager;
const scripts: Promise<ScriptManager.Instance> = ScriptManager([], driver);
