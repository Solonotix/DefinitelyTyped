import { Builder } from "selenium-webdriver";
import Account = require("selenium-webdriver/lib/fedcm/account");
import Dialog = require("selenium-webdriver/lib/fedcm/dialog");

const account = new Account("account-id", "user@example.com", "Example User");
const accountId: string = account.accountId;
const givenName: string | undefined = account.givenName;

const driver = new Builder().forBrowser("chrome").build();
const dialog = new Dialog(driver);

const title: Promise<string> = dialog.title();
const subtitle: Promise<{ title: string; subtitle?: string }> = dialog.subtitle();
const type: Promise<string> = dialog.type();
const accounts: Promise<Account[]> = dialog.accounts();
const selected: Promise<void> = dialog.selectAccount(0);
const accepted: Promise<void> = dialog.accept();
const dismissed: Promise<void> = dialog.dismiss();
