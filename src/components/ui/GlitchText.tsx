import clsx from "clsx";

type GlitchTextProps = {
  text: string;
  className?: string;
  as?: "span" | "h3" | "h2";
};

export default function GlitchText({ text, className, as = "span" }: GlitchTextProps) {
  const Tag = as;

  return (
    <Tag className={clsx("glitch-title", className)}>
      <span className="glitch-layer glitch-layer-1" aria-hidden="true">
        {text}
      </span>
      <span className="glitch-layer glitch-layer-2" aria-hidden="true">
        {text}
      </span>
      <span className="relative">{text}</span>
    </Tag>
  );
}
