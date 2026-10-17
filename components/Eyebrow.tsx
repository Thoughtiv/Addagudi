import { Icon } from "./Icon";

type Props = { children: React.ReactNode; light?: boolean; mono?: boolean; className?: string };

export function Eyebrow({ children, light, mono, className = "" }: Props) {
  const cls = ["eyebrow", light && "eyebrow--light", mono && "eyebrow--mono", className].filter(Boolean).join(" ");
  return (
    <p className={cls}>
      <span className="eyebrow__rule" aria-hidden="true" />
      <Icon id="i-plus" className="eyebrow__plus" />
      {children}
    </p>
  );
}
