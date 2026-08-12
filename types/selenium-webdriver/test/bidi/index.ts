import Bidi = require("selenium-webdriver/bidi");
import type { WebDriver } from "selenium-webdriver";

declare const driver: WebDriver;
const bidiFromDriver: Promise<Bidi> = driver.getBidi();

declare const network: Bidi.Network.Instance;
declare const beforeRequestSent: Bidi.Network.Types.BeforeRequestSent;

const cacheBehavior: Bidi.Network.CacheBehavior = "bypass";
const primitiveType: Bidi.ProtocolType.Primitive.String = "string";
const ownership: Bidi.ProtocolValue.ResultOwnership.Root = "root";
declare const generatedNetwork: Bidi.Generated.Network.Network;

// @ts-expect-error ProtocolType is a type-only aggregate member, not a static property of the runtime class.
Bidi.ProtocolType;

// @ts-expect-error External is a type-only aggregate member, not a static property of the runtime class.
Bidi.External;

// @ts-expect-error Generated is a type-only aggregate member, not a static property of the runtime class.
Bidi.Generated;
network.beforeRequestSent(event => {
    const requestId: string = event.request.request;
});
network.authRequired(event => {
    const status: number = event.response.status;
});
const eventRequestId: string = beforeRequestSent.request.request;

function testStatusMethod() {
    const mockStatusResult: Bidi.StatusResult = {
        id: 123,
        result: {
            build: { version: "1.0.0" },
            message: "System is ready",
            os: { arch: "x64", name: "Linux", version: "5.15" },
            ready: true,
        },
        type: "status",
    };

    class MockBidi extends Bidi {
        constructor() {
            super("ws://mockurl");
        }

        get status(): Promise<Bidi.StatusResult> {
            return Promise.resolve(mockStatusResult);
        }
    }

    const mockInstance = new MockBidi();

    mockInstance.status
        .then((result) => {
            console.log("Test passed. Status result:", result);

            if (typeof result.id !== "number") {
                throw new Error("`id` should be a number.");
            }

            if (typeof result.type !== "string") {
                throw new Error("`type` should be a string.");
            }

            const { build, message, os, ready } = result.result;

            if (typeof build.version !== "string") {
                throw new Error("`build.version` should be a string.");
            }

            if (typeof message !== "string") {
                throw new Error("`message` should be a string.");
            }

            if (typeof os.arch !== "string" || typeof os.name !== "string" || typeof os.version !== "string") {
                throw new Error("OS properties (`arch`, `name`, `version`) should be strings.");
            }

            if (typeof ready !== "boolean") {
                throw new Error("`ready` should be a boolean.");
            }
        })
        .catch((error) => {
            console.error("Test failed:", error);
        });
}

testStatusMethod();
