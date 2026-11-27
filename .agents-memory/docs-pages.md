---
description: docs page content conventions (per-prop sections, table anchors, examples). Read before adding or editing pages in src/docs/pages.
updated: 2026-11-27
---

# Docs Page Conventions

- Give almost every prop its own section and link the prop name in the props table to that section: `| [**gap**](#gap) | ... |` followed by `## Gap` with a `---` rule underneath. Reference: `src/docs/pages/ui/FlexPage/FlexPage.md`.
- Order the rows of the props table: regular props alphabetically, then composition props (`xxxProps`), then event/callback props such as `onSelect`.
- Use the prop name as the heading when a section covers a single prop. Grouped behavior gets a descriptive name such as `## Multiple selection`.
- Keep anchors in sync with the heading: lowercase, spaces to hyphens, punctuation dropped (`## Flex property` → `#flex-property`).
- Props that only pass through (`style`, `class`, native attributes) and inherited props may stay unlinked.
- In prose, mention other components as links to their pages: `<Popover>` is a [\<Card>](/ui/card) that appears next to a target element. The component the page documents stays in code without a link. Escape the angle brackets in link text.
- Interactive examples use the markers `//! View`, `//> <key>`, `//! Code`; `<key>` must exist in the page component's `examples` object. Keep each snippet self-contained: imports, data, and `rundom(...)`.
- Write snippets for narrow screens: split long imports across lines and keep the rest of the code short enough to read on a phone without horizontal scrolling.
- Keep examples declarative: state updates and other business logic live in named functions above `rundom()` (`const addValue = () => ...`), and handlers are passed by reference (`onclick={addValue}`). Use an inline arrow only to bind an argument in a list (`onclick={() => select(item)}`) or for a trivial callback with no logic.
- Give every section at least one example, and more when a section covers several behaviors. `## What's Next?` is the only section that does not need one.
- Name action functions after what they do (`addValue`, `toggleDisabled`, `handleSave`), not after the event, so the prose can refer to them by name.
- Put theme environment variables in the `Theme` section, followed by the `### Replacing the component` subsection.
- End a page with `## What's Next?` linking related components and concepts.
