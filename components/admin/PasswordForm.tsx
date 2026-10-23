"use client";

import { changePasswordAction } from "@/app/admin/actions";
import { FieldError, FormMessage, SubmitButton, useAdminAction } from "./Controls";

export function PasswordForm() {
  const { state, pending, onSubmit } = useAdminAction(changePasswordAction);
  const e = state?.errors ?? {};
  return (
    <form onSubmit={onSubmit} className="a-form a-form--narrow">
      <div className="a-field">
        <label htmlFor="current">Current password</label>
        <input id="current" name="current" type="password" autoComplete="current-password" required aria-describedby="e-current" aria-invalid={e.current ? true : undefined} />
        <FieldError id="e-current" error={e.current} />
      </div>
      <div className="a-field">
        <label htmlFor="next">New password</label>
        <input id="next" name="next" type="password" autoComplete="new-password" required minLength={10} aria-describedby="e-next" aria-invalid={e.next ? true : undefined} />
        <FieldError id="e-next" error={e.next} />
        <p className="a-help">At least 10 characters. You will be signed out and asked to sign in again.</p>
      </div>
      <div className="a-field">
        <label htmlFor="confirm">Confirm new password</label>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" required aria-describedby="e-confirm" aria-invalid={e.confirm ? true : undefined} />
        <FieldError id="e-confirm" error={e.confirm} />
      </div>
      <FormMessage state={state} />
      <div className="a-actions"><SubmitButton pending={pending}>Change password</SubmitButton></div>
    </form>
  );
}
