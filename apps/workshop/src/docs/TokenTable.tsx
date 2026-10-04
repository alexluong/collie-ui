import primitiveTokens from "../../../../packages/tokens/dist/primitives.json";
import tokens from "../../../../packages/tokens/dist/tokens.json";

type Token = {
  name: string;
  path: string[];
  value: string;
  reference?: string;
  description?: string;
};

const all = tokens as Token[];

function Swatch({ token }: { token: Token }) {
  const isColor = token.path[0] === "color";
  const style = isColor
    ? { background: `var(${token.name})` }
    : { width: `var(${token.name})`, background: "var(--collie-color-accent-solid)" };

  return (
    <div className="flex h-300 w-300 items-center overflow-hidden rounded-sm border border-border-subtle">
      <div className="h-full" style={{ ...style, minWidth: isColor ? "100%" : undefined }} />
    </div>
  );
}

/** Rendered from packages/tokens/dist/tokens.json — regenerated on every build. */
export function TokenTable({ group }: { group: string }) {
  const rows = all.filter((t) => t.path.join(".").startsWith(group));

  return (
    <table className="w-full border-separate border-spacing-y-50 text-left text-sm">
      <thead className="text-fg-muted">
        <tr>
          <th className="w-300" />
          <th>Token</th>
          <th>Refers to</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.name}>
            <td>
              <Swatch token={t} />
            </td>
            <td className="font-mono">{t.name.replace("--collie-", "")}</td>
            <td className="font-mono text-fg-muted">{t.reference ?? t.value}</td>
            <td className="text-fg-muted">{t.description ?? ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ToneMatrix() {
  const tones = ["neutral", "accent", "critical", "warning", "success"];
  const steps = ["subtle", "subtle-hover", "subtle-active", "solid", "solid-hover"];

  return (
    <table className="border-separate border-spacing-50 text-left text-sm">
      <thead className="text-fg-muted">
        <tr>
          <th />
          {steps.map((s) => (
            <th key={s} className="font-normal font-mono text-xs">
              {s}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tones.map((tone) => (
          <tr key={tone}>
            <td className="font-mono text-xs">{tone}</td>
            {steps.map((step) => (
              <td key={step}>
                <div
                  className="h-300 w-300 rounded-sm border border-border-subtle"
                  style={{ background: `var(--collie-color-${tone}-${step})` }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const primitives = primitiveTokens as Token[];

/** One primitive ramp, step 1–12, with the step's documented job underneath. */
export function Ramp({ hue }: { hue: string }) {
  const steps = primitives.filter((t) => t.path[0] === hue);

  return (
    <div className="gap-25 flex">
      {steps.map((t) => (
        <div key={t.name} className="flex-1">
          <div
            className="h-300 rounded-sm border border-border-subtle"
            style={{ background: t.value }}
          />
          <div className="pt-50 text-center text-xs text-fg-muted">{t.path[1]}</div>
        </div>
      ))}
    </div>
  );
}

export function AllRamps() {
  const hues = [
    ...new Set(primitives.map((t) => t.path[0]).filter((h): h is string => Boolean(h))),
  ].filter((h) => primitives.some((t) => t.path[0] === h && t.path.length === 2));

  return (
    <div className="flex flex-col gap-200">
      {hues.map((hue) => (
        <div key={hue}>
          <div className="pb-50 font-mono text-sm">{hue}</div>
          <Ramp hue={hue} />
        </div>
      ))}
    </div>
  );
}

/** Renders every type token at its own value, so the scale is legible as a scale. */
export function TypeScale() {
  const sizes = all.filter((t) => t.path[0] === "text");

  return (
    <table className="w-full border-separate border-spacing-y-100 text-left text-sm">
      <thead className="text-fg-muted">
        <tr>
          <th className="w-300">Token</th>
          <th className="w-300">Value</th>
          <th>Sample</th>
        </tr>
      </thead>
      <tbody>
        {sizes.map((t) => (
          <tr key={t.name}>
            <td className="align-middle font-mono">{t.path.join(".")}</td>
            <td className="align-middle font-mono text-fg-muted">{t.value}</td>
            <td className="align-middle" style={{ fontSize: `var(${t.name})` }}>
              The quick brown fox
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function WeightScale() {
  const weights = all.filter((t) => t.path[0] === "weight");

  return (
    <table className="w-full border-separate border-spacing-y-100 text-left text-sm">
      <thead className="text-fg-muted">
        <tr>
          <th className="w-300">Token</th>
          <th className="w-300">Value</th>
          <th>Sample</th>
        </tr>
      </thead>
      <tbody>
        {weights.map((t) => (
          <tr key={t.name}>
            <td className="font-mono">{t.path.join(".")}</td>
            <td className="font-mono text-fg-muted">{t.value}</td>
            <td style={{ fontWeight: `var(${t.name})` }}>The quick brown fox</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
