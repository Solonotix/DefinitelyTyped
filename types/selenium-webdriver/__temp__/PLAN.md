# Selenium WebDriver 4.46 Type Migration Plan

This is the working checklist for migrating the useful declarations in this
directory into the existing `@types/selenium-webdriver` package. The final
change is intended to be one comprehensive DefinitelyTyped pull request,
organized into reviewable commits.

The rest of `__temp__` is reference material and must not be included in that
pull request.

## Fixed decisions

- [ ] Target exactly `selenium-webdriver@4.46.0`.
- [ ] Prefer runtime fidelity over compatibility with inaccurate historical
      declarations.
- [ ] Cover every JavaScript module shipped in the 4.46.0 npm tarball, including
      modules Selenium labels internal.
- [ ] Preserve compatibility aliases only when they are type-only and remain
      truthful for the 4.46.0 runtime.
- [ ] Preserve useful existing DefinitelyTyped comment blocks for symbols that
      still exist.
- [ ] Model the CommonJS package as CommonJS; do not add synthetic default
      exports or a synthetic `Selenium` runtime export.
- [ ] Use type-only support declarations such as `bidi/_internal.d.ts` to hold
      shared structural contracts and namespace scaffolding when importing a
      concrete entry point would create a circular declaration dependency.
- [ ] Build type-only companion namespaces on real runtime exports so consumers
      can name factory results and reach useful submodule declarations without
      inventing runtime properties.
- [ ] Keep aggregate entry points out of leaf declaration dependencies. Concrete
      modules may depend on shared internal contracts; aggregate `index.d.ts`
      files should be assembled from those modules last.
- [ ] Keep the intentional removal of the `v2` and `v3` declaration packages.

## Sources of truth

Resolve conflicts in this order:

