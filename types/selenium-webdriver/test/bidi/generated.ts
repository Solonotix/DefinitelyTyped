import { Bluetooth } from "selenium-webdriver/bidi/generated/bluetooth";
import { Browser, getBrowserInstance } from "selenium-webdriver/bidi/generated/browser";
import { BrowsingContext, getBrowsingContextInstance } from "selenium-webdriver/bidi/generated/browsing_context";
import type { Command, Message } from "selenium-webdriver/bidi/generated/common";
import { Emulation } from "selenium-webdriver/bidi/generated/emulation";
import { getInputInstance, Input } from "selenium-webdriver/bidi/generated/input";
import { getLogInspectorInstance, Log } from "selenium-webdriver/bidi/generated/log";
import { getNetworkInstance, Network } from "selenium-webdriver/bidi/generated/network";
import { Permissions } from "selenium-webdriver/bidi/generated/permissions";
import { getScriptManagerInstance, Script } from "selenium-webdriver/bidi/generated/script";
import { Session } from "selenium-webdriver/bidi/generated/session";
import { Speculation } from "selenium-webdriver/bidi/generated/speculation";
import { getStorageInstance, Storage } from "selenium-webdriver/bidi/generated/storage";
import { UserAgentClientHints } from "selenium-webdriver/bidi/generated/user_agent_client_hints";
import { WebExtension } from "selenium-webdriver/bidi/generated/webextension";

declare const driver: unknown;
declare const command: Command;
declare const message: Message;

const constructors = [
    Bluetooth,
    Browser,
    BrowsingContext,
    Emulation,
    Input,
    Log,
    Network,
    Permissions,
    Script,
    Session,
    Speculation,
    Storage,
    UserAgentClientHints,
    WebExtension,
];

const factories = [
    getBrowserInstance(driver),
    getBrowsingContextInstance(driver),
    getInputInstance(driver),
    getLogInspectorInstance(driver),
    getNetworkInstance(driver),
    getScriptManagerInstance(driver),
    getStorageInstance(driver),
];

void command;
void constructors;
void factories;
void message;
