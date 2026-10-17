export function Icon({ id, className = "icon" }: { id: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  );
}

/** SVG symbol sprite, rendered once in the root layout. */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="i-arrow-ne" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" /></symbol>
        <symbol id="i-arrow-r" viewBox="0 0 24 24"><path d="M4 12h16m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" /></symbol>
        <symbol id="i-plus" viewBox="0 0 12 12"><path d="M6 0v12M0 6h12" fill="none" stroke="currentColor" strokeWidth="1.2" /></symbol>
        <symbol id="i-plus-circle" viewBox="0 0 28 28"><circle cx="14" cy="14" r="13" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M14 8v12M8 14h12" fill="none" stroke="currentColor" strokeWidth="1.6" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24"><path d="m4 12.5 5 5L20 6.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" /></symbol>
        <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></symbol>
        <symbol id="i-mail" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="m2.5 7 9.5 6.5L21.5 7" fill="none" stroke="currentColor" strokeWidth="1.6" /></symbol>
        <symbol id="i-pin" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" /></symbol>
        <symbol id="i-component" viewBox="0 0 32 32"><path d="M16 3 27 9.5v13L16 29 5 22.5v-13z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="16" cy="16" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M16 3v8m0 10v8M5 9.5l7 4m8 5 7 4M27 9.5l-7 4m-8 5-7 4" fill="none" stroke="currentColor" strokeWidth="1" opacity=".55" /></symbol>
        <symbol id="i-cnc" viewBox="0 0 32 32"><rect x="4" y="3" width="24" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M16 3v11m-3 0h6l-3 7z M8 25h16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></symbol>
        <symbol id="i-assembly" viewBox="0 0 32 32"><path d="M16 3 28 9v14l-12 6L4 23V9zM4 9l12 6 12-6M16 15v14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></symbol>
        <symbol id="i-inspect" viewBox="0 0 32 32"><circle cx="14" cy="14" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="m21 21 8 8M10 14.5l3 3 5.5-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" /></symbol>
        <symbol id="i-doc" viewBox="0 0 24 24"><path d="M6 2h8l5 5v15H6z M14 2v5h5M9 12h7M9 16h7" fill="none" stroke="currentColor" strokeWidth="1.4" /></symbol>
      </defs>
    </svg>
  );
}
