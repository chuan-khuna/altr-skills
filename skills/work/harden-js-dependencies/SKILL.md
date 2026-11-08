---
name: harden-js-dependencies
description: Configure an install cooldown (minimum release age) so freshly-published npm package versions can't be installed until they've been public long enough to be caught. Writes .npmrc, bunfig.toml, pnpm-workspace.yaml, or .yarnrc.yml. Use when the user says "harden dependencies", "set up install cooldown", "minimumReleaseAge", "min-release-age", "protect against supply chain attacks", or asks how to avoid installing compromised packages.
---

# Harden JS Dependencies

Set up a **cooldown** on dependency installs: a package version must have been public for N days before this project will install it.

Most npm supply-chain compromises are caught and unpublished within hours. A cooldown means the blast window passes before the version is ever reachable from this repo. Default to **7 days**.

This is one control, not a security program. It does nothing about packages that were already malicious a month ago, and nothing about a dependency you pin yourself. Say so if the user seems to think it's more than it is.

## Step 1 — Detect the package manager

Check in this order and stop at the first hit:

1. `packageManager` field in `package.json` — authoritative, use it
2. Lockfile — `bun.lock`/`bun.lockb` → bun, `pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `package-lock.json` → npm
3. More than one lockfile, or none → ask the user which one, and stop

Configure only the detected manager. Writing all four files is noise, and a stray `.npmrc` in a bun repo misleads the next reader into thinking they're covered.

## Step 2 — Check the version, before writing anything

Each tool ignores unknown config keys **silently**. Writing a cooldown into a repo whose toolchain is too old produces a file that looks protective and does nothing — worse than no file at all, because it stops anyone from asking again.

Run the version check and compare against the minimum:

| Manager | Check | Minimum version |
|---|---|---|
| npm | `npm --version` | 11.10.0 |
| bun | `bun --version` | 1.3 |
| pnpm | `pnpm --version` | 10.16 |
| yarn | `yarn --version` | 4.10.0 |

If the installed version is below the minimum: **do not write the config.** Tell the user the exact version they have, the version they need, and let them decide whether to upgrade first. Don't write it anyway with a warning comment — the file outlives the conversation.

## Step 3 — Write the config

Each tool uses a different key name **and** a different unit. Do not carry a value across from another tool's format.

### npm — `.npmrc`

Unit: **days**

```ini
# Don't install package versions published less than 7 days ago.
min-release-age=7
```

### bun — `bunfig.toml`

Unit: **seconds**

```toml
[install]
# Don't install package versions published less than 7 days ago.
minimumReleaseAge = 604800
```

### pnpm — `pnpm-workspace.yaml`

Unit: **minutes**

```yaml
# Don't install package versions published less than 7 days ago.
minimumReleaseAge: 10080
```

### yarn — `.yarnrc.yml`

Unit: **minutes, or a duration string**

```yaml
# Don't install package versions published less than 7 days ago.
npmMinimalAgeGate: "7d"
```

Conversion reference for a 7-day cooldown: `7` days · `604800` seconds · `10080` minutes.

If the file already exists, **edit it** — add or update only the cooldown key and leave every other line untouched. Registry URLs and auth tokens live in these files; overwriting one can break the user's ability to install at all.

If a cooldown key is already present with a different value, don't silently change it. Show the user the current value and ask.

## Step 4 — Offer an exclude list, don't invent one

Every tool supports exempting specific packages. This is for the case where a team needs same-day access to its own internal packages — otherwise their own release pipeline stalls for a week.

| Manager | Key |
|---|---|
| npm | *(no exclude support — note this if asked)* |
| bun | `minimumReleaseAgeExcludes` (array, under `[install]`) |
| pnpm | `minimumReleaseAgeExclude` (list) |
| yarn | `npmPreapprovedPackages` (list) |

Add excludes **only** when the user names packages or an org scope. Don't populate this from guesses — every entry is a hole in the control, and a hole nobody asked for is the kind that stays open for years.

## Step 5 — Verify and report

State plainly:

- Which file was written or edited, by path
- The key, the value, and the unit it's in
- The detected manager and its version

Then flag the two consequences the user will actually hit:

- **CI must use the same config.** If the file isn't committed, or CI overrides it, CI installs without a cooldown and the protection is local-only theatre. Check that the file isn't gitignored.
- **A fresh release of something they want will be blocked.** That's the feature working. The escape hatch is the exclude list or a temporary flag — not deleting the config.

## Rules

- Never write config for a toolchain below the minimum version — report and stop
- Never overwrite an existing `.npmrc`/`bunfig.toml` wholesale; edit in place
- Never convert a value between tools without converting the unit
- Never add exclude entries the user didn't ask for
- Don't claim this protects against anything beyond newly-published malicious versions
