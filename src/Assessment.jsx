import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { C, FONTS, FONT_IMPORT_URL, statusForScore, colorForStatus } from './theme';
import { DIMENSIONS, PLAN_COPY, scoreDimension } from './assessmentData';

// Your real WhatsApp Business number, country code first — the code below
// strips any + or spaces automatically, so either format works here.
const FOUNDER_WHATSAPP = '+91 8767451420';

// ─── Small shared bits ──────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const color = colorForStatus(status);
  const bg =
    status === 'PASS' ? 'rgba(79,191,131,0.12)' : status === 'WARN' ? 'rgba(232,163,61,0.12)' : 'rgba(229,72,77,0.12)';
  return (
    <span
      style={{
        color,
        background: bg,
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

function TopBar({ stepIndex, totalSteps }) {
  return (
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
      <Link
        to="/"
        style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '0.9rem', color: C.text, letterSpacing: '-0.01em', textDecoration: 'none' }}
      >
        getcalled.in
      </Link>
      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: C.muted, letterSpacing: '0.05em' }}>
        {stepIndex < totalSteps ? `module ${stepIndex + 1} / ${totalSteps}` : 'results'}
      </span>
    </nav>
  );
}

function ProgressBar({ stepIndex, totalSteps }) {
  const pct = Math.min(100, Math.round(((stepIndex) / totalSteps) * 100));
  return (
    <div style={{ height: '3px', background: C.barBg, width: '100%' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: C.blue, transition: 'width 300ms ease' }} />
    </div>
  );
}

// ─── Question screen (one dimension per screen) ────────────────────────────