1. The published
   [`selenium-webdriver@4.46.0`](https://www.npmjs.com/package/selenium-webdriver/v/4.46.0)
   npm tarball.
2. The tagged
   [4.46.0 Selenium source](https://github.com/SeleniumHQ/selenium/tree/selenium-4.46.0/javascript/selenium-webdriver),
   including its JSDoc, tests, and BiDi schemas.
3. The declarations, tests, and useful documentation in the current
   DefinitelyTyped package.
4. The declarations in `__temp__`, treated as candidates rather than an
   authoritative replacement.

Do not use Selenium `trunk` to decide the 4.46.0 contract. Later changes may be
consulted only to understand a confusing implementation, and must not be added
unless they are also present in the published 4.46.0 package.

### Pinned artifact

- Version: `4.46.0`
- Package: `selenium-webdriver`
- Tarball:
  `https://registry.npmjs.org/selenium-webdriver/-/selenium-webdriver-4.46.0.tgz`
- Tagged root implementation:
  `https://github.com/SeleniumHQ/selenium/blob/selenium-4.46.0/javascript/selenium-webdriver/index.js`

Before editing declarations, download the pinned package into a temporary
directory and record its registry integrity value in the PR notes:

```sh
npm view selenium-webdriver@4.46.0 version dist.tarball dist.integrity
npm pack selenium-webdriver@4.46.0 --json
```

Never extract the reference package over `types/selenium-webdriver`.

## Definition of done

- [ ] Every shipped JavaScript module has either a matching declaration or an
      explicit, evidence-backed reason that it cannot be imported by consumers.
- [ ] Every runtime-facing declaration matches the runtime module's CommonJS
      export shape. Explicit type-only support files are documented as
      declaration infrastructure and are never presented as runtime subpaths.
- [ ] The root exports match the runtime's enumerable public exports, including
      `Color` and `Colors`.
- [ ] Every declaration is reviewed against the 4.46.0 implementation, even if
      the draft file has no TODO.
- [ ] No declaration file is empty or contains a top-level implementation TODO.
- [ ] No declaration contains JavaScript method bodies, `module.exports`, or an
      expression-level runtime `require` statement. Type-only
      `import Name = require(...)` remains valid for referencing an `export =`
      declaration.
- [ ] No relative import is unresolved or differs from the runtime path by
      spelling or casing.
- [ ] No declaration file incorrectly shadows a directory entry point.
- [ ] Existing supported imports and tests continue to compile unless the
      corresponding runtime API is absent in 4.46.0.
- [ ] Every public factory result has a stable, consumer-nameable type through a
      companion namespace; use a domain name such as `Browser` when one exists
      and `Instance` only as a descriptive fallback.
- [ ] `WebDriver`, `Bidi`, and BiDi leaf modules share canonical structural
      contracts without importing one another's aggregate entry points.
- [ ] Type-only namespace aliases preserve their nested members, and aggregate
      namespace members are available in type positions without asserting
      nonexistent runtime values.
- [ ] `pnpm test selenium-webdriver` passes, including dtslint and `attw`.
- [ ] `pnpm run test-all` passes, or unrelated pre-existing failures are
      recorded with their complete command and diagnostics.
- [ ] The final PR excludes `__temp__` while preserving this file locally as the
      migration record.

## Phase 1: Build the runtime inventory

Create a temporary inventory from the extracted tarball rather than from the
GitHub directory listing.

For every shipped `.js` module, record:

| Field | Required evidence |
| --- | --- |
| Runtime path | Exact path relative to the package root |
| Import path | Consumer-facing package subpath |
| Export form | `module.exports = value`, `exports.name`, or exported object |
| Exported names | Runtime keys and whether each value is callable or constructable |
| Declaration path | Matching `.d.ts` path, if present |
| Declaration role | Runtime module, type-only support file, leaf module, or aggregate entry point |
| Existing tests | Test files that exercise the module or export |
| Status | Keep, merge, add, rename, or remove |

- [ ] Inventory the package root and browser modules.
- [ ] Inventory `bidi` and `bidi/external`.
- [ ] Inventory `common` and `devtools`.
- [ ] Inventory `http`, `io`, `net`, and `remote`.
- [ ] Inventory `lib`, `lib/atoms`, and `lib/fedcm`.
- [ ] Inventory any other directories actually shipped in the tarball.
- [ ] Compare `Object.keys(require(modulePath))` with declared named exports where
      requiring the module is side-effect safe.
- [ ] Record modules whose export is a function, class, primitive, or other
      non-object value separately; `Object.keys` alone is insufficient for them.
- [ ] Build a declaration import graph in addition to the runtime inventory.
      Mark each edge as value-shaped, type-only, or namespace-aliasing, and
      identify cycles that pass through the root or `bidi/index.d.ts`.
- [ ] Do not count `_internal.d.ts` support files as shipped JavaScript modules;
      record why each exists and which cycle or duplicated contract it removes.

### Four-way reconciliation

For each declaration, compare these inputs before choosing a signature:

| Input | Purpose |
| --- | --- |
| Git HEAD | Published DefinitelyTyped compatibility baseline |
| Working tree | Changes already being integrated outside `__temp__` |
| `__temp__` | Candidate signatures and newly covered modules |
| 4.46.0 tarball | Authoritative runtime behavior and export shape |

- [ ] Transplant improvements into the existing declaration rather than
      replacing it wholesale when that preserves comments and reviewed types.
- [ ] Keep existing tests unless they assert behavior that the 4.46.0 runtime no
      longer provides.
- [ ] Record every removed public declaration and the runtime evidence for its
      removal in the PR description.

## Phase 2: Normalize package structure

- [ ] Change the root `package.json` version from `4.35.9999` to `4.46.9999`.
- [ ] Retain the current `private`, `projects`, `owners`, and workspace
      development metadata.
- [ ] Derive declaration dependencies from the final import graph. Keep
      `@types/node` and `@types/ws`; add packages such as `jszip` or `@types/tmp`
      only if their public types remain imported by declarations.
- [ ] Do not copy the personal `__temp__/package.json` scripts, author metadata,
      version, or development dependencies into the DefinitelyTyped package.
- [ ] Keep the `v2` and `v3` deletions and remove the now-stale `/v2/` and `/v3/`
      entries from `.npmignore`.
- [ ] Confirm no retained declaration, package field, or test references `v2`
      or `v3`.
- [ ] Keep the existing DefinitelyTyped compiler settings unless a 4.46.0
      public signature demonstrably requires a newer target or library.
- [ ] Include every declaration and test explicitly or through a narrowly scoped
      `include`; do not accidentally compile files under `__temp__`.

### Known path reconciliation

- [ ] Rename `bidi/createContextParameter.d.ts` to
      `bidi/createContextParameters.d.ts`.
- [ ] Rename `bidi/partitionDescritptor.d.ts` to
      `bidi/partitionDescriptor.d.ts`.
- [ ] Rename `bidi/providerResponseParameters.d.ts` to
      `bidi/provideResponseParameters.d.ts`.
- [ ] Rename `bidi/realmiInfo.d.ts` to `bidi/realmInfo.d.ts`.
- [ ] Update every relative import to use the corrected runtime spelling.
- [ ] Remove `http.d.ts` if the tarball exposes only `http/index.js`; otherwise
      model both paths independently.
- [ ] Remove `remote.d.ts` if the tarball exposes only `remote/index.js`;
      otherwise model both paths independently.
- [ ] Remove `bidi/remoteValue.d.ts` if the module is absent from the 4.46.0
      tarball, and update consumers to the actual 4.46.0 protocol-value modules.

### Type-only support files and dependency layering

Use `_internal.d.ts` as declaration infrastructure, not as a declaration for an
imagined `_internal.js` runtime module. It may contain interfaces, type aliases,
and namespace-only type families that concrete declarations need in place of
importing the module where the corresponding runtime class is implemented.

The intended BiDi dependency layers are:

1. Generic declaration helpers in the package-level `_internal.d.ts`.
2. Shared BiDi contracts and namespace scaffolding in `bidi/_internal.d.ts`.
3. Concrete BiDi leaf declarations, parameter types, and protocol modules.
4. The aggregate `bidi/index.d.ts` CommonJS export and its companion namespace.
5. The package root `index.d.ts`.

This layering is specifically intended to decouple `lib/webdriver.d.ts` from
`bidi/index.d.ts`. `WebDriver._bidiConnection` and the public `getBidi()` result
can refer to the structural `Bidi` contract from `bidi/_internal.d.ts`, while the
concrete class in `bidi/index.d.ts` implements that same contract. BiDi modules
that need a `WebDriver` can still import its type without importing the BiDi
aggregate back through the root.

- [ ] Give each shared contract one canonical declaration. Concrete classes
      should `implements` it and public namespace aliases should refer to it
      rather than copying the member list.
- [ ] Keep `_internal.d.ts` free of runtime constants, classes, factory
      declarations, `export =`, and claims that a matching JavaScript module
      exists.
- [ ] Use `import type` for ordinary structural dependencies, including the
      internal `Bidi` contract imported by `lib/webdriver.d.ts`.
- [ ] Allow an ordinary import in a `.d.ts` only when TypeScript requires an
      entity that can be used as a namespace alias, such as
      `export import ProtocolType = Protocol.Type`; document that reason in the
      review if it is not self-evident.
- [ ] Alias colliding contract names at the import site (`Bidi as IBidi`,
      `Browser as BrowserContract`, or similarly clear names) so a concrete
      class can implement the internal interface without recursively referring
      to itself.
- [ ] Do not import the package root or `bidi/index.d.ts` from a concrete BiDi
      leaf declaration. If a leaf needs an aggregate-owned type, move the
      structural contract to the appropriate `_internal.d.ts` layer.
- [ ] Keep internal contracts structural and limited to cross-module needs.
      Module-local implementation details should remain in the concrete
      declaration, and private fields should not be moved merely to make the
      internal namespace more comprehensive.
- [ ] Include support files through the declaration graph, but do not advertise
      or runtime-smoke-test `selenium-webdriver/_internal` or
      `selenium-webdriver/bidi/_internal` as consumer import paths.

## Phase 3: Enforce CommonJS and construct namespaces

Use the runtime assignment, not preferred TypeScript syntax, to choose a module
declaration form.

| Runtime form | Declaration form |
| --- | --- |
| `module.exports = value` | Declare the value and use `export = value` |
| `exports.name = value` | Named export |
| `module.exports = { name }` | Named export(s), matching the object keys |
| `module.exports = factory` | Callable declaration plus `export =` |
| Factory stored in an exported property | Named function plus companion namespace |
| Nested type family with no runtime value | Namespace in a type-only support file, surfaced through a type-only alias |

- [ ] Replace incorrect `export default` declarations in CommonJS subpaths.
- [ ] Test `import x = require("selenium-webdriver/subpath")` for `export =`
      modules.
- [ ] Test named imports only where the runtime exports corresponding object
      properties.
- [ ] Do not rely on `esModuleInterop` or `allowSyntheticDefaultImports`.
- [ ] Remove every `export namespace Selenium` and `declare namespace Selenium`
      block from the draft migration.
- [ ] Do not export internal helpers from the root unless the tagged root
      implementation exports them.
- [ ] Treat namespace merging as two separate audits: verify the merged value
      against runtime keys, then verify type-only members against the public
      declaration contract. A type-only namespace member does not imply that a
      property exists at runtime.

### Factory result contracts

When a module exports a factory whose implementation class is private, expose a
structural result contract from the companion namespace on the real function.
Prefer the library's domain name over a universal `Instance` convention:

```ts
import type { Browser as BrowserContract } from './_internal.js';

declare function getBrowserInstance(driver: WebDriver): Promise<getBrowserInstance.Browser>;

declare namespace getBrowserInstance {
    export { BrowserContract as Browser };
}

export = getBrowserInstance;
```

The private implementation class may be declared locally and implement
`BrowserContract` when needed to describe or check constructor behavior, but it
must not be exported just to make the factory result nameable. If the package
has no meaningful domain name for the result, use `Instance`:

```ts
declare function BrowsingContext(
    driver: WebDriver,
    options: BrowsingContext.Options,
): Promise<BrowsingContext.Instance>;

declare namespace BrowsingContext {
    interface Options {
        // Public options passed to the factory.
    }

    interface Instance {
        // Public methods on the resolved object.
    }
}

export = BrowsingContext;
```

Rules for companion members:

- [ ] Use a source-aligned domain name such as `Browser`, `BrowsingContext`, or
      `Network` for a private factory result when that name is unambiguous; use
      `Instance` only when there is no clearer stable public name.
- [ ] Make the exported factory signature explicitly return the companion's
      public contract instead of leaking an unexported class name only through
      inference.
- [ ] Give supporting types descriptive names such as `Options`, `Event`,
      `Listener`, or `Result`.
- [ ] Export only types needed to express public arguments, results, callbacks,
      or objects consumers retain.
- [ ] Do not expose private fields, callback maps, sockets, or initialization
      helpers unless consumers can access them at runtime.
- [ ] Do not duplicate a directly exported runtime class under `Instance`; its
      class declaration already supplies the instance type.

### Namespace aliases and type families

Use a namespace alias when a plain type alias would discard nested names. The
`protocolType.d.ts` pattern preserves `ProtocolType.Primitive.String`, enum
interfaces, and the rest of the hierarchy from the canonical internal
namespace:

```ts
import { Protocol } from './_internal.js';

export import ProtocolType = Protocol.Type;
```

The same technique can attach internal namespace families to a factory's
companion namespace, as in `browsingContext.d.ts`:

```ts
declare namespace getBrowsingContextInstance {
    export import Locator = BidiBrowsingContext.Locator;
    export import Readiness = BidiBrowsingContext.Readiness;
    export import Type = BidiBrowsingContext.Type;
}
```

- [ ] Use `export import Alias = Namespace.Member` for a true namespace alias;
      do not replace it with `type Alias = ...` when consumers need nested
      members below the alias.
- [ ] Keep literal unions, their nested literal names, and the corresponding
      runtime constant interfaces under one canonical namespace hierarchy.
- [ ] Declare runtime constants separately from their type namespace aliases
      and verify their keys against the JavaScript export.
- [ ] Avoid restating aliases as parallel top-level types unless the runtime or
      existing supported API already exposes both names.

### Aggregate CommonJS namespaces

For an entry point such as `bidi/index.js` whose CommonJS export is a class,
merge a companion namespace into that real class and populate it with type-only
imports from the leaf declarations:

```ts
import type Browser = require('./browser.js');
import type * as ProtocolType from './protocolType.js';

declare class Bidi implements IBidi {
    // Runtime instance contract.
}

declare namespace Bidi {
    export { Browser, ProtocolType };
}

export = Bidi;
```

Nested groups such as `Bidi.External` may be constructed the same way when they
organize package declarations. This is a type navigation surface, not evidence
that `Bidi.Browser`, `Bidi.ProtocolType`, or `Bidi.External` exists as a runtime
property.

- [ ] Import leaf declaration namespaces with `import type` when they are
      surfaced only for type navigation.
- [ ] Use `import type Name = require('./module.js')` when the leaf itself uses
      `export =`; use `import type * as Name` for modules with named exports.
- [ ] Attach the aggregate namespace only to the module's real `export =` value;
      do not introduce a separate `Selenium` or `Bidi` runtime object.
- [ ] Include as many useful shipped submodule declarations as can be expressed
      truthfully in type space, while excluding implementation-only helpers and
      avoiding duplicate names.
- [ ] Declare any actual static property on the class or factory in value space
      and verify it independently against runtime keys.
- [ ] Ensure no leaf declaration imports the aggregate namespace merely to
      reach a sibling type; import the sibling directly or use the internal
      contract layer.

## Phase 4: Migrate declarations by subsystem

Complete each subsystem against the runtime inventory. A checked file means its
exports, call signatures, nullability, generics, comments, and import paths have
all been reviewed—not merely that it compiles.

### Root and browser drivers

- [ ] Reconcile the root `index.d.ts` with the complete 4.46.0 export list.
- [ ] Add and test `Color` and `Colors` through a matching `lib/color.d.ts`.
- [ ] Reconcile `chrome`, `chromium`, `edge`, `firefox`, `ie`, and `safari`.
- [ ] Verify browser option builders retain fluent `this` return types.
- [ ] Verify `Builder`, `ThenableWebDriver`, `WebDriver`, and WebElement-related
      exports retain their actual constructor and thenable behavior.

### Core library

- [ ] Reconcile `by`, `capabilities`, `color`, `command`, `error`, `http`,
      `input`, `logging`, `network`, `pinnedScript`, `promise`, `proxy`, `script`,
      `select`, `session`, `symbols`, `until`, `util`, `virtual_authenticator`,
      `webdriver`, and `webelement`.
- [ ] Reconcile `lib/fedcm/account` and `lib/fedcm/dialog`.
- [ ] Preserve existing API JSDoc and update stale Closure-style type prose only
      where the signature or runtime behavior changed.
- [ ] Replace broad draft types such as `CallableFunction`, unbounded `unknown`,
      and incorrect `Promise<never>` with types supported by source behavior.

### Transport, process, and developer tools

- [ ] Complete `common/driverFinder.d.ts`.
- [ ] Complete `common/seleniumManager.d.ts`.
- [ ] Reconcile `devtools/CDPConnection` and `devtools/networkinterceptor`.
- [ ] Reconcile `http/index` and complete `http/util.d.ts`.
- [ ] Reconcile `io/index`, `io/exec`, and `io/zip`.
- [ ] Complete `net/index.d.ts` and `net/portprober.d.ts`.
- [ ] Reconcile `remote/index` and complete `remote/util.d.ts`.
- [ ] Type atom modules according to their actual exported values:
      `bidi-mutation-listener`, `find-elements`, `get-attribute`, `is-displayed`,
      and `mutation-listener`.
- [ ] Mark unstable internal subpaths in JSDoc without re-exporting them from the
      root.

### BiDi

- [ ] Establish the canonical `Bidi`, `Browser`, browsing-context, protocol,
      and other cross-module contracts in `bidi/_internal.d.ts` before wiring
      concrete modules or aggregate namespaces to them.
- [ ] Type `WebDriver._bidiConnection` and `getBidi()` from the shared internal
      `Bidi` contract; have the concrete class in `bidi/index.d.ts` implement
      that contract without making `lib/webdriver.d.ts` import the aggregate.
- [ ] Reconcile the BiDi connection module and its WebSocket event signatures.
- [ ] Construct the `Bidi` companion namespace on the actual CommonJS class and
      surface the useful leaf declaration namespaces, including the nested
      `External` group, through type-only imports.
- [ ] Reconcile `browser.d.ts` as a CommonJS factory: keep the implementation
      class private, make it implement the internal `Browser` contract, and
      expose that contract as `getBrowserInstance.Browser`.
- [ ] Classify `WindowState` in the browser companion namespace separately: a
      type-only alias is safe, but its runtime constant may be declared as a
      factory property only if the 4.46.0 module actually attaches that value.
- [ ] Preserve the nested protocol type families with namespace aliases in
      `protocolType.d.ts` and `protocolValue.d.ts`; do not flatten them into
      aliases that lose names such as `ProtocolType.Primitive.String`.
- [ ] Apply the internal-namespace alias pattern to browsing-context `Locator`,
      `Readiness`, and `Type`, removing parallel duplicate declarations once
      consumers can reach the canonical hierarchy.
- [ ] Complete the seven TODO-marked modules:
      `browsingContext`, `browsingContextInspector`,
      `createContextParameters`, `input`, `interceptPhase`, `networkInspector`,
      and `resultOwnership`.
- [ ] Convert the copied implementation in `network.d.ts` to signatures and
      expose the resolved object through a nameable companion contract; retain
      `Network.Instance` if `Network.Network` would be less clear.
- [ ] Convert copied implementations in `continueResponseParameters.d.ts` and
      `provideResponseParameters.d.ts` to ambient class declarations.
- [ ] Reconcile browser, storage, script manager, log inspector, network types,
      protocol values, parameter builders, partitions, filters, evaluation
      results, external permissions, and every remaining shipped BiDi module.
- [ ] Use tagged Selenium tests and BiDi schemas to type event payloads as
      discriminated structures instead of generic objects.
- [ ] Verify every parameter-builder method returns `this` when the runtime is
      fluent.
- [ ] Verify optional versus nullable browsing-context lists and other protocol
      fields separately.

## Phase 5: Static quality audit

- [ ] Search for empty declarations:

  ```sh
  find types/selenium-webdriver -path '*/__temp__' -prune -o \
    -name '*.d.ts' -type f -empty -print
  ```

- [ ] Search for unfinished markers outside the staging directory:

  ```sh
  rg -n 'TODO|FIXME|not implemented' types/selenium-webdriver \
    -g '!**/__temp__/**' -g '*.d.ts'
  ```

- [ ] Search for copied runtime code:

  ```sh
  rg -n 'module\.exports|\brequire\(' types/selenium-webdriver \
    -g '!**/__temp__/**' -g '*.d.ts'
  ```

  Review `require` matches rather than deleting them mechanically: type-only
  import-equals declarations are expected when an aggregate namespace refers
  to an `export =` leaf module.

- [ ] Resolve every relative `.js` import to a corresponding declaration.
- [ ] Audit every `_internal.js` specifier. It must resolve to a type-only
      support declaration and be used through `import type`, except for a
      documented namespace-alias import that TypeScript requires.
- [ ] Audit the declaration import graph for edges from leaf modules back to
      `index.d.ts` or `bidi/index.d.ts`; remove those edges through direct leaf
      imports or canonical internal contracts.
- [ ] Search for duplicated structural contracts that also exist in
      `_internal.d.ts`, especially factory results and nested literal
      namespaces, and consolidate them before finalizing aliases.
- [ ] Search all uses of `any`, `unknown`, `CallableFunction`, `Function`,
      `Object`, and `never`; document why each retained occurrence is the most
      accurate public contract.
- [ ] Check filename casing on a case-sensitive filesystem.
- [ ] Compare the final module list with the pinned tarball a second time after
      renames and removals.

## Phase 6: Tests

Preserve all current tests and add focused tests alongside them. Prefer small
subsystem files over a single monolithic test.

### Module shape

- [ ] Test the root CommonJS and supported named-import forms.
- [ ] Test every browser, BiDi, transport, and runtime-internal subpath added or
      renamed. Do not add consumer import tests for type-only `_internal`
      support files.
- [ ] Test `export =` modules with `import = require` while interop flags remain
      disabled.
- [ ] Verify no test can import a synthetic `Selenium` export.
- [ ] Verify no unsupported synthetic default import is required.

### Type behavior

- [ ] Assert each asynchronous factory returns its documented companion result
      contract, including `getBrowserInstance.Browser` and any factory that uses
      the `Instance` fallback.
- [ ] Assert namespace aliases retain nested access such as
      `ProtocolType.Primitive.String`, `ProtocolValue.ResultOwnership.Root`, and
      the browsing-context `Locator`, `Readiness`, and `Type` families.
- [ ] Assert the `Bidi` aggregate namespace exposes the intended leaf module
      declarations in type positions, including `Bidi.External`, without making
      type-only members usable as runtime expressions.
- [ ] Assert the result of `WebDriver.getBidi()` is compatible with the concrete
      `Bidi` export and the shared internal contract without importing
      `_internal` from consumer tests.
- [ ] Assert BiDi event callbacks receive their specific event payloads.
- [ ] Assert fluent builders return their concrete `this` type.
- [ ] Cover WebDriver and WebElement thenables, conditions, script execution,
      nullability, cookies, windows, and downloads.
- [ ] Cover browser options and services, errors, CDP, FedCM, HTTP, IO, net,
      remote services, and virtual authenticators.
- [ ] Use `@ts-expect-error` for invalid enum values, malformed parameters,
      unsupported imports, and inputs rejected by the runtime.

### Runtime export smoke audit

Run a temporary, uncommitted Node script against the extracted 4.46.0 package.
It should:

- [ ] Require each side-effect-safe module from the manifest.
- [ ] Record whether the result is an object, function, class-like constructor,
      string, or other value.
- [ ] Compare object keys with declaration named exports.
- [ ] Confirm each declared root runtime value exists.
- [ ] Confirm factory exports are callable but their private implementation
      classes are not separately exported.
- [ ] Exclude `_internal.d.ts` support files from the runtime module loop and
      verify that no aggregate namespace work caused them to be advertised as
      JavaScript entry points.
- [ ] Save the command and summarized results in the PR description, not in the
      DefinitelyTyped package.

## Phase 7: Validation and final review

Run from the repository root:

```sh
pnpm test selenium-webdriver
pnpm run test-all
```

- [ ] Capture the complete targeted test result, including `attw` output.
- [ ] If the full run fails, rerun the failing package or command and distinguish
      migration failures from reproducible pre-existing failures.
- [ ] Review the final diff against Git HEAD to confirm existing comments were
      retained for surviving symbols.
- [ ] Confirm removed declarations correspond to absent or changed 4.46.0
      runtime APIs.
- [ ] Confirm `package.json`, `.npmignore`, and `tsconfig.json` contain only
      changes required by this migration.
- [ ] Confirm the PR contains declarations, tests, and package metadata but no
      `__temp__` files.

## Suggested commit organization

Keep the work in one PR with reviewable commits:

1. Package version, historical-version cleanup, path normalization, and module
   inventory-driven scaffolding.
2. Root, browser, core library, transport, process, remote, and devtools
   declarations with tests.
3. BiDi internal contracts, leaf declarations, companion/aggregate namespaces,
   protocol aliases, and tests, ordered from the type-only foundation outward.
4. Static cleanup, comment-preservation review, and final validation fixes.

Each commit should compile on its own where practical. Do not hide unrelated
formatting churn inside declaration changes.

## Validation log

Record commands and results here as work proceeds.

| Date | Command | Result | Notes |
| --- | --- | --- | --- |
| | `npm view selenium-webdriver@4.46.0 version dist.tarball dist.integrity` | Pending | Record pinned artifact metadata |
| 2026-08-11 | Runtime module/export audit | Passed | All 101 importable library modules matched; ESLint config and six executable examples excluded. |
| 2026-08-11 | `tsc -p types/selenium-webdriver/__temp__/tsconfig.json --pretty false` | Passed | Package-local declaration graph compiled without diagnostics. |
| 2026-08-11 | `dprint check --incremental=false --includes-override 'types/selenium-webdriver/__temp__/**/*.d.ts'` | Passed | All staged declarations formatted. |
| | `pnpm test selenium-webdriver` | Pending | Include dtslint and `attw` result |
| | `pnpm run test-all` | Pending | Record any unrelated failures |

## Open issues log

Add an entry only when source inspection cannot resolve a question. Each entry
must name the affected module, competing interpretations, runtime evidence, and
the chosen resolution before the migration is considered complete.

| Module | Question | Evidence | Resolution |
| --- | --- | --- | --- |
| | | | |
