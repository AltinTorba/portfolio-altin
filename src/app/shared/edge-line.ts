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

/**
 * 'center' (parazgjedhje): vija qendron vertikalisht në mes të ankorit
 * (p.sh. një titull ose foto) - përdoret për vijat "dalëse" që vazhdojnë
 * nga mesi i lartesisë së ankorit drejt skajit të ekranit.
 * 'bottom': vija vendoset POSHTë ankorit, si nënvizim/ndarës - përdoret kur
 * vija s'duhet të kalojë PËRMES tekstit (do të dukej si vijë-vizatuese mbi
 * tekstin).
 */
export type EdgeLineVerticalAlign = 'center' | 'bottom';

export interface EdgeLineConfig {
  line: HTMLElement | null;
  anchor: HTMLElement | null;
  ancestor: HTMLElement | null;
  direction: EdgeLineDirection;
  gap: number;
  buffer?: number;
  verticalAlign?: EdgeLineVerticalAlign;
  /** Hapësira (px) mes fundit të ankorit dhe vijës, vetëm kur verticalAlign: 'bottom'. */
  verticalGap?: number;
}

const DEFAULT_BUFFER = 100;

export function positionEdgeLine(config: EdgeLineConfig): void {
  const { line, anchor, ancestor, direction, gap } = config;
  const buffer = config.buffer ?? DEFAULT_BUFFER;
  const verticalAlign = config.verticalAlign ?? 'center';
  const verticalGap = config.verticalGap ?? 0;
  if (!line || !anchor || !ancestor) {
    return;
  }
  if (direction === 'left') {
    positionLeftwardLine(line, anchor, ancestor, gap, buffer, verticalAlign, verticalGap);
  } else {
    positionRightwardLine(line, anchor, ancestor, gap, buffer, verticalAlign, verticalGap);
  }
}

function positionLeftwardLine(
  line: HTMLElement,
  anchor: HTMLElement,
  ancestor: HTMLElement,
  gap: number,
  buffer: number,
  verticalAlign: EdgeLineVerticalAlign,
  verticalGap: number
): void {
  const anchorRect = anchor.getBoundingClientRect();
  const ancestorRect = ancestor.getBoundingClientRect();
  const width = anchorRect.left - gap + buffer;
  const leftValue = -buffer - ancestorRect.left;
  line.style.width = `${width}px`;
  line.style.left = `${leftValue}px`;
  line.style.right = '';
  positionLineVertically(line, anchorRect, ancestorRect, verticalAlign, verticalGap);
}

function positionRightwardLine(
  line: HTMLElement,
  anchor: HTMLElement,
  ancestor: HTMLElement,
  gap: number,
  buffer: number,
  verticalAlign: EdgeLineVerticalAlign,
  verticalGap: number
): void {
  const anchorRect = anchor.getBoundingClientRect();
  const ancestorRect = ancestor.getBoundingClientRect();
  const width = window.innerWidth + buffer - (anchorRect.right + gap);
  const rightValue = ancestorRect.right - window.innerWidth - buffer;
  line.style.width = `${width}px`;
  line.style.right = `${rightValue}px`;
  line.style.left = '';
  positionLineVertically(line, anchorRect, ancestorRect, verticalAlign, verticalGap);
}

/**
 * AOS (Animate On Scroll) lëviz elementët me `data-aos` kur "hyjnë" në pamje
 * gjatë scroll-it - duke i zhvendosur PASI `positionEdgeLine` e ka llogaritur
 * tashmë vijën (llogaritja fillestare ndodh në ngAfterViewInit, shumë përpara
 * se useri të arrijë atje me scroll, kur elementi ende s'është animuar në
 * pozicionin final). Kjo përdor `IntersectionObserver` mbi `el` (zakonisht
 * elementi me `data-aos` vetë, p.sh. `.headline`) për ta rithirrur
 * `callback`-un sa herë elementi hyn në pamje, duke i dhënë kohë animacionit
 * AOS (default ~800ms, shih `AOS.init({duration:800})` te app.ts) të
 * përfundojë përpara se të rillogaritet gjeometria e vijës. I domosdoshëm
 * sepse ky version i AOS-it s'hedh evente `aos:in`/`aos:out` (ekzistojnë
 * vetëm në versione të tjera të librarëisë). Kthen një funksion për ta
 * ndalur vëzhgimin (thirre te ngOnDestroy).
 */
export function observeAosReveal(el: Element | null, callback: () => void): () => void {
  if (!el || typeof IntersectionObserver === 'undefined') {
    return () => {};
  }
  const pendingTimeouts: ReturnType<typeof setTimeout>[] = [];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        continue;
      }
      for (const delay of [0, 150, 900]) {
        pendingTimeouts.push(setTimeout(callback, delay));
      }
    }
  });
  observer.observe(el);
  return () => {
    observer.disconnect();
    pendingTimeouts.forEach((id) => clearTimeout(id));
  };
}

/**
 * Pozicionon vijen vertikalisht - ose e qendron ne mes te ankorit (p.sh. nje
 * foto), ne vend te "static position" te flexbox-it, e cila funksionon vetem
 * kur linja dhe ankori ndajne te njejtin "row" me align-items:center - jo me
 * ne layout "column" (p.sh. mobile, kur elementet stivosen vertikalisht) -
 * ose e vendos poshte ankorit (nenvizim), sipas `verticalAlign`.
 */
function positionLineVertically(
  line: HTMLElement,
  anchorRect: DOMRect,
  ancestorRect: DOMRect,
  verticalAlign: EdgeLineVerticalAlign,
  verticalGap: number
): void {
  if (verticalAlign === 'bottom') {
    const topValue = anchorRect.bottom - ancestorRect.top + verticalGap;
    line.style.top = `${topValue}px`;
    line.style.bottom = '';
    return;
  }
  const lineHeight = line.getBoundingClientRect().height;
  const anchorCenterY = anchorRect.top + anchorRect.height / 2;
  const topValue = anchorCenterY - ancestorRect.top - lineHeight / 2;
  line.style.top = `${topValue}px`;
  line.style.bottom = '';
}
