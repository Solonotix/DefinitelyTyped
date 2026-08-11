import { getAddress, getLoopbackAddress, splitHostAndPort } from "selenium-webdriver/net";
import { findFreePort, isFree } from "selenium-webdriver/net/portprober";

const address: string | undefined = getAddress();
const ipv6Loopback: string | undefined = getLoopbackAddress("IPv6");
const hostAndPort = splitHostAndPort("localhost:4444");
const host: string = hostAndPort.host;
const port: number | null = hostAndPort.port;

const freePort: Promise<number> = findFreePort("127.0.0.1");
const portIsFree: Promise<boolean> = isFree(4444);
