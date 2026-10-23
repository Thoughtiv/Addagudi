"use client";

import { saveSettingsAction } from "@/app/admin/actions";
import type { SiteSettings } from "@/lib/content";
import { FieldError, FormMessage, SubmitButton, useAdminAction } from "./Controls";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const { state, pending, onSubmit } = useAdminAction(saveSettingsAction);
  const e = state?.errors ?? {};
  return (
    <form onSubmit={onSubmit} className="a-form a-form--narrow">
      <div className="a-field">
        <label htmlFor="address">Address</label>
        <textarea id="address" name="address" rows={3} defaultValue={settings.address} required aria-describedby="e-address" aria-invalid={e.address ? true : undefined} />
        <FieldError id="e-address" error={e.address} />
        <p className="a-help">Shown in the website footer and on the Contact page.</p>
      </div>
      <div className="a-row">
        <div className="a-field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="text" defaultValue={settings.phone} aria-describedby="e-phone" aria-invalid={e.phone ? true : undefined} />
          <FieldError id="e-phone" error={e.phone} />
        </div>
        <div className="a-field">
          <label htmlFor="mobile">Mobile</label>
          <input id="mobile" name="mobile" type="text" defaultValue={settings.mobile} aria-describedby="e-mobile" aria-invalid={e.mobile ? true : undefined} />
          <FieldError id="e-mobile" error={e.mobile} />
        </div>
      </div>
      <p className="a-help">Numbers become tap-to-call links. Without a country code, India (+91) is assumed. Leave a number blank to hide it.</p>
      <div className="a-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" defaultValue={settings.email} required aria-describedby="e-email" aria-invalid={e.email ? true : undefined} />
        <FieldError id="e-email" error={e.email} />
        <p className="a-help">Shown on the website and used for the email fall-back on the enquiry form.</p>
      </div>
      <FormMessage state={state} />
      <div className="a-actions"><SubmitButton pending={pending}>Save changes</SubmitButton></div>
    </form>
  );
}
