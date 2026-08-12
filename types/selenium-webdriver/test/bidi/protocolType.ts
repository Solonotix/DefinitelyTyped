import { NonPrimitiveType, PrimitiveType, RemoteType } from "selenium-webdriver/bidi/protocolType";
import type * as ProtocolType from "selenium-webdriver/bidi/protocolType";

const primitiveString: ProtocolType.Primitive.String = "string";
const nonPrimitiveArray: ProtocolType.NonPrimitive.Array = "array";
const remoteWindow: ProtocolType.Remote.Window = "window";
const negativeInfinity: ProtocolType.SpecialNumber.MinusInfinity = "-Infinity";

function TestPrimitiveType() {
    const primitiveTypeMatch = PrimitiveType.findByName("undefined") !== null;
    if (!primitiveTypeMatch) {
        throw new Error("PrimitiveType.findByName failure");
    }
}

function TestNonPrimitiveType() {
    const nonPrimitiveTypeMatch = NonPrimitiveType.findByName("array") !== null;
    if (!nonPrimitiveTypeMatch) {
        throw new Error("NonPrimitiveType.findByName failure");
    }
}

function TestRemoteType() {
    const remoteTypeMatch = RemoteType.findByName("symbol") !== null;
    if (!remoteTypeMatch) {
        throw new Error("RemoteType.findByName failure");
    }
}