function DimensionScreen({ dimension, answers, onAnswer, onNext, onBack, isFirst, isLast }) {
  const allAnswered = dimension.questions.every((q) => answers[q.id] !== undefined);

  return (
    <section style={{ padding: 'clamp(24px, 6vw, 64px) clamp(16px, 5vw, 48px)', maxWidth: '760px', margin: '0 auto' }}>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.62rem, 2.5vw, 0.78rem)', color: C.blue, marginBottom: '12px' }}>
        {dimension.command}
      </div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 4.5vw, 1.9rem)', fontWeight: 700, color: C.text, margin: '0 0 28px', letterSpacing: '-0.02em' }}>
        {dimension.label}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {dimension.questions.map((q, qi) => (
          <div
            key={q.id}
            style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px', padding: 'clamp(14px, 4vw, 20px)' }}
          >
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', color: C.text, lineHeight: 1.6, margin: '0 0 14px' }}>
              <span style={{ color: C.muted, fontFamily: 'var(--font-heading)', fontSize: '0.75rem', marginRight: '8px' }}>
                {String(qi + 1).padStart(2, '0')}
              </span>
              {q.prompt}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {q.options.map((opt) => {
                const selected = answers[q.id] === opt.points;
                return (
                  <button
                    key={opt.label}
                    onClick={() => onAnswer(q.id, opt.points)}
                    style={{
                      textAlign: 'left',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(0.82rem, 2.5vw, 0.88rem)',
                      color: selected ? C.text : C.muted,
                      background: selected ? 'rgba(91,141,239,0.1)' : 'transparent',
                      border: `1px solid ${selected ? C.blue : C.border}`,
                      borderRadius: '6px',
                      padding: '10px 14px',
                      cursor: 'pointer',
                      transition: 'border-color 150ms ease, color 150ms ease, background 150ms ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <span
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        border: `1.5px solid ${selected ? C.blue : C.muted}`,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {selected && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: C.blue, display: 'block' }} />}
                    </span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '32px' }}>
        <button
          onClick={onBack}
          disabled={isFirst}
          style={{
            fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 500,
            background: 'transparent', color: isFirst ? C.border : C.muted,
            border: `1px solid ${C.border}`, borderRadius: '5px', padding: '0 20px', height: '46px',
            cursor: isFirst ? 'default' : 'pointer', letterSpacing: '0.01em',
          }}
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!allAnswered}
          style={{
            fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 500,
            background: allAnswered ? C.blue : C.barBg, color: allAnswered ? C.bg : C.muted,
            border: 'none', borderRadius: '5px', padding: '0 24px', height: '46px',
            cursor: allAnswered ? 'pointer' : 'default', letterSpacing: '0.01em', transition: 'opacity 150ms ease',
          }}
        >
          {isLast ? 'See my results' : 'Next module'}
        </button>
      </div>
    </section>
  );
}

// ─── Results screen ─────────────────────────────────────────────────────────

function ResultRow({ dimension, pct }) {
  const status = statusForScore(pct);
  const color = colorForStatus(status);
  return (
    <div style={{ padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        <StatusBadge status={status} />
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', color: C.text, flex: 1 }}>{dimension.label}</span>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78rem', color, minWidth: '34px', textAlign: 'right' }}>{pct}%</span>
      </div>
      <div style={{ height: '4px', background: C.barBg, borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '2px' }} />
      </div>
    </div>
  );
}

function CaptureForm({ ranked }) {
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [target, setTarget] = useState('');
  const [sent, setSent] = useState(false);

  const buildWhatsAppLink = () => {
    const weakest = ranked.slice(0, 2).map((r) => `${r.dimension.label} (${r.pct}%)`).join(', ');
    const lines = [
      `Hi, I just ran the getcalled skill scan.`,
      name ? `Name: ${name}` : null,
      college ? `College: ${college}` : null,
      target ? `Target companies: ${target}` : null,
      `Weakest areas: ${weakest}`,
      `Can I get my full plan + a free drill session?`,
    ].filter(Boolean);
    return `https://wa.me/${FOUNDER_WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px', padding: 'clamp(16px, 4vw, 24px)' }}>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: C.muted, lineHeight: 1.6, margin: '0 0 18px' }}>
        Get a plan built around these exact gaps, plus one free drill session on your weakest area.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
        {[
          { value: name, set: setName, placeholder: 'Your name' },
          { value: college, set: setCollege, placeholder: 'College' },
          { value: target, set: setTarget, placeholder: 'Target companies (optional)' },
        ].map((field) => (
          <input
            key={field.placeholder}
            value={field.value}
            onChange={(e) => field.set(e.target.value)}
            placeholder={field.placeholder}
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: C.text,
              background: C.bg, border: `1px solid ${C.border}`, borderRadius: '5px',
              padding: '11px 14px', outline: 'none', width: '100%', boxSizing: 'border-box',
            }}
          />
        ))}
      </div>
      <a
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setSent(true)}
        style={{
          display: 'block', width: '100%', boxSizing: 'border-box', textAlign: 'center', textDecoration: 'none',
          fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 500,
          background: name ? C.blue : C.barBg, color: name ? C.bg : C.muted,
          borderRadius: '5px', padding: '13px 16px', letterSpacing: '0.01em',
          pointerEvents: name ? 'auto' : 'none',
        }}
      >
        Send my results on WhatsApp ↗
      </a>
      {sent && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: C.green, textAlign: 'center', margin: '10px 0 0' }}>
          Opening WhatsApp — send the message and we'll get back to you.
        </p>
      )}
    </div>
  );
}

function ResultsScreen({ scores, onRestart }) {
  const ranked = useMemo(
    () => [...scores].sort((a, b) => a.pct - b.pct),
    [scores]
  );
  const weakest = ranked[0];
  const weakestStatus = statusForScore(weakest.pct);

  return (
    <section style={{ padding: 'clamp(24px, 6vw, 64px) clamp(16px, 5vw, 48px)', maxWidth: '760px', margin: '0 auto' }}>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
        Scan complete
      </div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 4.5vw, 1.9rem)', fontWeight: 700, color: C.text, margin: '0 0 24px', letterSpacing: '-0.02em' }}>
        Here's where you actually stand.
      </h1>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', marginBottom: '28px' }}>
        <div style={{ background: '#0F1219', borderBottom: `1px solid ${C.border}`, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.red, display: 'block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.amber, display: 'block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.green, display: 'block' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: C.muted }}>readiness-check.log</span>
        </div>
        <div style={{ padding: 'clamp(14px, 4vw, 20px)' }}>
          {ranked.map((r) => (
            <ResultRow key={r.dimension.id} dimension={r.dimension} pct={r.pct} />
          ))}
        </div>
      </div>

      <div
        style={{
          background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${colorForStatus(weakestStatus)}`,
          borderRadius: '0 6px 6px 0', padding: 'clamp(14px, 4vw, 20px)', marginBottom: '28px',
        }}
      >
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', color: C.muted, letterSpacing: '0.05em', margin: '0 0 8px', textTransform: 'uppercase' }}>
          Priority fix — {weakest.dimension.label}
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: C.text, lineHeight: 1.65, margin: 0 }}>
          {PLAN_COPY[weakest.dimension.id][weakestStatus]}
        </p>
      </div>

      <CaptureForm ranked={ranked} />

      <button
        onClick={onRestart}
        style={{
          fontFamily: 'var(--font-heading)', fontSize: '0.75rem', color: C.muted, background: 'transparent',
          border: 'none', cursor: 'pointer', marginTop: '20px', textDecoration: 'underline', padding: 0,
        }}
      >
        Retake the scan
      </button>
    </section>
  );
}

// ─── Main flow ──────────────────────────────────────────────────────────────

export default function Assessment() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const totalSteps = DIMENSIONS.length;
  const currentDimension = DIMENSIONS[stepIndex];

  const handleAnswer = (questionId, points) => {
    setAnswers((prev) => ({ ...prev, [questionId]: points }));
  };

  const handleNext = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setFinished(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setStepIndex(0);
    setFinished(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scores = useMemo(
    () => DIMENSIONS.map((d) => ({ dimension: d, pct: scoreDimension(answers, d) })),
    [answers]
  );

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', overflowX: 'hidden', ...FONTS }}>
      <style>{`@import url('${FONT_IMPORT_URL}');`}</style>

      <TopBar stepIndex={finished ? totalSteps : stepIndex} totalSteps={totalSteps} />
      <ProgressBar stepIndex={finished ? totalSteps : stepIndex} totalSteps={totalSteps} />

      {finished ? (
        <ResultsScreen scores={scores} onRestart={handleRestart} />
      ) : (
        <DimensionScreen
          dimension={currentDimension}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          isFirst={stepIndex === 0}
          isLast={stepIndex === totalSteps - 1}
        />
      )}
    </div>
  );
}
