// The reasoning behind Collie UI, as data. The page renders it; edit here.

export type Status = "decided" | "leaning" | "planned" | "open";

export type Decision = {
  title: string;
  status: Status;
  chose: string;
  over?: string;
  why: string;
  cost?: string;
};

export type Area = { name: string; summary: string; decisions: Decision[] };

export const goals = [
  {
    title: "One system, unrelated products",
    body: "Same developer experience, different look. A new product is a theme file, not a fork.",
  },
  {
    title: "App code writes no CSS",
    body: "Apps compose components only: no utility classes, no stylesheets, no Tailwind config. Integration is one CSS import.",
  },
  {
    title: "Themes are token values",
    body: "Light, dark, warm, wireframe: every theme so far is values only. No component or recipe knows a theme exists.",
  },
];

export const layers = [
  { name: "tokens", owns: "every value", never: "class strings" },
  { name: "recipes-tw", owns: "every class string", never: "React, primitive colours" },
  { name: "ui", owns: "structure and behaviour", never: "a single class string" },
  { name: "your app", owns: "composition", never: "CSS" },
];

export const areas: Area[] = [
  {
    name: "Architecture",
    summary: "Where styling lives, and what a theme can reach.",
    decisions: [
      {
        title: "Components carry no styling",
        status: "decided",
        chose: "Zero-style components; slot recipes supply every class string",
        over: "Styled components with className overrides",
        why: "The recipe layer stays free of React, so it can serve another renderer. Themes reach everything, and the wireframe theme becomes a conformance test: anything still polished in wireframe hard-coded a style.",
        cost: "Every component needs a documented anatomy (its slots), which is now public API.",
      },
      {
        title: "State travels as data attributes",
        status: "decided",
        chose: "Recipes style data-open, data-selected, data-loading; components only set them",
        over: "Passing state props into recipes",
        why: "Base UI already emits these attributes. A new state never changes a signature, and only design variants (tone, size) cross the component → recipe boundary.",
      },
      {
        title: "Layout is part of the system",
        status: "decided",
        chose: "Stack, Inline, Columns, Tiles, Box, Container",
        why: '"No CSS in app code" only holds if layout is expressible through components. The first Button story already reached for a flex utility.',
      },
      {
        title: "Theme and variant; no skins",
        status: "decided",
        chose: "A theme changes token values. A variant is a component prop",
        over: "A separate skin layer of alternative recipes",
        why: 'Every visual change tried so far, including wireframe and "secondary is a tonal fill", was reachable through tokens. Only changes to what renders (slot order, element type) can\'t be, and those are variants.',
        cost: "Each component-tier token is public API forever. Add one only when a second theme needs it.",
      },
      {
        title: "The theme attribute goes on the document root",
        status: "decided",
        chose: "data-theme and data-density on <html>",
        over: "A wrapper div",
        why: "Dialogs and popovers portal to <body>, outside any wrapper. A wrapper-div theme loses its first modal.",
      },
    ],
  },
  {
    name: "Tokens",
    summary: "One source, three tiers, a fixed job for every shade.",
    decisions: [
      {
        title: "Three tiers; semantic is the public API",
        status: "decided",
        chose: "primitive ramp → semantic → component (optional)",
        why: "Universal across Material 3, Fluent 2, Carbon and Salesforce under different names. Recipes may only name semantic tokens; the build drops Tailwind's own colour, spacing and radius scales so bg-blue-500 and p-4 don't compile.",
      },
      {
        title: "Radix 12-step scales with a fixed step → role mapping",
        status: "decided",
        chose: "Step 9 is the solid fill, step 11 low-contrast text, in every hue",
        over: "Hand-picked shades per token",
        why: '"Which shade" is never a decision, and a new brand is one generated ramp instead of dozens of colour choices.',
      },
      {
        title: "W3C DTCG token format",
        status: "decided",
        chose: "*.tokens.json → CSS variables, Tailwind @theme, a typed contract",
        why: "Stable W3C spec since October 2025, supported by Figma, Style Dictionary and Tokens Studio. The same source can feed native apps later.",
      },
      {
        title: "Role-first naming",
        status: "decided",
        chose: "bg-accent-solid, text-fg-muted (GitHub Primer's grammar)",
        why: "Reads correctly where it is used, and is defensible by reference rather than argument.",
      },
      {
        title: "Density is a scale, swapped like a theme",
        status: "decided",
        chose: "data-density=compact repoints the space tokens",
        over: "A density prop on every component",
        why: "A roomy app and a dense app differ by one attribute. A per-component variant stays available for exceptions, like a table inside a roomy app.",
      },
      {
        title: "Two axes on actions: emphasis and tone",
        status: "decided",
        chose: 'emphasis (how loud) + tone (what it means); never "solid" or "outline"',
        why: "A call site says what it means, so restyling secondary never touches a call site. Button tones are neutral, accent and critical: the consequences a click can have. Status tones (warning, success) belong on Badge.",
      },
      {
        title: "Brand colour enters as a ramp, with two accents",
        status: "leaning",
        chose: "Brand accent for hero moments; form accent for everyday UI",
        why: "Brand colours are often not usable UI colours and fail contrast. The form accent can point at a nearby hue that passes.",
      },
    ],
  },
  {
    name: "Stack",
    summary: "Build-time styling, headless behaviour, strict boundaries for time and money.",
    decisions: [
      {
        title: "Tailwind v4 as the recipe engine",
        status: "decided",
        chose: "Tailwind v4 with CSS-first @theme",
        over: "Runtime CSS-in-JS",
        why: "Tokens compile to real CSS variables, so themes swap at runtime with no plugin. Build-time styling survived the server-components shift; runtime CSS-in-JS did not.",
      },
      {
        title: "Panda CSS as a second recipe implementation",
        status: "planned",
        chose: "recipes-panda next to recipes-tw, same anatomies",
        why: "Zero-style components make a second engine one package. Panda's stable class names suit non-React templates better than utility soup.",
      },
      {
        title: "Base UI for behaviour",
        status: "decided",
        chose: "@base-ui/react",
        over: "React Aria Components, Ark UI",
        why: "Its parts take className and expose state as data attributes, so recipes style it like plain DOM. It is shadcn/ui's default since July 2026.",
        cost: "No date picker; build one on @internationalized/date.",
      },
      {
        title: "Dates cross boundaries as ISO strings plus a zone",
        status: "decided",
        chose: "ISO 8601 instant + IANA zone; the zone is always required",
        over: "Date objects",
        why: "A Date carries the viewer's zone silently and can't say \"09:00 in Asia/Tokyo\". Calendar dates shift a day by offset: the classic booking bug.",
      },
      {
        title: "Money is integer minor units",
        status: "decided",
        chose: "formatCurrency(minorUnits, currency)",
        why: "No floats. Minor-unit count comes from Intl per currency, so JPY (0) and KWD (3) need no table of ours.",
      },
      {
        title: "Time ranges are descriptions",
        status: "decided",
        chose: '{ kind: "relative", amount: 6, unit: "hour" }, resolved with an explicit now',
        why: '"Last 6 hours" asked twice is two windows. Freezing it makes a saved view wrong the next morning; an explicit now keeps every screen deterministic.',
      },
      {
        title: "Tokens are cross-platform; components are not",
        status: "leaning",
        chose: "One DTCG source → CSS for web, native theme objects for mobile",
        over: "React Native Web as one component runtime",
        why: "Rebuilding every component on RN primitives adds a runtime rather than unifying anything. One visual language, no runtime coupling.",
      },
      {
        title: "Distribution: packaged tokens, copied components",
        status: "leaning",
        chose: "Tokens as a versioned package; components from a private shadcn registry",
        why: "Products need to diverge on components but not on the visual language. A registry gives copy-paste an update path.",
      },
    ],
  },
  {
    name: "Tooling",
    summary: "Prove it at n = 1, then widen. Generate what can drift.",
    decisions: [
      {
        title: "One component end to end first",
        status: "decided",
        chose: "Button through every layer before a second component",
        why: "Anything painful at one component is fatal at forty.",
      },
      {
        title: "Storybook and Playroom",
        status: "decided",
        chose: "Storybook for states, tests and docs; Playroom for every theme side by side",
        why: "They answer different questions: one component in many states, or many components on one screen. Playroom is on probation; it brings a second bundler.",
      },
      {
        title: "Reference docs are generated",
        status: "decided",
        chose: "Token tables and theme files render from source",
        why: "Hand-typed reference drifts. Prose explains the why; generated tables state the what.",
      },
      {
        title: "Lint for architecture, not style",
        status: "decided",
        chose: "Custom rules: no classes in ui, no primitives in recipes, one-way imports",
        why: "Off-the-shelf rules buy little here. The compiler already enforces two of the three core rules.",
      },
      {
        title: "Smoke-render every screen",
        status: "decided",
        chose: "mise run smoke server-renders every POC screen",
        why: "Catches what types can't: a component that throws on first render. Paid for itself the day it landed.",
      },
    ],
  },
];

