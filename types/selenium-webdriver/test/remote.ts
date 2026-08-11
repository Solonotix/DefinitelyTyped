import * as webdriver from "selenium-webdriver";
import * as remote from "selenium-webdriver/remote";
import { formatSpawnArgs, getJavaPath, isSelenium3x } from "selenium-webdriver/remote/util";

function TestRemoteFileDetector() {
    const driver: webdriver.WebDriver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();

    const fileDetector: remote.FileDetector = new remote.FileDetector();
    fileDetector.handleFile(driver, "path/to/file").then((path: string) => {
        /* empty */
    });
}

function TestSeleniumServer() {
    const pathToJar = "/path/to/jar";
    const seleniumServer: remote.SeleniumServer = new remote.SeleniumServer(pathToJar);
}

function TestSeleniumServerOptions() {
    const pathToJar = "/path/to/jar";
    const options: remote.SeleniumServer.Options = {
        loopback: false,
        port: 4444,
        args: ["--testArg"],
        jvmArgs: ["--testJvmArg"],
        env: { test1: "test1", test2: "test2" },
        stdio: "inherit",
    };
    const seleniumServer: remote.SeleniumServer = new remote.SeleniumServer(pathToJar, options);
}

function TestRemoteUtil() {
    const javaPath: string = getJavaPath();
    const selenium3: boolean = isSelenium3x("/path/to/selenium-server.jar");
    const args: string[] = formatSpawnArgs("/path/to/selenium-server.jar", ["-jar", "--port", "4444"]);
}
