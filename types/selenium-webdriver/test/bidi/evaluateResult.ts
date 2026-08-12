import { error } from "console";
import {
    EvaluateResultException,
    EvaluateResultSuccess,
    ExceptionDetails,
} from "selenium-webdriver/bidi/evaluateResult";
import { RemoteValue } from "selenium-webdriver/bidi/protocolValue";

function TestEvaluateResultSuccess() {
    const evaluateResultSuccess = new EvaluateResultSuccess(
        "asdf",
        new RemoteValue({ type: "string", value: "string" }),
    );
    if (evaluateResultSuccess.result.value !== "string") {
        throw new Error("EvaluateResultSuccess failure");
    }
}

function TestEvaluateResultException() {
    const exceptionDetails = new ExceptionDetails({
        columnNumber: 12,
    });
    if (exceptionDetails.columnNumber !== 12) {
        throw new Error("ExceptionDetails failure");
    }
    const evaluateResultException = new EvaluateResultException("asdf", exceptionDetails);
    if (evaluateResultException.exceptionDetails.columnNumber !== 12) {
        throw new Error("EvaluateResultException failure");
    }
}
