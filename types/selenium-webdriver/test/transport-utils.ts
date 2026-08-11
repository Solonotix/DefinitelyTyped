import { getBinaryPaths } from "selenium-webdriver/common/driverFinder";
import { BinaryPaths, binaryPaths } from "selenium-webdriver/common/seleniumManager";
import { CancellationError, getStatus, waitForServer, waitForUrl } from "selenium-webdriver/http/util";
import { Capabilities } from "selenium-webdriver/lib/capabilities";

const managerPaths: BinaryPaths = binaryPaths(["--browser", "chrome"]);
const driverPaths: BinaryPaths = getBinaryPaths(Capabilities.chrome());
const driverPath: string = driverPaths.driverPath;
const browserPath: string = managerPaths.browserPath;

const status: Promise<Record<string, unknown>> = getStatus("http://localhost:4444");
const cancellation = Promise.resolve();
const server: Promise<Record<string, unknown>> = waitForServer("http://localhost:4444", 1_000, cancellation);
const url: Promise<void> = waitForUrl("http://localhost:4444/status", 1_000, cancellation);
const cancellationError = new CancellationError();
