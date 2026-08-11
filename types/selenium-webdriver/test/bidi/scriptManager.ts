import { WebDriver } from "selenium-webdriver";
import getScriptManagerInstance = require("selenium-webdriver/bidi/scriptManager");
import { EvaluateResultSuccess } from "selenium-webdriver/bidi/evaluateResult";

function assert(condition: unknown, message?: string): asserts condition {
    if (!condition) {
        throw new Error(message || "Test failed");
    }
}

async function TestScriptManager() {
    const driver = null as unknown as WebDriver;
    const scriptManager = await getScriptManagerInstance("browsingContextId", driver);

    try {
        // Test init method
        await scriptManager.init("browsingContextId");
        console.log("init method passed");

        // Test disownRealmScript method
        await scriptManager.disownRealmScript("realmId", ["handle"]);
        console.log("disownRealmScript method passed");

        // Test disownBrowsingContextScript method
        await scriptManager.disownBrowsingContextScript("browsingContextId", ["handle"], "sandbox");
        console.log("disownBrowsingContextScript method passed");

        // Test callFunctionInRealm method
        await scriptManager.callFunctionInRealm(
            "realmId",
            "functionDeclaration",
            true,
            null,
            "thisParameter",
            "resultOwnership",
        );
        console.log("callFunctionInRealm method passed");

        // Test callFunctionInBrowsingContext method
        await scriptManager.callFunctionInBrowsingContext(
            "browsingContextId",
            "functionDeclaration",
            true,
            null,
            "thisParameter",
            "root",
            "sandbox",
        );
        console.log("callFunctionInBrowsingContext method passed");

        // Test evaluateFunctionInRealm method
        await scriptManager.evaluateFunctionInRealm("realmId", "expression", true, "root");
        console.log("evaluateFunctionInRealm method passed");

        // Test evaluateFunctionInBrowsingContext method
        await scriptManager.evaluateFunctionInBrowsingContext(
            "browsingContextId",
            "expression",
            true,
            "root",
            "sandbox",
        );
        console.log("evaluateFunctionInBrowsingContext method passed");

        // Test addPreloadScript method
        await scriptManager.addPreloadScript("functionDeclaration", [], "sandbox");
        console.log("addPreloadScript method passed");

        // Test removePreloadScript method
        await scriptManager.removePreloadScript("script");
        console.log("removePreloadScript method passed");

        // Test getCallFunctionParams method
        scriptManager.getCallFunctionParams(
            "targetType",
            "id",
            "sandbox",
            "functionDeclaration",
            true,
            null,
            "thisParameter",
            "resultOwnership",
        );
        console.log("getCallFunctionParams method passed");

        // Test getEvaluateParams method
        scriptManager.getEvaluateParams("targetType", "id", "sandbox", "expression", true, "root");
        console.log("getEvaluateParams method passed");

        // Test createEvaluateResult method
        scriptManager.createEvaluateResult({ result: new EvaluateResultSuccess("realmId", {}) });
        console.log("createEvaluateResult method passed");

        // Test realmInfoMapper method
        scriptManager.realmInfoMapper([]);
        console.log("realmInfoMapper method passed");

        // Test getAllRealms method
        await scriptManager.getAllRealms();
        console.log("getAllRealms method passed");

        // Test getRealmsByType method
        await scriptManager.getRealmsByType("type");
        console.log("getRealmsByType method passed");

        // Test getRealmsInBrowsingContext method
        await scriptManager.getRealmsInBrowsingContext("browsingContext");
        console.log("getRealmsInBrowsingContext method passed");

        // Test getRealmsInBrowsingContextByType method
        await scriptManager.getRealmsInBrowsingContextByType("browsingContext", "type");
        console.log("getRealmsInBrowsingContextByType method passed");
    } catch (err) {
        assert(false, err instanceof Error ? err.message : String(err));
    }
}

TestScriptManager();
