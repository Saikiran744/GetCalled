import { useEffect, useRef, useState } from 'react';

// ─── Content (mirrors virtual:content home data) ───────────────────────────

const home = {
  nav: {
    wordmark: 'getcalled.in',
    badge: 'pre-launch',
  },
  
  hero: {
    eyebrow: '$ placement-prep --mode=personalized',
    headline: 'Stop preparing for placements',
    headlineAccent: 'like someone else.',
    subhead:
      "GetCalled runs a 5-part diagnostic on your actual skill gaps — DSA, Core CS, Programming, Communication, Projects — before it builds your prep plan. Not the same 30-day PDF already circulating in your batch's WhatsApp group.",
    ctaPrimary: 'Join the waitlist',
    ctaSecondary: 'See how it works',
    terminalCmd: '$ getcalled scan --profile=fresher',
    terminalNote:
      'Most candidates stall right here — 3 of 5 checks failing, no idea which one to fix first.',
  },
  pipeline: {
    eyebrow: 'Pipeline',
    heading: 'How it runs',
  },
  founderNote: {
    eyebrow: '// commit message',
    heading: "Why I'm building this",
    quote:
      "I'm building GetCalled while going through my own placement prep — TCS Digital, and the rest of the season — because I couldn't find a tool that actually adapted to where I stood. Every prep resource treated me like every other candidate. So I'm building the one I needed, in public, one prep session at a time.",
    signature: '— Saikiran, Founder, GetCalled · Sipna College of Engineering, Amravati',
  },
  waitlist: {
    heading: 'Join the waitlist',
  },
  footer: {
    left: 'getcalled.in — currently in build. no purchase necessary.',
    right: 'status: pre-launch',
  },
};

// ─── Data ───────────────────────────────────────────────────────────────────

const SCAN_ROWS = [
  { status: 'PASS', label: 'DSA Patterns', pct: 82, delay: 200 },
  { status: 'WARN', label: 'Core CS Fundamentals', pct: 34, delay: 350 },
  { status: 'WARN', label: 'Communication', pct: 21, delay: 500 },
  { status: 'PASS', label: 'Projects & Resume', pct: 71, delay: 650 },
  { status: 'WARN', label: 'Company-specific Rounds', pct: 6, delay: 800 },
];

const PIPELINE_STEPS = [
  {
    cmd: '$ getcalled init',
    desc: 'Take the 5-part skill scan — ten minutes, tells you exactly where you stand.',
  },
  {
    cmd: '$ getcalled plan',
    desc: 'Get a plan built around your real gaps — not a generic roadmap everyone else has.',
  },
  {
    cmd: '$ getcalled drill',
    desc: 'Practice the exact rounds your target companies run — TCS Digital, Infosys, Wipro, more.',
  },
  {
    cmd: '$ getcalled ship',
    desc: "Walk in ready. No more guessing what the interviewer's about to ask.",
  },
];

// ─── Colours (exact spec) ───────────────────────────────────────────────────

const C = {
  bg: '#0B0D12',
  surface: '#13161F',
  border: '#242938',
  barBg: '#20242F',
  text: '#E7E9EE',
  muted: '#7C8493',
  blue: '#5B8DEF',
  amber: '#E8A33D',
  green: '#4FBF83',
  red: '#E5484D',
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const color = status === 'PASS' ? C.green : C.amber;
  return (
    <span
      style={{
        color,
        background: status === 'PASS' ? 'rgba(79,191,131,0.12)' : 'rgba(232,163,61,0.12)',
        fontFamily: 'var(--font-heading)',
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        padding: '2px 7px',
        borderRadius: '3px',
        flexShrink: 0,
        display: 'inline-block',
        minWidth: '42px',
        textAlign: 'center',
      }}
    >
      {status}
    </span>
  );
}

function ScanRowItem({ row, animate }) {
  const color = row.status === 'PASS' ? C.green : C.amber;

  return (
    <div
      className={animate ? 'scan-row-animate' : ''}
      style={{
        animationDelay: animate ? `${row.delay}ms` : undefined,
        padding: '8px 0',
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      {/* Mobile layout */}
      <div className="flex flex-col gap-1.5 sm:hidden">
        <div className="flex items-center gap-2">
          <StatusBadge status={row.status} />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', color: C.text }}>
            {row.label}
          </span>
        </div>
        <div className="flex items-center gap-2 pl-1">
          <div style={{ flex: 1, height: '4px', background: C.barBg, borderRadius: '2px', overflow: 'hidden' }}>
            <div
              className={animate ? 'bar-fill' : ''}
              style={{
                '--bar-width': `${row.pct}%`,
                height: '100%',
                background: color,
                borderRadius: '2px',
                width: animate ? undefined : `${row.pct}%`,
                animationDelay: animate ? `${row.delay + 100}ms` : undefined,
              }}
            />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color, minWidth: '30px', textAlign: 'right' }}>
            {row.pct}%
          </span>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:flex items-center gap-3">
        <StatusBadge status={row.status} />
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78rem', color: C.text, flex: '0 0 180px', minWidth: 0 }}>
          {row.label}
        </span>
        <div style={{ flex: 1, height: '4px', background: C.barBg, borderRadius: '2px', overflow: 'hidden' }}>
          <div
            className={animate ? 'bar-fill' : ''}
            style={{
              '--bar-width': `${row.pct}%`,
              height: '100%',
              background: color,
              borderRadius: '2px',
              width: animate ? undefined : `${row.pct}%`,
              animationDelay: animate ? `${row.delay + 100}ms` : undefined,
            }}
          />
        </div>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', color, minWidth: '34px', textAlign: 'right' }}>
          {row.pct}%
        </span>
      </div>
    </div>
  );
}

