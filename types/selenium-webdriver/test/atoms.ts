import * as bidiMutationListener from "selenium-webdriver/lib/atoms/bidi-mutation-listener";
import findElements = require("selenium-webdriver/lib/atoms/find-elements");
import getAttribute = require("selenium-webdriver/lib/atoms/get-attribute");
import isDisplayed = require("selenium-webdriver/lib/atoms/is-displayed");
import * as mutationListener from "selenium-webdriver/lib/atoms/mutation-listener";

const elements: object[] = findElements({ css: "button" });
const attribute: string | null = getAttribute({}, "disabled");
const displayed: boolean = isDisplayed({}, true);

const bidiMutationListenerKeys: Array<keyof typeof bidiMutationListener> = [];
const mutationListenerKeys: Array<keyof typeof mutationListener> = [];