export const lessons = [
  {
    found:
      "Tone classes built by string interpolation never compiled. The tone axis was silently dead, and the docs still looked right.",
    rule: "Recipes write every class out in full.",
  },
  {
    found: "text-sm, font-medium and leading-normal were Tailwind's defaults, not ours.",
    rule: "Tokenise every namespace in use, and reset Tailwind's.",
  },
  {
    found: "Dialogs rendered in the default theme whatever the toolbar said.",
    rule: "The theme belongs on the document root.",
  },
  {
    found: "Intl rejects dateStyle with timeZoneName, at render time.",
    rule: "Smoke-render every screen in CI.",
  },
  {
    found: "Every Radix dark ramp was generated empty.",
    rule: "Generators throw on missing data instead of writing {}.",
  },
  {
    found: "Amber's solid step stays light in dark mode, so its text must go dark.",
    rule: "on-{tone} is per-tone data, not a computed contrast.",
  },
  {
    found: "Numeric token keys forced space={200} at every call site.",
    rule: 'Quote keys in recipes so props read space="200".',
  },
];

export const openQuestions = [
  {
    question: "Which tone set?",
    detail:
      "Current neutral / accent / critical / warning / success, or Braid's critical / caution / positive / neutral / info / promote.",
  },
  {
    question: "What to call the hierarchy axis?",
    detail:
      "emphasis, importance or prominence. The axis name and its values (primary / secondary) currently describe different things.",
  },
  {
    question: "Numeric or t-shirt spacing?",
    detail:
      "space.100 (Atlassian) or small / medium (Braid). Matters less while app code never names spacing.",
  },
  {
    question: "Stateless semantic tier?",
    detail:
      "Primer keeps hover and active at the component tier only. We put them on semantic tokens.",
  },
  {
    question: "Responsive props and breakpoint tokens",
    detail: "Columns and Tiles still use Tailwind's default breakpoints.",
  },
  {
    question: "A non-React consumer?",
    detail:
      "A server-rendered app (Go templates, say) would use recipes as plain class strings, which caps how much behaviour can live in the headless layer.",
  },
  {
    question: "How do fixes reach copied components?",
    detail: "The registry gives an update path; the workflow around it isn't designed.",
  },
  {
    question: "Package name: format or intl?",
    detail: "It will grow parsing, plurals and RTL, which intl describes better.",
  },
];

export const gaps = [
  "Icons",
  "Toast",
  "Menu",
  "Tooltip",
  "Pagination",
  "Table sorting and selection",
  "Focus-ring token",
  "Date picker",
  "Charts",
];