function TerminalPanel({ animate }) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: '8px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          background: '#0F1219',
          borderBottom: `1px solid ${C.border}`,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.red, display: 'block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.amber, display: 'block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.green, display: 'block' }} />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.7rem',
            color: C.muted,
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderBottom: 'none',
            padding: '3px 10px',
            borderRadius: '4px 4px 0 0',
          }}
        >
          readiness-check.log
        </span>
      </div>

      <div style={{ padding: 'clamp(12px, 4vw, 20px) clamp(12px, 4vw, 20px) clamp(14px, 4vw, 20px)' }}>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(0.68rem, 2.5vw, 0.78rem)',
            color: C.muted,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            overflow: 'hidden',
            minWidth: 0,
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>
            {home.hero.terminalCmd}
          </span>
          <span className="cursor-blink" style={{ color: C.blue, flexShrink: 0 }}>▋</span>
        </div>

        <div>
          {SCAN_ROWS.map((row) => (
            <ScanRowItem key={row.label} row={row} animate={animate} />
          ))}
        </div>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            color: C.muted,
            fontStyle: 'italic',
            marginTop: '14px',
            lineHeight: 1.5,
          }}
        >
          {home.hero.terminalNote}
        </p>
      </div>
    </div>
  );
}

function PipelineCard({ step }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.surface,
        border: `1px solid ${hovered ? C.blue : C.border}`,
        borderRadius: '6px',
        padding: 'clamp(14px, 4vw, 20px)',
        transition: 'border-color 150ms ease',
        cursor: 'default',
      }}
    >
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', color: C.blue, marginBottom: '10px', fontWeight: 500 }}>
        {step.cmd}
      </div>
      <div style={{ width: '20px', height: '1px', background: C.border, marginBottom: '10px' }} />
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: C.muted, lineHeight: 1.6, margin: 0 }}>
        {step.desc}
      </p>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function HomePage() {
  const [panelVisible, setPanelVisible] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPanelVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', overflowX: 'hidden', '--font-heading': "'JetBrains Mono', ui-monospace, monospace", '--font-sans': "'Inter', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

        @keyframes cursorBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .cursor-blink { animation: cursorBlink 1s steps(1) infinite; }

        @keyframes barFillAnim { from { width: 0; } to { width: var(--bar-width); } }
        .bar-fill { width: 0; animation: barFillAnim 700ms ease forwards; }

        @keyframes scanRowIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .scan-row-animate { opacity: 0; animation: scanRowIn 400ms ease forwards; }

        @keyframes pulseAmber { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .animate-pulse-amber { animation: pulseAmber 2s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .cursor-blink, .bar-fill, .scan-row-animate, .animate-pulse-amber {
            animation: none !important;
            opacity: 1 !important;
            width: var(--bar-width, 100%) !important;
          }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav
        aria-label="Main navigation"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: C.bg,
          borderBottom: `1px solid ${C.border}`,
          padding: '0 clamp(16px, 5vw, 48px)',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '0.9rem', color: C.text, letterSpacing: '-0.01em' }}>
          {home.nav.wordmark}
        </span>
        {home.nav.badge && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', background: 'rgba(232,163,61,0.08)', border: '1px solid rgba(232,163,61,0.2)', borderRadius: '999px', padding: '4px 12px' }}>
            <span className="animate-pulse-amber" style={{ width: '7px', height: '7px', borderRadius: '50%', background: C.amber, display: 'block', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: C.muted, letterSpacing: '0.06em' }}>{home.nav.badge}</span>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: 'clamp(36px, 8vw, 96px) clamp(16px, 5vw, 48px) clamp(32px, 6vw, 80px)', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.62rem, 2.5vw, 0.82rem)', color: C.blue, marginBottom: '20px', letterSpacing: '0.02em', overflowWrap: 'break-word', wordBreak: 'break-all' }}>
          {home.hero.eyebrow}
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.45rem, 5.5vw, 2.75rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.text, margin: '0 0 16px', maxWidth: '780px', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          <span>{home.hero.headline}</span>{' '}
          <span style={{ color: C.blue }}>{home.hero.headlineAccent}</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.875rem, 2.5vw, 1.05rem)', color: C.muted, lineHeight: 1.7, maxWidth: '620px', margin: '0 0 28px' }}>
          {home.hero.subhead}
        </p>
        <div style={{ marginBottom: 'clamp(32px, 6vw, 64px)' }}>
          <div className="flex flex-col gap-3 sm:flex-row" style={{ maxWidth: '360px' }}>
            <a
              href="https://form.jotform.com/262063645785061"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 500, background: C.blue, color: C.bg, border: 'none', borderRadius: '5px', padding: '0 20px', height: '46px', cursor: 'pointer', letterSpacing: '0.01em', transition: 'opacity 150ms ease', width: '100%', flexShrink: 0, touchAction: 'manipulation', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', boxSizing: 'border-box' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {home.hero.ctaPrimary}
            </a>
            <button
              onClick={() => scrollTo('how-it-runs')}
              style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 500, background: 'transparent', color: C.muted, border: `1px solid ${C.border}`, borderRadius: '5px', padding: '0 20px', height: '46px', cursor: 'pointer', letterSpacing: '0.01em', transition: 'border-color 150ms ease, color 150ms ease', width: '100%', flexShrink: 0, touchAction: 'manipulation' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
            >
              {home.hero.ctaSecondary}
            </button>
          </div>
        </div>
        <div ref={panelRef} style={{ maxWidth: '680px', width: '100%' }}>
          <TerminalPanel animate={panelVisible} />
        </div>
      </section>

      {/* ── HOW IT RUNS ── */}
      <section id="how-it-runs" style={{ padding: 'clamp(32px, 6vw, 80px) clamp(16px, 5vw, 48px)', maxWidth: '1100px', margin: '0 auto', borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
          {home.pipeline.eyebrow}
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem, 4vw, 1.75rem)', fontWeight: 700, color: C.text, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
          {home.pipeline.heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PIPELINE_STEPS.map((step) => (
            <PipelineCard key={step.cmd} step={step} />
          ))}
        </div>
      </section>

      {/* ── FOUNDER NOTE ── */}
      <section style={{ padding: 'clamp(32px, 6vw, 80px) clamp(16px, 5vw, 48px)', maxWidth: '1100px', margin: '0 auto', borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: C.muted, letterSpacing: '0.02em', marginBottom: '8px' }}>
          {home.founderNote.eyebrow}
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem, 4vw, 1.75rem)', fontWeight: 700, color: C.text, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
          {home.founderNote.heading}
        </h2>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.blue}`, borderRadius: '0 6px 6px 0', padding: 'clamp(16px, 4vw, 28px)', maxWidth: '720px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', color: C.text, lineHeight: 1.75, margin: '0 0 16px' }}>
            {home.founderNote.quote}
          </p>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', color: C.muted, margin: 0, wordBreak: 'break-word' }}>
            {home.founderNote.signature}
          </p>
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" style={{ padding: 'clamp(32px, 6vw, 80px) clamp(16px, 5vw, 48px)', maxWidth: '1100px', margin: '0 auto', borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: C.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px', textAlign: 'center' }}>
          Early Access
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 4.5vw, 2.25rem)', fontWeight: 700, color: C.text, margin: '0 0 24px', letterSpacing: '-0.02em', textAlign: 'center' }}>
          {home.waitlist.heading}
        </h2>
        <div style={{ maxWidth: '480px', width: '100%', margin: '0 auto', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ borderBottom: `1px solid ${C.border}`, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78rem', color: C.blue, flexShrink: 0 }}>&gt;_</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.7rem, 2.5vw, 0.78rem)', color: C.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              getcalled --join-waitlist
            </span>
          </div>
          <div style={{ padding: 'clamp(16px, 5vw, 24px)' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)', color: C.muted, lineHeight: 1.65, margin: '0 0 20px' }}>
              Leave your name, email, and college. First cohort gets access before anyone else — no spam, no daily emails.
            </p>
            <a
              href="https://form.jotform.com/262063645785061"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', boxSizing: 'border-box', background: C.blue, color: C.bg, fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.82rem, 2.5vw, 0.875rem)', fontWeight: 500, textAlign: 'center', textDecoration: 'none', borderRadius: '5px', padding: '13px 16px', letterSpacing: '0.01em', transition: 'opacity 150ms ease', cursor: 'pointer', touchAction: 'manipulation' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Open application form ↗
            </a>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: C.muted, textAlign: 'center', margin: '10px 0 0' }}>
              Takes about 45 seconds.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: 'clamp(16px, 4vw, 28px) clamp(16px, 5vw, 48px)' }}>
        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.65rem, 2vw, 0.72rem)', color: C.muted }}>{home.footer.left}</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.65rem, 2vw, 0.72rem)', color: C.muted }}>{home.footer.right}</span>
        </div>
      </footer>
    </div>
  );
}
