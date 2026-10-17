/** Validation shared by the browser form and the API route. */

export type EnquiryInput = { name: string; company: string; email: string; phone: string; message: string };
export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export const LIMITS = { name: 120, company: 160, email: 200, phone: 40, message: 4000 } as const;

export function validateEnquiry(raw: Partial<Record<keyof EnquiryInput, unknown>>): { data: EnquiryInput; errors: EnquiryErrors } {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data: EnquiryInput = {
    name: str(raw.name),
    company: str(raw.company),
    email: str(raw.email),
    phone: str(raw.phone),
    message: str(raw.message),
  };
  const errors: EnquiryErrors = {};

  if (!data.name) errors.name = "Please enter your name.";
  else if (data.name.length > LIMITS.name) errors.name = "Name is too long.";

  if (data.company.length > LIMITS.company) errors.company = "Company name is too long.";

  if (!data.email) errors.email = "Please enter your email address.";
  else if (data.email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Please enter a valid email address.";

  if (data.phone && (data.phone.length > LIMITS.phone || !/^[+()\d][\d\s().+-]{6,}$/.test(data.phone))) errors.phone = "Please enter a valid phone number, or leave it blank.";

  if (!data.message) errors.message = "Please describe your requirement.";
  else if (data.message.length < 10) errors.message = "Please add a little more detail (at least 10 characters).";
  else if (data.message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`;

  return { data, errors };
}
