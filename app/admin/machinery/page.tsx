import type { Metadata } from "next";
import Link from "next/link";
import { ConfirmButton } from "@/components/admin/Controls";
import { DbRequired } from "@/components/admin/DbRequired";
import { requireAdmin } from "@/lib/auth";
import { connectDb, isDbConfigured } from "@/lib/mongodb";
import { Machine } from "@/models/Machine";
import { deleteMachineAction, importDefaultMachinesAction, moveMachineAction } from "../actions";

export const metadata: Metadata = { title: "Machinery" };

export default async function MachineryAdmin({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string; imported?: string }> }) {
  await requireAdmin();
  const sp = await searchParams;
  if (!isDbConfigured()) return (<><h1 className="a-h1">Machinery</h1><DbRequired /></>);
  await connectDb();
  const machines = await Machine.find().sort({ order: 1, createdAt: 1 }).lean();

  return (
    <>
      <div className="a-titlebar">
        <h1 className="a-h1">Machinery</h1>
        <Link className="a-btn a-btn--primary" href="/admin/machinery/new">Add machine</Link>
      </div>
      <p className="a-lead">Each machine becomes a card on the website&apos;s Machinery page and a row in the full list. The first five also appear on the home page. Use the arrows to change the order.</p>
      {sp.saved && <div className="a-msg a-msg--ok" role="status">Machine saved.</div>}
      {sp.deleted && <div className="a-msg a-msg--ok" role="status">Machine deleted.</div>}
      {sp.imported && <div className="a-msg a-msg--ok" role="status">The built-in machine list was imported. You can now edit it.</div>}

      {machines.length === 0 ? (
        <div className="a-empty">
          <p>The website is currently showing its built-in machine list. Import it to start editing, or add a machine (the website then shows only the machines you add).</p>
          <form action={importDefaultMachinesAction}>
            <button type="submit" className="a-btn a-btn--primary">Import the current machines</button>
          </form>
        </div>
      ) : (
        <ul className="a-machines">
          {machines.map((m, i) => (
            <li key={String(m._id)} className="a-machine">
              <div className="a-machine__img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {m.image ? <img src={m.image} alt="" /> : <span>No photo</span>}
              </div>
              <div className="a-machine__text">
                <strong>{m.name}</strong>
                <span>{m.model || "—"}</span>
              </div>
              <div className="a-machine__actions">
                <form action={moveMachineAction}>
                  <input type="hidden" name="id" value={String(m._id)} /><input type="hidden" name="dir" value="up" />
                  <button className="a-btn a-btn--ghost a-btn--sm" disabled={i === 0} aria-label={`Move ${m.name} ${m.model} up`}>↑</button>
                </form>
                <form action={moveMachineAction}>
                  <input type="hidden" name="id" value={String(m._id)} /><input type="hidden" name="dir" value="down" />
                  <button className="a-btn a-btn--ghost a-btn--sm" disabled={i === machines.length - 1} aria-label={`Move ${m.name} ${m.model} down`}>↓</button>
                </form>
                <Link className="a-btn a-btn--ghost a-btn--sm" href={`/admin/machinery/${m._id}`}>Edit</Link>
                <form action={deleteMachineAction}>
                  <input type="hidden" name="id" value={String(m._id)} />
                  <ConfirmButton className="a-btn a-btn--danger a-btn--sm" message={`Delete “${m.name}${m.model ? ` — ${m.model}` : ""}”?`}>Delete</ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
