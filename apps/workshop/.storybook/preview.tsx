import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import "../src/styles.css";

// Sets the same two attributes an app sets on <html>. It has to be the document
// root, not a wrapper: portalled surfaces (dialogs, drawers, menus) mount to
// <body> and would otherwise fall back to the default theme.
const withTheme: Decorator = (Story, context) => {
  const { theme, density } = context.globals;

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.density = density;
  }, [theme, density]);

  return (
    <div className="bg-canvas p-300 font-sans text-fg">
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  initialGlobals: { theme: "polished", density: "comfortable" },
  globalTypes: {
    theme: {
      description: "Token theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "polished", title: "Polished" },
          { value: "midnight", title: "Midnight" },
          { value: "sandstone", title: "Sandstone" },
          { value: "wireframe", title: "Wireframe" },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      description: "Spacing scale",
      toolbar: {
        title: "Density",
        icon: "component",
        items: [
          { value: "comfortable", title: "Comfortable" },
          { value: "compact", title: "Compact" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          [
            "Base tokens",
            "Semantic tokens",
            "Typography",
            "Tones",
            "Hierarchy",
            "Theming",
            "Themes",
            "Dates & money",
          ],
          "Guides",
          ["Anatomy", "Inspirations"],
          "Primitives",
          ["Button", "Typography", "Layout", "Fields", "Overlays", "Tabs", "Time range"],
          "POC",
        ],
      },
    },
  },
};

export default preview;
