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
- [ ] Expose otherwise unnamed factory results through companion namespaces on
      real runtime exports.
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
- [ ] Every declaration matches the runtime module's CommonJS export shape.
- [ ] The root exports match the runtime's enumerable public exports, including
      `Color` and `Colors`.
- [ ] Every declaration is reviewed against the 4.46.0 implementation, even if
      the draft file has no TODO.
- [ ] No declaration file is empty or contains a top-level implementation TODO.
- [ ] No declaration contains JavaScript method bodies, `module.exports`, or a
      runtime `require` statement.
- [ ] No relative import is unresolved or differs from the runtime path by
      spelling or casing.
- [ ] No declaration file incorrectly shadows a directory entry point.
- [ ] Existing supported imports and tests continue to compile unless the
      corresponding runtime API is absent in 4.46.0.
- [ ] New factory result types are usable through companion namespaces.
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

## Phase 3: Enforce the CommonJS contract

Use the runtime assignment, not preferred TypeScript syntax, to choose a module
declaration form.

| Runtime form | Declaration form |
| --- | --- |
| `module.exports = value` | Declare the value and use `export = value` |
| `exports.name = value` | Named export |
| `module.exports = { name }` | Named export(s), matching the object keys |
| `module.exports = factory` | Callable declaration plus `export =` |
| Factory stored in an exported property | Named function plus companion namespace |

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

### Companion namespace convention

When an exported factory is named like the unexported class instance it creates,
attach type-only members to the real function export:

```ts
export function Network(
    driver: WebDriver,
    browsingContextIds?: readonly string[] | null,
): Promise<Network.Instance>;

export namespace Network {
    interface Instance {
        close(): Promise<void>;
    }
}
```

For a module whose entire CommonJS export is the factory:

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

- [ ] Use `Instance` for the resolved private class contract.
- [ ] Give other exported types descriptive names such as `Options`, `Event`,
      `Listener`, or `Result`.
- [ ] Export only types needed to express public arguments, results, callbacks,
      or objects consumers retain.
- [ ] Do not expose private fields, callback maps, sockets, or initialization
      helpers unless consumers can access them at runtime.
- [ ] Do not duplicate a directly exported runtime class under `Instance`; its
      class declaration already supplies the instance type.

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

- [ ] Reconcile the BiDi connection module and its WebSocket event signatures.
- [ ] Complete the seven TODO-marked modules:
      `browsingContext`, `browsingContextInspector`,
      `createContextParameters`, `input`, `interceptPhase`, `networkInspector`,
      and `resultOwnership`.
- [ ] Convert the copied implementation in `network.d.ts` to signatures and
      expose the resolved object as `Network.Instance`.
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

- [ ] Resolve every relative `.js` import to a corresponding declaration.
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
- [ ] Test every browser, BiDi, transport, and internal subpath added or renamed.
- [ ] Test `export =` modules with `import = require` while interop flags remain
      disabled.
- [ ] Verify no test can import a synthetic `Selenium` export.
- [ ] Verify no unsupported synthetic default import is required.

### Type behavior

- [ ] Assert `Network(...)` returns `Promise<Network.Instance>`.
- [ ] Assert each other asynchronous factory exposes and returns its companion
      `Instance` type.
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
3. BiDi declarations, companion namespaces, protocol types, and tests.
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
