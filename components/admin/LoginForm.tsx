"use client";

import { loginAction } from "@/app/admin/actions";
import { FormMessage, SubmitButton, useAdminAction } from "./Controls";

export function LoginForm() {
  const { state, pending, onSubmit } = useAdminAction(loginAction);
  return (
    <form onSubmit={onSubmit} className="a-form">
      <div className="a-field">
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" autoComplete="username" required autoFocus />
      </div>
      <div className="a-field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <FormMessage state={state} />
      <SubmitButton pending={pending} pendingLabel="Signing in…">Sign in</SubmitButton>
    </form>
  );
}
