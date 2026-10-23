/** Build a tel: link from a human-written number. Assumes India (+91) when no country code is given. */
export function toTel(label: string): string {
  const trimmed = label.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";
  if (trimmed.startsWith("+")) return `tel:+${digits}`;
  if (digits.startsWith("91") && digits.length === 12) return `tel:+${digits}`;
  if (digits.startsWith("0")) return `tel:+91${digits.slice(1)}`;
  return `tel:+91${digits}`;
}
