/**
 * Pozicionon një vijë dekorative `position:absolute` që duhet të "dalë"
 * drejt skajit të ekranit (majtas ose djathtas), duke ruajtur hapësirë
 * KONSTANTE nga elementi ngjitur (h1/h2/icons), pavarësisht gjerësisë së
 * ekranit - në vend të formulave fikse `left`/`right` që japin hapësirë
 * jokonstante sipas zoom-it. `ancestor` duhet të jetë prindi
 * position:relative/absolute nga i cili llogariten `left`/`right` e
 * `line`-it (zakonisht `.headline`).
 *
 * `buffer`: sa px përtej skajit real të ekranit duhet të shkojë vija, që
 * të mos duket kurrë ndonjë hendek nga rrumbullakimi i pixel-ave. Mbahet
 * i vogël (jo `innerWidth`) qëllimisht - një `width` shumë i madh (mbi
 * ~4096px) kalon limitin e "tile"-ve të kompozimit GPU të Chromium-it dhe
 * shkakton një artefakt vizual ("trashësi") pikërisht mbi ekranet shumë të
 * gjera (konfirmuar mbi ~3280px).
 */
export type EdgeLineDirection = 'left' | 'right';

export interface EdgeLineConfig {
  line: HTMLElement | null;
  anchor: HTMLElement | null;
  ancestor: HTMLElement | null;
  direction: EdgeLineDirection;
  gap: number;
  buffer?: number;
}

const DEFAULT_BUFFER = 100;

export function positionEdgeLine(config: EdgeLineConfig): void {
  const { line, anchor, ancestor, direction, gap } = config;
  const buffer = config.buffer ?? DEFAULT_BUFFER;
  if (!line || !anchor || !ancestor) {
    return;
  }
  if (direction === 'left') {
    positionLeftwardLine(line, anchor, ancestor, gap, buffer);
  } else {
    positionRightwardLine(line, anchor, ancestor, gap, buffer);
  }
}

function positionLeftwardLine(
  line: HTMLElement,
  anchor: HTMLElement,
  ancestor: HTMLElement,
  gap: number,
  buffer: number
): void {
  const anchorRect = anchor.getBoundingClientRect();
  const ancestorRect = ancestor.getBoundingClientRect();
  const width = anchorRect.left - gap + buffer;
  const leftValue = -buffer - ancestorRect.left;
  line.style.width = `${width}px`;
  line.style.left = `${leftValue}px`;
  line.style.right = '';
}

function positionRightwardLine(
  line: HTMLElement,
  anchor: HTMLElement,
  ancestor: HTMLElement,
  gap: number,
  buffer: number
): void {
  const anchorRect = anchor.getBoundingClientRect();
  const ancestorRect = ancestor.getBoundingClientRect();
  const width = window.innerWidth + buffer - (anchorRect.right + gap);
  const rightValue = ancestorRect.right - window.innerWidth - buffer;
  line.style.width = `${width}px`;
  line.style.right = `${rightValue}px`;
  line.style.left = '';
}
