# Collie UI

An opinionated experiment in design systems: components that carry **no styling at
all**, styled entirely by recipes, themed entirely by tokens.

Notes, decisions and rationale live in the ctrl repo at
`ctrl/docs/projects/collie-ui/` — this repo is code.

## The shape of it

```
packages/tokens       DTCG token source -> CSS custom properties, Tailwind @theme, a contract
packages/recipes-tw   every class string, as slot recipes. No React, no framework
packages/ui           React components. No class strings, no styling decisions
apps/workshop         Storybook
```

Dependencies run one way only: `tokens <- recipes-tw <- ui`. Nothing points back.

Three rules hold the whole thing together:

1. **Components contain no styles.** Grep `packages/ui` for a utility class and you
   should find none.
2. **Recipes reference semantic tokens only** — `bg-accent-solid`, never `blue-500`
   and never `gray.9`. A primitive appearing in a recipe means a theme will break.
3. **State travels as data attributes, not props.** The recipe styles
   `data-loading`; the component only sets it. New states never change a signature.

Wireframe mode is a _theme_, not a second set of components — it changes token
values (radius 0, no shadow, mono, dashed borders, grey) and nothing else. It is
also a conformance test: anything still looking polished in wireframe mode broke
rule 1 or 2.

## Local setup

Tooling is pinned with [mise](https://mise.jdx.dev) — `node`, `pnpm`.

```sh
mise trust        # first time in this checkout
mise run setup    # writes .env with this worktree's ports, installs deps
mise run dev      # tokens (watched) + Storybook + Playroom
```

| surface                          | what it's for                                                          |
| -------------------------------- | ---------------------------------------------------------------------- |
| **Storybook** (`PORT_STORYBOOK`) | one component, many states — plus the token reference and written docs |
| **Playroom** (`PORT_PLAYROOM`)   | many components, one screen — every theme rendered side by side        |

### Worktrees

Every worktree is fully independent: its own `.env`, its own ports, its own
`node_modules`. Adding one:

```sh
git worktree add ../collie-ui-<name> -b <branch>
cd ../collie-ui-<name>
mise trust        # mise won't run a config it hasn't been told to trust
mise run setup    # assigns ports, installs deps
mise run dev
```

Nothing is shared and nothing needs coordinating — start as many as you like and
they won't fight over a port.

**How the ports get picked.** `mise run setup` writes a gitignored `.env`:

```
PORT_BASE=6530        # 10 ports reserved for this worktree
PORT_STORYBOOK=6530
PORT_PLAYROOM=6531    # reserved; nothing listens there yet
```

`PORT_BASE` is seeded by hashing the worktree's directory name — so it's the same
every time for a given worktree — then checked to be actually free, walking to the
next slot if not. Ranges run 6000–6890 in steps of 10. The file is written once
and never regenerated; edit it freely, or delete it and re-run `setup` to be
reassigned. `mise` loads it via `_.file = ".env"`, and tasks read
`${PORT_STORYBOOK}`.

Two things worth knowing: `.env` is gitignored, so a fresh worktree has none until
`mise run setup` runs — that's the step that makes it independent. And each
worktree installs its own `node_modules` (pnpm's store is shared, so it's fast,
but it isn't instant).

### Tasks

| task                 | does                                                       |
| -------------------- | ---------------------------------------------------------- |
| `mise run setup`     | assign ports, install dependencies                         |
| `mise run tokens`    | rebuild tokens (`packages/tokens/dist/`)                   |
| `mise run storybook` | component workshop on this worktree's port                 |
| `mise run dev`       | everything above                                           |
| `mise run fix`       | apply every autofix — **writes files**                     |
| `mise run check`     | verify everything — **writes nothing** (what CI would run) |

`fix` is prettier + eslint --fix. `check` is prettier --check + eslint + `tsc --build`.
Run `fix` then `check` before considering anything done.

Token output under `packages/tokens/dist/` is generated and gitignored — run
`mise run tokens` after a fresh clone or any token change.

## Not here yet

A Panda CSS recipe implementation alongside the Tailwind one, and every component
that isn't Button.

Two of the three rules no longer need a lint rule: the generated CSS drops
Tailwind's own colour, spacing and radius scales, so `bg-blue-500` and `p-4` don't
compile at all. The remaining rule — components carrying no class strings — still
wants one.
