import type { SuggestedString } from '../_internal.js';

/** Internal network helpers shipped by selenium-webdriver. */
export namespace Net {
  export function Address(family?: Address.Family): string | undefined;
  export namespace Address {
    export type Family = SuggestedString<Family.v4 | Family.v6>;
    export namespace Family {
      export type v4 = 'IPv4';
      export type v6 = 'IPv6';
    }
  }

  export function LoopbackAddress(family?: Address.Family): string | undefined;

  export function Split(hostport: string): Split.Result;

  export namespace Split {
    export interface HostOnly {
      host: string;
      port: null;
    }

    export interface HostAndPort {
        host: string;
        port: number;
    }

    export type Result = HostOnly | HostAndPort;
  }
}

export import getAddress = Net.Address;
export import getLoopbackAddress = Net.LoopbackAddress;
export import splitHostAndPort = Net.Split;
