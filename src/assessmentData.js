// ─── The 5-dimension skill scan ─────────────────────────────────────────────
// Each dimension has 4 questions, each worth 0-3 points → max 12 pts/dimension.
// Score = (points earned / 12) * 100, bucketed into RISK / WARN / PASS
// (see statusForScore in theme.js — thresholds: <40 RISK, <70 WARN, >=70 PASS).

export const DIMENSIONS = [
  {
    id: 'dsa',
    label: 'DSA Patterns',
    command: '$ scan --module=dsa',
    questions: [
      {
        id: 'dsa_volume',
        prompt: 'Roughly how many DSA problems have you solved (LeetCode / GFG / similar)?',
        options: [
          { label: 'Under 20', points: 0 },
          { label: '20–100', points: 1 },
          { label: '100–300', points: 2 },
          { label: '300+', points: 3 },
        ],
      },
      {
        id: 'dsa_pattern_id',
        prompt: 'Given a new medium-difficulty problem, can you identify the right pattern within 5 minutes?',
        options: [
          { label: 'Rarely', points: 0 },
          { label: 'Sometimes', points: 1 },
          { label: 'Usually', points: 2 },
          { label: 'Almost always', points: 3 },
        ],
      },
      {
        id: 'dsa_debug',
        prompt: "When your solution fails on an edge case, can you debug it yourself without looking up the answer?",
        options: [
          { label: 'Rarely — I look it up', points: 0 },
          { label: 'Sometimes, with time', points: 1 },
          { label: 'Usually', points: 2 },
          { label: 'Almost always', points: 3 },
        ],
      },
      {
        id: 'dsa_coverage',
        prompt: 'How many core patterns have you actually practiced — arrays/strings, hashing, trees, DP, graphs?',
        options: [
          { label: 'Just 1, maybe 2', points: 0 },
          { label: 'About half', points: 1 },
          { label: 'Most of them', points: 2 },
          { label: 'All of them, comfortably', points: 3 },
        ],
      },
    ],
  },
  {
    id: 'coreCS',
    label: 'Core CS Fundamentals',
    command: '$ scan --module=core-cs',
    questions: [
      {
        id: 'corecs_confidence',
        prompt: 'How confident are you explaining OS, DBMS, CN, and OOP basics to an interviewer?',
        options: [
          { label: 'Would freeze on most of it', points: 0 },
          { label: 'Shaky on 2-3 of them', points: 1 },
          { label: 'Solid on most, weak on one', points: 2 },
          { label: 'Confident across all four', points: 3 },
        ],
      },
      {
        id: 'corecs_revision',
        prompt: 'Have you revised your core CS subjects end-to-end at least once this placement season?',
        options: [
          { label: 'Not yet', points: 0 },
          { label: 'Started, not finished', points: 1 },
          { label: 'Once, fully', points: 2 },
          { label: 'More than once', points: 3 },
        ],
      },
      {
        id: 'corecs_depth',
        prompt: 'Can you answer a follow-up like "why use an index" or "explain deadlock" without notes?',
        options: [
          { label: 'No', points: 0 },
          { label: 'On a couple of topics', points: 1 },
          { label: 'On most topics', points: 2 },
          { label: 'On almost any follow-up', points: 3 },
        ],
      },
      {
        id: 'corecs_tradeoffs',
        prompt: 'Can you explain time/space trade-offs between common data structures (array vs. linked list vs. hash map)?',
        options: [
          { label: 'Not really', points: 0 },
          { label: 'Roughly', points: 1 },
          { label: 'Yes, with examples', points: 2 },
          { label: 'Yes, and when each breaks down', points: 3 },
        ],
      },
    ],
  },
  {
    id: 'programming',
    label: 'Programming',
    command: '$ scan --module=programming',
    questions: [
      {
        id: 'prog_languages',
        prompt: 'How many languages are you comfortable writing real, working code in — not just syntax you recognize?',
        options: [
          { label: 'None, honestly', points: 0 },
          { label: 'One, shakily', points: 1 },
          { label: 'One solidly', points: 2 },
          { label: 'Two or more, solidly', points: 3 },
        ],
      },
      {
        id: 'prog_clean_code',
        prompt: 'Can you write a bug-free solution to a medium problem in one sitting, without trial-and-error?',
        options: [
          { label: 'Rarely', points: 0 },
          { label: 'Sometimes', points: 1 },
          { label: 'Usually', points: 2 },
          { label: 'Almost always', points: 3 },
        ],
      },
      {
        id: 'prog_oop',
        prompt: 'Could you design a small class hierarchy for a real problem (e.g. a parking lot system) on a whiteboard?',
        options: [
          { label: 'No idea where to start', points: 0 },
          { label: "I'd need real help", points: 1 },
          { label: 'With some prompting, yes', points: 2 },
          { label: 'Yes, confidently', points: 3 },
        ],
      },
      {
        id: 'prog_scale',
        prompt: 'Have you built and shipped a non-trivial project (500+ lines) mostly on your own?',
        options: [
          { label: 'No', points: 0 },
          { label: 'A small one', points: 1 },
          { label: 'Yes, one', points: 2 },
          { label: 'Yes, more than one', points: 3 },
        ],
      },
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    command: '$ scan --module=communication',
    questions: [
      {
        id: 'comm_explain',
        prompt: 'How comfortable are you explaining your own project to a non-technical interviewer?',
        options: [
          { label: 'I struggle to simplify it', points: 0 },
          { label: 'I can, but ramble', points: 1 },
          { label: 'Fairly clearly', points: 2 },
          { label: 'Clearly and concisely', points: 3 },
        ],
      },
      {
        id: 'comm_practice',
        prompt: 'Have you done a mock interview or been evaluated in a live interview panel before?',
        options: [
          { label: 'Never', points: 0 },
          { label: 'Once', points: 1 },
          { label: 'A few times', points: 2 },
          { label: 'Regularly', points: 3 },
        ],
      },
      {
        id: 'comm_fluency',
        prompt: 'Can you speak in English for 2+ minutes straight, under pressure, without long pauses?',
        options: [
          { label: 'Not really', points: 0 },
          { label: 'With effort', points: 1 },
          { label: 'Mostly yes', points: 2 },
          { label: 'Yes, easily', points: 3 },
        ],
      },
      {
        id: 'comm_pressure',
        prompt: 'When an interviewer pushes back or asks "why not X instead?", how do you usually react?',
        options: [
          { label: 'I freeze or go blank', points: 0 },
          { label: 'I get flustered but recover', points: 1 },
          { label: 'I stay mostly composed', points: 2 },
          { label: 'I engage with it calmly', points: 3 },
        ],
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects & Resume',
    command: '$ scan --module=projects',
    questions: [
      {
        id: 'proj_depth',
        prompt: 'How many of your resume projects can you explain end-to-end, including edge cases and design trade-offs?',
        options: [
          { label: 'None, if pushed', points: 0 },
          { label: 'One, loosely', points: 1 },
          { label: 'One or two, well', points: 2 },
          { label: 'All of them, well', points: 3 },
        ],
      },
      {
        id: 'proj_resume',
        prompt: 'Is your resume tailored with metrics and impact, or fairly generic?',
        options: [
          { label: 'Generic, template-based', points: 0 },
          { label: 'Some tailoring', points: 1 },
          { label: 'Tailored, decent metrics', points: 2 },
          { label: 'Tailored, strong metrics throughout', points: 3 },
        ],
      },
      {
        id: 'proj_shipped',
        prompt: 'Do you have at least one project actually deployed or usable by someone other than you?',
        options: [
          { label: 'No', points: 0 },
          { label: 'Deployed, but nobody uses it', points: 1 },
          { label: 'Yes, a few real users', points: 2 },
          { label: 'Yes, with real usage/feedback', points: 3 },
        ],
      },
      {
        id: 'proj_feedback',
        prompt: 'Has anyone from industry (senior, mentor, alum) reviewed your resume or projects?',
        options: [
          { label: 'No', points: 0 },
          { label: 'Once, briefly', points: 1 },
          { label: 'Yes, one round of feedback', points: 2 },
          { label: 'Yes, multiple rounds', points: 3 },
        ],
      },
    ],
  },
];

export const MAX_POINTS_PER_DIMENSION = 12;

// ─── Plan copy: what to tell someone based on where a dimension lands ──────

export const PLAN_COPY = {
  dsa: {
    RISK: 'Start with just 3 patterns — arrays/strings, hashing, and two-pointers. Solve 5 problems a day on those alone for 2 weeks before touching anything else.',
    WARN: 'You know the basics but pattern recall is slow. Drill the patterns you keep avoiding — trees, DP, graphs — with a 25-minute timer per problem.',
    PASS: 'Keep it sharp with 2-3 mixed problems a week and start timing yourself under real interview conditions instead of untimed practice.',
  },
  coreCS: {
    RISK: 'Pick one subject at a time — start with OS or DBMS — and do a focused 3-day pass with a standard interview-questions list, out loud.',
    WARN: "You've covered the material once but it's not sticking under follow-up questions. Redo a pass focused only on the topics you'd hesitate on.",
    PASS: 'Stay ready with quick daily recall drills — pick one topic each morning and explain it out loud in under 2 minutes.',
  },
  programming: {
    RISK: 'Pick one language and commit to it fully. Rebuild 3-4 of your old DSA solutions in it until the syntax stops slowing you down.',
    WARN: 'Your fundamentals are okay but execution is inconsistent. Practice writing code without an IDE/autocomplete to build real fluency.',
    PASS: "Push further into design — try designing a small system (parking lot, library, elevator) end-to-end on paper.",
  },
  communication: {
    RISK: 'Record yourself explaining one project for 2 minutes, watch it back, and fix one thing at a time — filler words first.',
    WARN: 'Get into at least 2 mock interviews before your next real one — the gap is pressure, not knowledge.',
    PASS: 'Practice handling pushback specifically — ask a friend to challenge your answers mid-explanation.',
  },
  projects: {
    RISK: "Pick your strongest project and rewrite its explanation from scratch — what problem, what you built, what you'd do differently.",
    WARN: 'Add real metrics to your resume bullets (users, latency, % improvement) — even estimated ones beat vague descriptions.',
    PASS: 'Get one more round of resume feedback from someone outside your friend group — a senior or alum, not a classmate.',
  },
};

export function scoreDimension(answers, dimension) {
  const total = dimension.questions.reduce((sum, q) => {
    const picked = answers[q.id];
    if (picked === undefined) return sum;
    return sum + picked;
  }, 0);
  return Math.round((total / MAX_POINTS_PER_DIMENSION) * 100);
}
