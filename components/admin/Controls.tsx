"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import type { ActionState } from "@/app/admin/actions";

/**
 * Runs a server action from a form without React 19's automatic field reset, so a failed
 * validation never wipes what the admin typed.
 */
export function useAdminAction(action: (prev: ActionState, fd: FormData) => Promise<ActionState>) {
  const [state, dispatch, pending] = useActionState<ActionState, FormData>(action, null);
  const [, startTransition] = useTransition();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => dispatch(fd));
  };
  return { state, pending, onSubmit };
}

export function SubmitButton({ children, pending, pendingLabel = "Saving…", className = "a-btn a-btn--primary" }: { children: React.ReactNode; pending: boolean; pendingLabel?: string; className?: string }) {
  return (
    <button type="submit" className={className} disabled={pending} aria-busy={pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}

export function FormMessage({ state }: { state: ActionState }) {
  if (!state?.message) return <div role="status" aria-live="polite" />;
  return (
    <div role="status" aria-live="polite" className={`a-msg ${state.ok ? "a-msg--ok" : "a-msg--err"}`}>
      {state.message}
    </div>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  return <p className="a-err" id={id} hidden={!error}>{error}</p>;
}

/** Delete button that asks for confirmation before the surrounding form is submitted. */
export function ConfirmButton({ children, message, className = "a-btn a-btn--danger" }: { children: React.ReactNode; message: string; className?: string }) {
  return (
    <button type="submit" className={className} onClick={(e) => { if (!window.confirm(message)) e.preventDefault(); }}>
      {children}
    </button>
  );
}

const MAX_BYTES = 8 * 1024 * 1024;

/**
 * Photo upload field: shows the current image, previews a newly chosen file, and offers
 * "remove". The actual file travels with the form to the server action.
 */
export function ImageField({
  name, removeName, label, current, error, hint,
}: { name: string; removeName: string; label: string; current?: string; error?: string; hint?: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [localError, setLocalError] = useState("");
  const [remove, setRemove] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setLocalError("");
    if (!f) { setPreview(null); return; }
    if (!f.type.startsWith("image/")) { setLocalError("Please choose an image file."); e.target.value = ""; setPreview(null); return; }
    if (f.size > MAX_BYTES) { setLocalError("That image is larger than 8 MB. Please choose a smaller one."); e.target.value = ""; setPreview(null); return; }
    setRemove(false);
    setPreview(URL.createObjectURL(f));
  }

  const shown = preview ?? (!remove && current ? current : null);
  const msg = localError || error;

  return (
    <div className="a-field">
      <label htmlFor={`${name}-input`}>{label}</label>
      <div className="a-image">
        <div className="a-image__preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {shown ? <img src={shown} alt="" /> : <span>No photo</span>}
        </div>
        <div className="a-image__controls">
          <input ref={input} id={`${name}-input`} name={name} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={onChange} aria-describedby={`${name}-help`} />
          <p className="a-help" id={`${name}-help`}>{hint ?? "JPG, PNG or WebP, up to 8 MB. It is resized automatically."}</p>
          {current && !preview && (
            <label className="a-check">
              <input type="checkbox" name={removeName} checked={remove} onChange={(e) => setRemove(e.target.checked)} /> Remove current photo
            </label>
          )}
          {msg && <p className="a-err" role="alert">{msg}</p>}
        </div>
      </div>
    </div>
  );
}
