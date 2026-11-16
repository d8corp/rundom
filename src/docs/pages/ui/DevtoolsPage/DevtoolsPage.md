# Devtools

`<Devtools>` is a development panel that inspects the hubs, slots and runes of the page.
It runs its own hub, so it can be mounted next to the application root without sharing its state.

| Prop         | Type          | Description                                      |
|--------------|---------------|--------------------------------------------------|
| [**anon**](#anon) | `boolean` | Hides hub and slot names in the panel             |
| [**system**](#system) | `boolean` | Enables system slot details in the panel    |
| **class**    | `string`      | Additional CSS class(es) of the root element     |

## Basic usage
---

Mount `<Devtools>` next to the application, usually only in development:

```tsx
//! src/index.tsx
import { rundom, Devtools } from 'rundom'

if (import.meta.env?.DEV === 'true') {
  rundom(<Devtools anon system />)
}
```

The panel renders a floating button. Click it to open the list of hubs and inspect their slots.

## Anon
---

`anon` hides hub and slot names. Use it in screenshots and public demos, where internal names should not be visible.

```tsx
<Devtools anon />
```

## System
---

`system` includes system slots, such as effects and internal state, in the list. They are hidden by default to keep the panel readable.

```tsx
<Devtools system />
```

## Theme
---

The default styles of `<Devtools>` come from the theme and are configured with environment variables:

| Variable                     | Description                                       |
|------------------------------|---------------------------------------------------|
| `RD_THEME_DEVTOOLS`          | CSS of the component that is added to the page    |
| `RD_THEME_DEVTOOLS__ROOT`    | Class name(s) of the floating button              |

### Replacing the component

Set `RD_UI_DEVTOOLS` to a module alias, and `<Devtools>` will be taken from the `Devtools` export of that module:

```tsx
//! .env
RD_UI_DEVTOOLS='@theme/devtools'
//! theme/devtools.tsx
import { DevtoolsComponent, DevtoolsProps } from 'rundom'

export function Devtools (props: DevtoolsProps) {
  return <DevtoolsComponent {...props} data-testid='devtools' />
}
```

## What's Next?
---

- Read [State Management](/state-management) to understand hubs and slots
- Learn about [\<HubProvider>](/hub-provider) for isolated hubs
- Explore [\<Show>](/show) for reactive conditionals
