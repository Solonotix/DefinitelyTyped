import { CdpConnection } from "selenium-webdriver/devtools/CDPConnection";
import type { WebSocket } from "ws";

declare const socket: WebSocket;
const connection = new CdpConnection(socket);

connection.targetID = "target-id";
connection.sessionId = "session-id";
connection.execute("Runtime.enable", {}, error => {
    const maybeError: Error | undefined = error;
});

const response: Promise<{ id: number; result: unknown }> = connection.send("Runtime.evaluate", {
    expression: "1 + 1",
});
