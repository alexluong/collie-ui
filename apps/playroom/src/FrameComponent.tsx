import { useEffect } from "react";
import type { ReactNode } from "react";
import "./styles.css";

type Props = {
  theme: string;
  frameSettings?: Record<string, boolean>;
  children: ReactNode;
};

export default function FrameComponent({ theme, frameSettings, children }: Props) {
  const density = frameSettings?.compact ? "compact" : "comfortable";

  // Each frame is its own document, so the theme goes on that document's root —
  // portalled surfaces mount to its <body>, outside any wrapper element.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.density = density;
  }, [theme, density]);

  return <div className="bg-canvas p-200 font-sans text-fg">{children}</div>;
}
