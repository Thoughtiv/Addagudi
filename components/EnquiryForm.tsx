"use client";

import { useRef, useState } from "react";
import type { SiteSettings } from "@/lib/content";
import { toTel } from "@/lib/phone";
import { validateEnquiry, type EnquiryErrors, type EnquiryInput } from "@/lib/enquiry-validation";
import { Icon } from "./Icon";

type Status = { kind: "success" | "error" | "info"; node: React.ReactNode } | null;
const KEYS = ["name", "email", "phone", "message"] as const;

function mailtoHref(d: EnquiryInput, email: string) {
  const body = [`Name: ${d.name}`, `Company: ${d.company || "-"}`, `Email: ${d.email}`, `Phone: ${d.phone || "-"}`, "", d.message].join("\r\n");
  const subject = `Enquiry from ${d.name}${d.company ? ` (${d.company})` : ""}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function EnquiryForm({ settings }: { settings: SiteSettings }) {
  const [values, setValues] = useState<EnquiryInput & { website: string }>({ name: "", company: "", email: "", phone: "", message: "", website: "" });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const announce = (s: Status) => { setStatus(s); requestAnimationFrame(() => statusRef.current?.focus()); };

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setValues((p) => ({ ...p, [k]: v }));
    if (errors[k as keyof EnquiryErrors]) {
      const { errors: next } = validateEnquiry({ ...values, [k]: v });
      setErrors((p) => ({ ...p, [k]: next[k as keyof EnquiryErrors] }));
    }
  };
  const blur = (k: keyof EnquiryErrors) => () => {
    const { errors: next } = validateEnquiry(values);
    setErrors((p) => ({ ...p, [k]: next[k] }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { data, errors: found } = validateEnquiry(values);
    setErrors(found);
    const firstBad = KEYS.find((k) => found[k]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      announce({ kind: "error", node: "Please fix the highlighted fields and try again." });
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: values.website }),
      });

      if (res.status === 201) {
        announce({ kind: "success", node: <>Thank you, {data.name}. Your enquiry has been received and the AEPL team will get back to you at {data.email}.</> });
        setValues({ name: "", company: "", email: "", phone: "", message: "", website: "" });
        setErrors({});
        return;
      }
      if (res.status === 503) {
        // Server has no database configured: be honest and fall back to the visitor's email app.
        const href = mailtoHref(data, settings.email);
        announce({
          kind: "info",
          node: <>Online enquiries are not switched on yet. Your email app should open with your enquiry filled in. <strong>It has not been sent</strong>: please press send there. If nothing opened, <a href={href}>use this link</a> or email <a href={`mailto:${settings.email}`}>{settings.email}</a>.</>,
        });
        window.location.href = href;
        return;
      }
      if (res.status === 422) {
        const body = await res.json().catch(() => ({}));
        setErrors(body.fields ?? {});
        announce({ kind: "error", node: "Please fix the highlighted fields and try again." });
        return;
      }
      if (res.status === 429) {
        announce({ kind: "error", node: "Too many enquiries from this connection. Please wait a few minutes or call us." });
        return;
      }
      throw new Error(`status ${res.status}`);
    } catch {
      announce({
        kind: "error",
        node: <>Sorry, your enquiry could not be sent. Please try again, or email <a href={`mailto:${settings.email}`}>{settings.email}</a>{settings.phone && <> or call <a href={toTel(settings.phone)}>{settings.phone}</a></>}.</>,
      });
    } finally {
      setBusy(false);
    }
  }

  const field = (k: keyof EnquiryErrors, label: string, opts: { type?: string; autoComplete?: string; required?: boolean; optional?: boolean; full?: boolean; textarea?: boolean }) => {
    const id = `f-${k}`;
    const err = errors[k];
    const common = {
      id, name: k, value: values[k], onChange: set(k), onBlur: blur(k), required: opts.required,
      autoComplete: opts.autoComplete, "aria-invalid": err ? true : undefined, "aria-describedby": `e-${k}`,
    } as const;
    return (
      <div className={`field${opts.full ? " field--full" : ""}`}>
        <label htmlFor={id}>
          {label} {opts.required && <span aria-hidden="true">*</span>}
          {opts.optional && <span className="opt">(optional)</span>}
        </label>
        {opts.textarea ? <textarea rows={4} {...common} /> : <input type={opts.type ?? "text"} {...common} />}
        <p className="field__err" id={`e-${k}`} hidden={!err}>{err}</p>
      </div>
    );
  };

  return (
    <form className="form" ref={formRef} onSubmit={onSubmit} noValidate>
      {field("name", "Name", { autoComplete: "name", required: true })}
      {field("company", "Company", { autoComplete: "organization" })}
      {field("email", "Email", { type: "email", autoComplete: "email", required: true })}
      {field("phone", "Phone", { type: "tel", autoComplete: "tel", optional: true })}
      {field("message", "Requirement / message", { required: true, full: true, textarea: true })}

      {/* honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
        <label>Leave this field empty<input type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} name="website" /></label>
      </div>

      <div className="form__foot field--full">
        <button className="btn btn--primary btn--lg" type="submit" disabled={busy} aria-busy={busy}>
          {busy ? "Sending…" : <>Send enquiry <Icon id="i-arrow-r" /></>}
        </button>
        <p className="form__note">To share a drawing or specification, reply to our confirmation or email it to {settings.email}.</p>
      </div>

      <div ref={statusRef} className={`form__status${status?.kind === "error" ? " is-error" : ""}`} role="status" aria-live="polite" tabIndex={-1}>
        {status?.node}
      </div>
    </form>
  );
}
