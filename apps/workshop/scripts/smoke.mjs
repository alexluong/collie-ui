// Renders every POC screen through Vite's SSR pipeline. Not a test suite — it
// catches the class of breakage typechecking cannot see (a hook called wrong, a
// component that throws on first render) until Storybook Test is set up.
import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import { createElement } from "react";

const server = await createServer({
  root: new URL("..", import.meta.url).pathname,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

const pages = [
  ["dashboard.js", "Dashboard"],
  ["tenant-list.js", "TenantList"],
  ["tenant-detail.js", "TenantDetail"],
  ["integrations.js", "Integrations"],
  ["order-list.js", "OrderList"],
  ["settings-page.js", "SettingsPage"],
];

let failed = 0;
for (const [file, name] of pages) {
  try {
    const mod = await server.ssrLoadModule(`/src/poc/${file}`);
    const html = renderToString(createElement(mod[name]));
    console.log(`ok    ${name.padEnd(14)} ${html.length} bytes`);
  } catch (error) {
    failed++;
    console.log(`FAIL  ${name}\n      ${error.stack.split("\n").slice(0, 6).join("\n      ")}`);
  }
}
await server.close();
process.exit(failed ? 1 : 0);
