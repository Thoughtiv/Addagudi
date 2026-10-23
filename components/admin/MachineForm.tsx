"use client";

import Link from "next/link";
import { saveMachineAction } from "@/app/admin/actions";
import { FieldError, FormMessage, ImageField, SubmitButton, useAdminAction } from "./Controls";

type Machine = { id: string; name: string; model: string; image: string; alt: string };

export function MachineForm({ machine }: { machine?: Machine }) {
  const { state, pending, onSubmit } = useAdminAction(saveMachineAction);
  const e = state?.errors ?? {};
  return (
    <form onSubmit={onSubmit} className="a-form a-form--narrow">
      {machine && <input type="hidden" name="id" value={machine.id} />}
      <div className="a-row">
        <div className="a-field">
          <label htmlFor="name">Machine name</label>
          <input id="name" name="name" type="text" defaultValue={machine?.name} placeholder="e.g. CNC Lathe Machine" required aria-describedby="e-name" aria-invalid={e.name ? true : undefined} />
          <FieldError id="e-name" error={e.name} />
        </div>
        <div className="a-field">
          <label htmlFor="model">Make / model</label>
          <input id="model" name="model" type="text" defaultValue={machine?.model} placeholder="e.g. YCM TC-15" aria-describedby="e-model" aria-invalid={e.model ? true : undefined} />
          <FieldError id="e-model" error={e.model} />
        </div>
      </div>
      <ImageField name="image" removeName="removeImage" label="Photo" current={machine?.image} error={e.image} />
      <div className="a-field">
        <label htmlFor="alt">Photo description <span className="a-opt">(optional, for accessibility)</span></label>
        <input id="alt" name="alt" type="text" defaultValue={machine?.alt} aria-describedby="e-alt" aria-invalid={e.alt ? true : undefined} />
        <FieldError id="e-alt" error={e.alt} />
      </div>
      <FormMessage state={state} />
      <div className="a-actions">
        <SubmitButton pending={pending}>{machine ? "Save machine" : "Add machine"}</SubmitButton>
        <Link className="a-btn a-btn--ghost" href="/admin/machinery">Cancel</Link>
      </div>
    </form>
  );
}
