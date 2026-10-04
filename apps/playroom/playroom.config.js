const path = require("node:path");

const babel = {
  loader: require.resolve("babel-loader"),
  options: {
    presets: [
      require.resolve("@babel/preset-env"),
      [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
      require.resolve("@babel/preset-typescript"),
    ],
  },
};

module.exports = {
  title: "Collie UI",
  components: "./src/components.ts",
  themes: "./src/themes.ts",
  frameComponent: "./src/FrameComponent.tsx",
  outputPath: "./dist",
  cwd: __dirname,
  port: Number(process.env.PORT_PLAYROOM ?? 9000),
  openBrowser: false,
  widths: [400, 768, 1200],
  frameSettings: [{ id: "compact", label: "Compact density", defaultValue: false }],
  exampleCode: `
    <Button emphasis="primary" tone="accent">Save changes</Button>
    <Button emphasis="secondary" tone="critical">Delete</Button>
  `,
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          // Workspace packages are TypeScript source; playroom's own rules only
          // cover its internals, and its default rule only covers .jsx? in cwd.
          include: [path.resolve(__dirname, "src"), path.resolve(__dirname, "../../packages")],
          use: [babel],
        },
        {
          test: /\.css$/i,
          // Playroom scopes its own CSS rule to its internals, so ours needs a
          // loader chain of its own.
          include: [path.resolve(__dirname, "src")],
          use: [
            require.resolve("style-loader"),
            { loader: require.resolve("css-loader"), options: { url: false } },
            require.resolve("postcss-loader"),
          ],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      // Sources use ESM-style "./button.js" imports that resolve to .ts/.tsx.
      extensionAlias: { ".js": [".ts", ".tsx", ".js"] },
    },
  }),
};
