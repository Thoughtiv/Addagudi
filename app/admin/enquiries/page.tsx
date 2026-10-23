import type { Metadata } from "next";
import { ConfirmButton } from "@/components/admin/Controls";
import { DbRequired } from "@/components/admin/DbRequired";
import { requireAdmin } from "@/lib/auth";
import { toTel } from "@/lib/phone";
import { connectDb, isDbConfigured } from "@/lib/mongodb";
import { Enquiry } from "@/models/Enquiry";
import { deleteEnquiryAction, setEnquiryStatusAction } from "../actions";

export const metadata: Metadata = { title: "Enquiries" };

const STATUSES = [["new", "New"], ["replied", "Replied"], ["closed", "Closed"]] as const;

export default async function EnquiriesAdmin() {
  await requireAdmin();
  if (!isDbConfigured()) return (<><h1 className="a-h1">Enquiries</h1><DbRequired /></>);
  await connectDb();
  const items = await Enquiry.find().sort({ createdAt: -1 }).limit(200).lean();

  return (
    <>
      <h1 className="a-h1">Enquiries</h1>
      <p className="a-lead">Messages sent through the website&apos;s enquiry form, newest first.</p>
      {items.length === 0 ? (
        <p className="a-empty">No enquiries yet.</p>
      ) : (
        <ul className="a-enquiries">
          {items.map((q) => (
            <li key={String(q._id)} className="a-enquiry">
              <div className="a-enquiry__head">
                <div>
                  <strong>{q.name}</strong>{q.company ? <span> · {q.company}</span> : null}
                  <div className="a-enquiry__meta">
                    <a href={`mailto:${q.email}`}>{q.email}</a>
                    {q.phone ? <> · <a href={toTel(q.phone)}>{q.phone}</a></> : null}
                    {" · "}<time dateTime={q.createdAt!.toISOString()}>{q.createdAt!.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })}</time>
                  </div>
                </div>
                <span className={`a-badge a-badge--${q.status}`}>{STATUSES.find(([v]) => v === q.status)?.[1] ?? q.status}</span>
              </div>
              <p className="a-enquiry__msg">{q.message}</p>
              <div className="a-enquiry__actions">
                {STATUSES.filter(([v]) => v !== q.status).map(([v, label]) => (
                  <form action={setEnquiryStatusAction} key={v}>
                    <input type="hidden" name="id" value={String(q._id)} /><input type="hidden" name="status" value={v} />
                    <button className="a-btn a-btn--ghost a-btn--sm">Mark {label.toLowerCase()}</button>
                  </form>
                ))}
                <form action={deleteEnquiryAction}>
                  <input type="hidden" name="id" value={String(q._id)} />
                  <ConfirmButton className="a-btn a-btn--danger a-btn--sm" message={`Delete the enquiry from ${q.name}?`}>Delete</ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
