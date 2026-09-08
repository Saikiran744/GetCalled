import { C, statusForScore, colorForStatus } from './theme';

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const FONT = (weight, size) => `${weight} ${size}px "JetBrains Mono", ui-monospace, monospace`;

// Renders the personalized readiness-check.log card as a PNG blob, sized
// square (1080x1080) so it survives WhatsApp/LinkedIn/Instagram feed crops.
export async function buildScoreCardBlob(ranked) {
  try {
    await document.fonts.load(FONT(700, 34));
    await document.fonts.load(FONT(400, 18));
    await document.fonts.ready;
  } catch {
    // font API unavailable/unsupported — canvas will fall back to a default monospace
  }

  const W = 1080;
  const H = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = C.blue;
  ctx.fillRect(0, 0, 7, H);

  const padX = 64;
  ctx.textBaseline = 'top';

  ctx.fillStyle = C.text;
  ctx.font = FONT(700, 32);
  ctx.fillText('getcalled.in', padX, 56);

  ctx.fillStyle = C.muted;
  ctx.font = FONT(400, 17);
  ctx.fillText('$ scan --result=complete', padX, 98);

  ctx.fillStyle = C.text;
  ctx.font = FONT(700, 38);
  ctx.fillText('My placement readiness scan', padX, 152);

  const overall = Math.round(ranked.reduce((s, r) => s + r.pct, 0) / ranked.length);
  ctx.fillStyle = C.blue;
  ctx.font = FONT(700, 110);
  ctx.fillText(`${overall}%`, padX, 220);
  ctx.fillStyle = C.muted;
  ctx.font = FONT(400, 19);
  ctx.fillText('overall readiness', padX, 350);

  const cardX0 = padX;
  const cardX1 = W - padX;
  const cardY0 = 410;
  const rowH = 76;
  const cardH = 56 + ranked.length * rowH + 16;

  ctx.strokeStyle = C.border;
  ctx.fillStyle = C.surface;
  ctx.lineWidth = 2;
  roundRect(ctx, cardX0, cardY0, cardX1 - cardX0, cardH, 12);
  ctx.fill();
  ctx.stroke();

  // title bar
  ctx.fillStyle = '#0F1219';
  roundRect(ctx, cardX0, cardY0, cardX1 - cardX0, 48, 12);
  ctx.fill();
  ctx.fillRect(cardX0, cardY0 + 34, cardX1 - cardX0, 14);

  const dotColors = [C.red, C.amber, C.green];
  dotColors.forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(cardX0 + 30 + i * 24, cardY0 + 24, 6, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = C.muted;
  ctx.font = FONT(400, 17);
  ctx.fillText('readiness-check.log', cardX0 + 108, cardY0 + 16);

  let ry = cardY0 + 70;
  ranked.forEach((r) => {
    const status = statusForScore(r.pct);
    const color = colorForStatus(status);

    ctx.fillStyle = C.text;
    ctx.font = FONT(500, 24);
    ctx.fillText(r.dimension.label, cardX0 + 28, ry + 6);

    const badgeText = `${status} ${r.pct}%`;
    ctx.font = FONT(700, 18);
    const badgeW = ctx.measureText(badgeText).width + 28;
    const bx1 = cardX1 - 28;
    ctx.fillStyle = '#0F1219';
    roundRect(ctx, bx1 - badgeW, ry - 2, badgeW, 36, 6);
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    roundRect(ctx, bx1 - badgeW, ry - 2, badgeW, 36, 6);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fillText(badgeText, bx1 - badgeW + 14, ry + 6);

    ry += rowH;
  });

  ctx.fillStyle = C.muted;
  ctx.font = FONT(400, 19);
  ctx.fillText('Know where you stand \u2014 free 10-min scan at getcalled.in', padX, H - 60);

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.95));
}
