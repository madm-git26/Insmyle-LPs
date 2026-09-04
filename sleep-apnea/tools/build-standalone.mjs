/**
 * Standalone build — emits the landing page as a single self-contained HTML
 * file with no build step, no framework and no external assets beyond the
 * Google Fonts stylesheet.
 *
 * It imports the SAME copy, practice and icon modules as the React app, so the
 * two builds cannot drift. Two flavours are written:
 *
 *   dist-standalone/sleep-apnea-landing-page.html   full document, paste-ready
 *   dist-standalone/artifact.html                   body-only, for publishing
 *
 * Run: npm run build:standalone
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as C from '../src/content/copy.js';
import { practice, fill } from '../src/content/practice.js';
import { ICON_PATHS } from '../src/content/icons.js';
import { adGroups } from '../src/content/adGroups.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ---------- helpers ---------- */
const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const t = (s = '') => esc(fill(String(s)));            // token-filled + escaped
const list = (arr, fn) => arr.map(fn).join('\n');

function icon(name, { size = 24, strokeWidth = 1.5, filled = false, className = '', title } = {}) {
  const d = ICON_PATHS[name];
  if (!d) return '';
  return `<svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24"
    fill="${filled ? 'currentColor' : 'none'}" stroke="${filled ? 'none' : 'currentColor'}"
    stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"
    ${title ? `role="img"><title>${esc(title)}</title>` : 'aria-hidden="true" focusable="false">'}${d}</svg>`;
}

/** Inline every placeholder image as a data: URI so the file stands alone. */
const IMAGES = {};
for (const file of readdirSync(join(root, 'public/images'))) {
  const svg = readFileSync(join(root, 'public/images', file), 'utf8');
  IMAGES[`/images/${file}`] = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

const MIME = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', avif: 'image/avif', svg: 'image/svg+xml' };

/**
 * Real photography wins whenever it exists.
 *
 * Drop a photo into public/images with the name the copy expects
 * (hero-restful-sleep.jpg, tired-morning.jpg, …) and it is inlined as a data
 * URI here, so the single file carries the actual image. Until then the file
 * points at the production path and falls back to the inlined placeholder, so
 * it never shows a broken image and never needs a code change to swap.
 */
function img(image, { className = '', priority = false, extra = '' } = {}) {
  const realPath = join(root, 'public', image.src.replace(/^\//, ''));
  const ext = image.src.split('.').pop().toLowerCase();

  if (existsSync(realPath)) {
    const data = `data:${MIME[ext] || 'image/jpeg'};base64,${readFileSync(realPath).toString('base64')}`;
    return `<img class="${className}" src="${data}" alt="${t(image.alt)}"
      ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" ${extra}>`;
  }

  const fallback = IMAGES[image.placeholder] || '';
  return `<img class="${className}" src="${esc(image.src)}" alt="${t(image.alt)}"
    ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"
    data-fallback="${fallback}" onerror="this.onerror=null;this.src=this.dataset.fallback" ${extra}>`;
}

const reveal = (variant = 'fade-up', delay = 0) =>
  `class="reveal reveal--${variant}"${delay ? ` style="--reveal-delay:${delay}ms"` : ''}`;

/** Primary CTA — opens the booking dialog. Secondary — dials. */
const btnBook = (label, location, variant = 'primary', cls = '') =>
  `<button type="button" class="btn btn--${variant} ${cls}" data-book="${location}">${t(label)}</button>`;
const btnCall = (label, location, variant = 'secondary', cls = '') =>
  `<a class="btn btn--${variant} ${cls}" href="${practice.phone.href}" data-call="${location}">
     ${icon('phone', { size: 18 })}<span>${t(label)}</span></a>`;

/* ---------- sections ---------- */

const header = () => `
<header class="header" id="site-header">
  <div class="container header__bar">
    ${logo()}
    <nav class="header__nav" aria-label="Primary">
      ${list(C.nav.links, (l) => `<a href="${l.href}">${esc(l.label)}</a>`)}
    </nav>
    <div class="header__actions">
      <a class="header__phone" href="${practice.phone.href}" data-call="header">
        ${icon('phone', { size: 18 })}${esc(practice.phone.display)}
      </a>
      ${btnBook(C.nav.cta, 'header', 'primary', 'btn--sm')}
    </div>
    <button type="button" class="header__burger" aria-expanded="false" aria-controls="mobile-menu" data-menu-open>
      ${icon('menu', { size: 22, title: 'Open menu' })}
    </button>
  </div>
</header>

<div class="mobile-menu" id="mobile-menu" hidden>
  <div class="mobile-menu__head">${logo()}
    <button type="button" class="modal__close" data-menu-close>${icon('close', { size: 18, title: 'Close menu' })}</button>
  </div>
  <nav class="mobile-menu__nav" aria-label="Mobile">
    ${list(C.nav.links, (l) => `<a href="${l.href}" data-menu-close>${esc(l.label)}</a>`)}
  </nav>
  <div class="mobile-menu__actions">
    ${btnBook(C.nav.cta, 'mobile_menu', 'primary', 'btn--block')}
    ${btnCall(practice.phone.display, 'mobile_menu', 'secondary', 'btn--block')}
  </div>
</div>`;

function logo(invert = false) {
  return `<a class="logo${invert ? ' logo--invert' : ''}" href="#top" aria-label="${esc(practice.name)} — home">
    <svg class="logo__mark" width="40" height="30" viewBox="0 0 40 30" fill="none" aria-hidden="true">
      <path d="M11.5 24.5h17a6.5 6.5 0 0 0 .8-12.95A9 9 0 0 0 12.2 9.2a6.6 6.6 0 0 0-.7 15.3Z" fill="currentColor" opacity=".16"/>
      <path d="M11.5 24.5h17a6.5 6.5 0 0 0 .8-12.95A9 9 0 0 0 12.2 9.2a6.6 6.6 0 0 0-.7 15.3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M22.6 4.6A5.4 5.4 0 0 0 28 13a5.4 5.4 0 1 1-5.4-8.4Z" fill="currentColor"/>
    </svg>
    <span><span class="logo__name">${esc(practice.nameShort.toUpperCase())}</span>
    <span class="logo__sub">${esc(practice.tagline)}</span></span>
  </a>`;
}

/* 01 hero */
const hero = () => `
<div class="hero" id="top">
  <div class="container hero__grid">
    <div class="hero__copy">
      <span class="eyebrow">${esc(C.hero.eyebrow)}</span>
      <h1>${list(C.hero.headlineLines, (l) => `<span style="display:block">${esc(l)}</span>`)}</h1>
      <div class="hero__lede">
        ${list(C.hero.paragraphs, (p, i) => `<p${i === 0 ? ' class="lede"' : ''}>${t(p)}</p>`)}
      </div>
      <div class="cta-group">
        ${btnBook(C.hero.primaryCta, 'hero')}
        ${btnCall(C.hero.secondaryCta, 'hero')}
      </div>
      <ul class="trust-row">
        ${list(C.hero.trust, (item) => `<li class="trust-item">
          <span class="icon-badge">${icon(item.icon, { size: 20 })}</span>
          <span class="trust-item__label">${esc(item.label)}</span></li>`)}
      </ul>
      <p class="hero__microcopy">${esc(C.hero.microcopy)}</p>
    </div>

    <div class="breathing-hero" id="breathing-hero">
      <div class="breathing-hero__glow" aria-hidden="true"></div>
      <div class="breathing-hero__media">${img(C.hero.image, { priority: true })}</div>
      <svg class="breathing-hero__wave" viewBox="0 0 320 60" fill="none" aria-hidden="true">
        <path d="M4 40c14 0 18-24 32-24s18 24 32 24 18-24 32-24 18 24 32 24c10 0 14-8 20-8s10 8 20 8 18-24 32-24 18 24 32 24 18-24 32-24"/>
      </svg>
      <span class="breathing-hero__caption">${esc(C.hero.visualCaption)}</span>
    </div>
  </div>
</div>`;

/* 02 problem */
const problem = () => `
<section class="problem" aria-labelledby="problem-heading">
  <div class="problem__grid">
    <div class="problem__media">${img(C.problem.image)}</div>
    <div class="problem__body">
      <div ${reveal()} class="reveal reveal--fade-up problem__body-inner">
        <span class="eyebrow">${esc(C.problem.eyebrow)}</span>
        <h2 id="problem-heading">${esc(C.problem.heading)}</h2>
        <div class="stack-4" style="margin-top:var(--space-6)">
          ${list(C.problem.paragraphs, (p) => `<p class="measure">${esc(p)}</p>`)}
        </div>
        <p class="pullquote">${esc(C.problem.pullquote)}</p>
        ${btnBook(C.problem.cta, 'problem')}
      </div>
    </div>
  </div>
</section>`;

/* 03 symptoms */
const symptoms = () => `
<section class="section section--tint" id="${C.symptoms.id}" aria-labelledby="symptoms-heading">
  <div class="container">
    <div ${reveal()} class="reveal reveal--fade-up section-intro section-intro--center">
      <h2 id="symptoms-heading">${esc(C.symptoms.heading)}</h2>
      <p class="lede">${esc(C.symptoms.body)}</p>
    </div>
    <div class="symptom-grid">
      ${list(C.symptoms.items, (item, i) => `<div ${reveal('fade-up', i * 80)}>
        <article class="card card--hover symptom-card">
          ${icon(item.icon, { size: 34, strokeWidth: 1.4, className: 'symptom-card__icon' })}
          <h3>${esc(item.title)}</h3><p>${esc(item.body)}</p>
        </article></div>`)}
    </div>
    <div class="symptoms__foot">${btnBook(C.symptoms.cta, 'symptoms')}</div>
  </div>
</section>`;

/* 04 breathing timeline */
const NORMAL = 'M0 40c20 0 26-26 46-26s26 26 46 26 26-26 46-26 26 26 46 26 26-26 46-26 26 26 46 26 26-26 46-26 26 26 46 26';
const INTERRUPTED = 'M0 40c20 0 26-26 46-26s26 26 46 26h46c20 0 26-26 46-26s26 26 46 26h46c20 0 26-26 46-26s26 26 46 26';
const breathing = () => `
<section class="section" aria-labelledby="breathing-heading">
  <div class="container">
    <div ${reveal()} class="reveal reveal--fade-up section-intro section-intro--center">
      <span class="eyebrow">${esc(C.breathing.eyebrow)}</span>
      <h2 id="breathing-heading">${esc(C.breathing.heading)}</h2>
      ${list(C.breathing.paragraphs, (p) => `<p class="lede">${esc(p)}</p>`)}
    </div>
    <div class="timeline-chart" id="timeline-chart">
      <div class="timeline-chart__row">
        <p class="timeline-chart__label">${esc(C.breathing.timeline.normal.label)}</p>
        <svg viewBox="0 0 368 80" preserveAspectRatio="none" role="img"
          aria-label="${esc(C.breathing.timeline.normal.label)}: ${esc(C.breathing.timeline.normal.caption)}">
          <path class="trace trace-normal" d="${NORMAL}" style="--len:900"/></svg>
        <p class="timeline-chart__caption">${esc(C.breathing.timeline.normal.caption)}</p>
      </div>
      <div class="timeline-chart__row">
        <p class="timeline-chart__label">${esc(C.breathing.timeline.interrupted.label)}</p>
        <svg viewBox="0 0 368 80" preserveAspectRatio="none" role="img"
          aria-label="${esc(C.breathing.timeline.interrupted.label)}: ${esc(C.breathing.timeline.interrupted.caption)}">
          <path class="trace trace-interrupted" d="${INTERRUPTED}" style="--len:900"/>
          <circle class="timeline-chart__pause" cx="115" cy="40" r="3.5"/>
          <circle class="timeline-chart__pause" cx="253" cy="40" r="3.5"/></svg>
        <p class="timeline-chart__caption">${esc(C.breathing.timeline.interrupted.caption)}</p>
      </div>
    </div>
    <div ${reveal('fade-up', 200)}><p class="breathing__supporting">${esc(C.breathing.supporting)}</p></div>
  </div>
</section>`;

/* 05 airway */
const airway = () => `
<section class="section section--navy" aria-labelledby="airway-heading">
  <div class="container">
    <div class="airway__grid">
      <div ${reveal('slide-right')}>
        <span class="eyebrow">${esc(C.airway.eyebrow)}</span>
        <h2 id="airway-heading">${esc(C.airway.heading)}</h2>
        <div class="stack-4" style="margin-top:var(--space-6)">
          ${list(C.airway.paragraphs, (p) => `<p class="measure">${esc(p)}</p>`)}
        </div>
        <p class="airway__supporting">${esc(C.airway.supporting)}</p>
        <a class="btn btn--invert" href="#treatment" style="margin-top:var(--space-8)" data-cta="airway">${esc(C.airway.cta)}</a>
      </div>
      <div ${reveal('slide-left', 120)}>
        <div class="airway__viz" id="airway-viz">
          <div class="airway__states">
            ${list(C.airway.figures, (f) => `<figure class="airway-state" data-state="${f.state}">
              <div class="airway-state__figure">${img(f.image)}</div>
              <figcaption class="airway-state__caption">
                <b>${esc(f.title)}</b><span>${esc(f.caption)}</span>
              </figcaption></figure>`)}
          </div>
          <p class="airway__readout" data-state="NORMAL" role="status" aria-live="polite">
            <i aria-hidden="true"></i><span>${esc(C.airway.states.NORMAL.label)}</span>
          </p>
        </div>
        <p class="airway__disclaimer">${esc(C.airway.disclaimer)}</p>
      </div>
    </div>
  </div>
</section>`;

/* 06 education */
const education = () => `
<section class="section" aria-labelledby="education-heading">
  <div class="container">
    <div ${reveal()} class="reveal reveal--fade-up section-intro section-intro--center">
      <span class="eyebrow">${esc(C.education.eyebrow)}</span>
      <h2 id="education-heading">${esc(C.education.heading)}</h2>
      ${list(C.education.paragraphs, (p) => `<p class="lede">${esc(p)}</p>`)}
    </div>
    <div class="edu-grid">
      ${list(C.education.steps, (s, i) => `<div ${reveal('fade-up', i * 120)}>
        <article class="edu-step"><p class="edu-step__num">${esc(s.num)}</p>
        <h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></article></div>`)}
    </div>
    <div class="section__foot">${btnBook(C.education.cta, 'education')}</div>
  </div>
</section>`;

/* 07 why it matters */
const matters = () => `
<section class="section section--ice" aria-labelledby="matters-heading">
  <div class="container">
    <div ${reveal()} class="reveal reveal--fade-up section-intro section-intro--center">
      <span class="eyebrow">${esc(C.whyItMatters.eyebrow)}</span>
      <h2 id="matters-heading">${esc(C.whyItMatters.heading)}</h2>
      ${list(C.whyItMatters.paragraphs, (p) => `<p class="lede">${esc(p)}</p>`)}
    </div>
    <div class="matters-grid">
      ${list(C.whyItMatters.cards, (c, i) => `<div ${reveal('fade-up', i * 100)}>
        <article class="card card--hover matters-card">
          <span class="icon-badge icon-badge--lg">${icon(c.icon)}</span>
          <h3>${esc(c.title)}</h3><p>${esc(c.body)}</p></article></div>`)}
    </div>
    <div class="section__foot">${btnBook(C.whyItMatters.cta, 'why_it_matters')}</div>
  </div>
</section>`;

/* 08 treatment */
const treatment = () => `
<section class="treatment" id="${C.treatment.id}" aria-labelledby="treatment-heading">
  <div class="treatment__grid">
    <div class="treatment__media">${img(C.treatment.image)}</div>
    <div class="treatment__body">
      <div ${reveal()}>
        <span class="eyebrow">${esc(C.treatment.eyebrow)}</span>
        <h2 id="treatment-heading">${esc(C.treatment.heading)}</h2>
        <div class="stack-4" style="margin-top:var(--space-6)">
          ${list(C.treatment.paragraphs, (p) => `<p class="measure">${t(p)}</p>`)}
        </div>
        <p class="treatment__callout">
          <span class="icon-badge">${icon('user', { size: 20 })}</span>${esc(C.treatment.callout)}
        </p>
        ${btnBook(C.treatment.cta, 'treatment')}
      </div>
    </div>
  </div>
</section>`;

/* 09 appliance */
const appliance = () => `
<section class="section section--ice" id="${C.appliance.id}" aria-labelledby="appliance-heading">
  <div class="container">
    <div class="appliance__grid">
      <div ${reveal('slide-right')}>
        <span class="eyebrow">${esc(C.appliance.eyebrow)}</span>
        <h2 id="appliance-heading">${esc(C.appliance.heading)}</h2>
        <div class="stack-4" style="margin-top:var(--space-6)">
          ${list(C.appliance.paragraphs, (p) => `<p class="measure">${esc(p)}</p>`)}
        </div>
        ${btnBook(C.appliance.cta, 'appliance', 'primary', 'mt-8')}
      </div>
      <div ${reveal('slide-left', 120)}>
        <div class="appliance-viewer">${img(C.treatment.image, { className: 'appliance-viewer__fallback' })}</div>
      </div>
    </div>
    <div class="appliance__features">
      ${list(C.appliance.features, (f, i) => `<div ${reveal('fade-up', i * 100)}>
        <article class="card card--hover">
          <span class="icon-badge icon-badge--lg">${icon(f.icon)}</span>
          <h3 style="margin:var(--space-4) 0 var(--space-2);font-size:20px">${esc(f.title)}</h3>
          <p style="font-size:15px">${esc(f.body)}</p></article></div>`)}
    </div>
  </div>
</section>`;

/* steps list, shared by 10 and 11 */
const steps = (data, ctaLocation) => `
<ol class="steps">
  <span class="steps__rail" aria-hidden="true"></span>
  ${list(data, (s) => `<li class="step" data-step>
    <span class="step__num">${esc(s.num)}</span>
    <h3>${esc(s.title)}</h3><p>${esc(s.body)}</p>
    ${s.cta ? btnBook(s.cta, `${ctaLocation}_step_${s.num}`, 'invert', 'btn--sm step__cta') : ''}
  </li>`)}
</ol>`;

/* 10 how it works */
const applianceSteps = () => `
<section class="section" aria-labelledby="appliance-steps-heading">
  <div class="container">
    <div ${reveal()} class="reveal reveal--fade-up section-intro section-intro--center">
      <h2 id="appliance-steps-heading">${esc(C.applianceSteps.heading)}</h2>
      <p class="lede">${esc(C.applianceSteps.body)}</p>
    </div>
    ${steps(C.applianceSteps.steps, 'appliance_steps')}
    <div class="section__foot">${btnBook(C.applianceSteps.cta, 'appliance_steps')}</div>
  </div>
</section>`;

/* 11 journey */
const journey = () => `
<section class="section section--navy journey" id="${C.journey.id}" aria-labelledby="journey-heading">
  <div class="container">
    <div ${reveal()} class="reveal reveal--fade-up section-intro">
      <span class="eyebrow">${esc(C.journey.eyebrow)}</span>
      <h2 id="journey-heading">${esc(C.journey.heading)}</h2>
      <p class="lede">${esc(C.journey.body)}</p>
    </div>
    ${steps(C.journey.steps, 'journey')}
    <p class="journey__closing">${esc(C.journey.closing)}</p>
  </div>
</section>`;

/* 12 candidate */
const candidate = () => `
<section class="section section--ice" aria-labelledby="candidate-heading">
  <div class="container">
    <div class="candidate__grid">
      <div ${reveal('slide-right')}>
        <span class="eyebrow">${esc(C.candidate.eyebrow)}</span>
        <h2 id="candidate-heading">${esc(C.candidate.heading)}</h2>
        <p class="lede" style="margin-top:var(--space-6)">${esc(C.candidate.body)}</p>
        <p class="candidate__note">${esc(C.candidate.note)}</p>
      </div>
      <div ${reveal('slide-left', 120)}>
        <div class="card candidate__card">
          <ul class="checklist">
            ${list(C.candidate.checklist, (item) => `<li>${icon('check', { size: 20, strokeWidth: 2 })}<span>${esc(item)}</span></li>`)}
          </ul>
          ${btnBook(C.candidate.cta, 'candidate', 'primary', 'btn--block')}
        </div>
      </div>
    </div>
  </div>
</section>`;

/* 13 cpap */
const cpap = () => `
<section class="section" aria-labelledby="cpap-heading">
  <div class="container">
    <div class="cpap__grid">
      <div ${reveal('slide-right')}>
        <span class="eyebrow">${esc(C.cpap.eyebrow)}</span>
        <h2 id="cpap-heading">${esc(C.cpap.heading)}</h2>
        <div class="stack-4" style="margin-top:var(--space-6)">
          ${list(C.cpap.paragraphs, (p) => `<p class="measure">${esc(p)}</p>`)}
        </div>
        ${btnBook(C.cpap.cta, 'cpap', 'primary', 'mt-8')}
      </div>
      <div ${reveal('slide-left', 120)}>
        <blockquote class="card cpap__highlight">
          ${icon('quote', { size: 28, filled: true })}
          <p>${esc(C.cpap.highlight)}</p>
        </blockquote>
      </div>
    </div>
  </div>
</section>`;

/* 14 provider */
const provider = () => `
<section class="section section--tint" id="provider" aria-labelledby="provider-heading">
  <div class="container">
    <div class="provider__grid">
      <div ${reveal('slide-right')} class="reveal reveal--slide-right provider__photo">${img(C.provider.image)}</div>
      <div ${reveal('slide-left', 120)}>
        <span class="eyebrow">${esc(C.provider.eyebrow)}</span>
        <h2 id="provider-heading">${esc(C.provider.heading)}</h2>
        <div class="stack-4" style="margin-top:var(--space-6)">
          ${list(C.provider.paragraphs, (p) => `<p class="measure">${t(p)}</p>`)}
        </div>
        ${btnBook(C.provider.cta, 'provider', 'primary', 'mt-8')}
      </div>
    </div>
    <div class="provider__points">
      ${list(C.provider.trustPoints, (p, i) => `<div ${reveal('fade-up', i * 100)}>
        <article class="card card--hover">
          <span class="icon-badge icon-badge--lg">${icon(p.icon)}</span>
          <h3 style="margin:var(--space-4) 0 var(--space-2);font-size:19px">${esc(p.title)}</h3>
          <p style="font-size:15px">${esc(p.body)}</p></article></div>`)}
    </div>
  </div>
</section>`;

/* 15 technology */
const technology = () => `
<section class="section" aria-labelledby="technology-heading">
  <div class="container">
    <div ${reveal()} class="reveal reveal--fade-up section-intro section-intro--center">
      <span class="eyebrow">${esc(C.technology.eyebrow)}</span>
      <h2 id="technology-heading">${esc(C.technology.heading)}</h2>
      <p class="lede">${esc(C.technology.body)}</p>
    </div>
    <div class="tech-grid">
      ${list(C.technology.cards, (c, i) => `<div ${reveal('scale-in', i * 120)}>
        <article class="card card--hover tech-card">
          <span class="icon-badge icon-badge--lg">${icon(c.icon)}</span>
          <h3>${esc(c.title)}</h3><p>${esc(c.body)}</p></article></div>`)}
    </div>
    <div class="section__foot">${btnBook(C.technology.cta, 'technology')}</div>
  </div>
</section>`;

/* 16 testimonials */
const testimonials = () => {
  const [lead, ...rest] = C.testimonials.items;
  return `
<section class="section section--navy" aria-labelledby="testimonials-heading">
  <div class="container">
    <div ${reveal()} class="reveal reveal--fade-up section-intro section-intro--center">
      <span class="eyebrow">${esc(C.testimonials.eyebrow)}</span>
      <h2 id="testimonials-heading">${esc(C.testimonials.heading)}</h2>
      <p class="lede">${esc(C.testimonials.body)}</p>
    </div>
    <div class="testimonials__grid">
      <figure class="card card--invert quote quote--lead">
        ${icon('quote', { size: 32, filled: true, className: 'quote__mark' })}
        <blockquote><p>${esc(lead.quote)}</p></blockquote>
        <figcaption class="quote__by">— ${esc(lead.by)}</figcaption>
      </figure>
      <div class="testimonials__stack">
        ${list(rest, (item) => `<figure class="card card--invert quote">
          ${icon('quote', { size: 24, filled: true, className: 'quote__mark' })}
          <blockquote><p>${esc(item.quote)}</p></blockquote>
          <figcaption class="quote__by">— ${esc(item.by)}</figcaption></figure>`)}
      </div>
    </div>
    <p class="testimonials__microcopy">${esc(C.testimonials.microcopy)}</p>
  </div>
</section>`;
};

/* 17 faq */
const faq = () => `
<section class="section" id="${C.faq.id}" aria-labelledby="faq-heading">
  <div class="container">
    <div ${reveal()} class="reveal reveal--fade-up section-intro section-intro--center">
      <span class="eyebrow">${esc(C.faq.eyebrow)}</span>
      <h2 id="faq-heading">${esc(C.faq.heading)}</h2>
    </div>
    <div class="accordion">
      ${list(C.faq.items, (item, i) => `<div class="accordion__item" data-state="closed">
        <h3 style="margin:0">
          <button type="button" class="accordion__trigger" aria-expanded="false"
            aria-controls="faq-panel-${i}" id="faq-trigger-${i}">
            ${esc(item.q)}${icon('chevron', { size: 22, className: 'accordion__icon' })}
          </button>
        </h3>
        <div class="accordion__panel" id="faq-panel-${i}" role="region"
          aria-labelledby="faq-trigger-${i}" style="height:0;opacity:0">
          <p class="accordion__answer">${esc(item.a)}</p>
        </div>
      </div>`)}
    </div>
  </div>
</section>`;

/* 18 local */
const local = () => `
<section class="section section--tint local" id="local" aria-labelledby="local-heading">
  <div class="container">
    <div class="local__grid">
      <div ${reveal()}>
        <h2 id="local-heading">${t(C.local.heading)}</h2>
        <div class="stack-4" style="margin-top:var(--space-5)">
          ${list(C.local.paragraphs, (p) => `<p class="measure">${t(p)}</p>`)}
        </div>
        <div class="cta-group" style="margin-top:var(--space-8)">
          ${btnBook(C.local.cta, 'local')}
          ${btnCall(C.local.phoneCta, 'local')}
        </div>
      </div>
      <div ${reveal('fade-up', 120)} class="reveal reveal--fade-up card local__card">
        <p class="local__label">${esc(C.local.addressLabel)}</p>
        <address class="local__address">
          <b>${esc(practice.name)}</b>
          ${esc(practice.address.line1)}<br>${esc(practice.address.line2)}<br>
          ${esc(practice.address.city)}, ${esc(practice.address.state)} ${esc(practice.address.zip)}
        </address>
        <a class="local__link" href="${esc(practice.address.mapUrl)}">${icon('pin', { size: 16 })} Get directions</a>
        <div class="local__meta">
          <div><b>Call</b><span><a href="${practice.phone.href}" data-call="local">${esc(practice.phone.display)}</a></span></div>
          <div><b>Hours</b><span>${list(practice.hours, (h) => `<span style="display:block">${esc(h.days)}: ${esc(h.time)}</span>`)}</span></div>
        </div>
      </div>
    </div>
  </div>
</section>`;

/* 19 final cta */
const finalCta = () => `
<section class="final-cta" id="final-cta" aria-labelledby="final-cta-heading">
  <div class="container final-cta__grid">
    <div ${reveal()} class="reveal reveal--fade-up final-cta__copy">
      <span class="eyebrow">${esc(C.finalCta.eyebrow)}</span>
      <h2 id="final-cta-heading">${esc(C.finalCta.heading)}</h2>
      ${list(C.finalCta.paragraphs, (p) => `<p class="lede">${esc(p)}</p>`)}
      <div class="cta-group">
        ${btnBook(C.finalCta.primaryCta, 'final_cta')}
        ${btnCall(C.finalCta.secondaryCta, 'final_cta')}
      </div>
      <ul class="final-cta__reassurance">
        ${list(C.finalCta.reassurance, (r) => `<li>${icon('check', { size: 16, strokeWidth: 2.2 })}${esc(r)}</li>`)}
      </ul>
      <p class="final-cta__microcopy">${esc(C.finalCta.microcopy)}</p>
    </div>
    <div ${reveal('slide-left', 120)} class="reveal reveal--slide-left final-cta__media">${img(C.finalCta.image)}</div>
  </div>
</section>`;

/* 23 footer */
const footer = () => `
<footer class="footer">
  <div class="container">
    <div class="footer__cta">
      <h3>${esc(C.footer.ctaHeading)}</h3>
      <div class="cta-group">
        ${btnCall(C.footer.ctaPhone, 'footer', 'invert')}
        ${btnBook(C.footer.ctaBook, 'footer', 'ghost-invert')}
      </div>
    </div>
    <div class="footer__grid">
      <div>
        ${logo(true)}
        <p class="footer__blurb">${esc(C.footer.blurb)}</p>
        <div class="footer__social">
          ${list(practice.social, (s) => `<a href="${esc(s.href)}" aria-label="${esc(s.label)}">${icon(s.icon, { size: 16, filled: true })}</a>`)}
        </div>
      </div>
      <div><h4>${esc(C.footer.columns.quickLinks.title)}</h4><ul>
        ${list(C.footer.columns.quickLinks.links, (l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`)}
      </ul></div>
      <div><h4>${esc(C.footer.columns.practice.title)}</h4><ul>
        <li><a href="${esc(practice.address.mapUrl)}">${esc(practice.address.line1)}<br>${esc(practice.address.line2)}<br>${esc(practice.address.city)}, ${esc(practice.address.state)} ${esc(practice.address.zip)}</a></li>
        <li><a class="footer__inline" href="${practice.phone.href}" data-call="footer">${icon('phone', { size: 15 })} ${esc(practice.phone.display)}</a></li>
        <li><a class="footer__inline" href="mailto:${esc(practice.email)}">${icon('mail', { size: 15 })} ${esc(practice.email)}</a></li>
      </ul></div>
      <div><h4>${esc(C.footer.columns.hours.title)}</h4><ul>
        ${list(practice.hours, (h) => `<li class="footer__row"><b>${esc(h.days)}</b><span>${esc(h.time)}</span></li>`)}
      </ul></div>
      <div><h4>${esc(C.footer.columns.schedule.title)}</h4>
        <p class="footer__blurb" style="margin-top:0">${esc(C.footer.columns.schedule.body)}</p>
        ${btnBook(C.footer.columns.schedule.cta, 'footer', 'invert', 'btn--sm')}
      </div>
    </div>
    <p class="footer__legal">${esc(C.footer.legalNote)}</p>
    <div class="footer__bottom">
      <span>${esc(practice.legal.copyright)}</span>
      <span class="footer__legal-links">
        ${list(practice.legal.links, (l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`)}
      </span>
    </div>
  </div>
</footer>`;

/* 20 sticky bar + 21/22 booking dialog */
const stickyBar = () => `
<div class="sticky-cta" id="sticky-cta" aria-hidden="true">
  ${btnCall(C.stickyCta.call, 'sticky_bar')}
  ${btnBook(C.stickyCta.book, 'sticky_bar')}
</div>`;

const bookingDialog = () => `
<div class="modal-backdrop" id="booking-backdrop" hidden>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" id="booking-modal">
    <div class="modal__head">
      <div>
        <h3 id="booking-title">${esc(C.booking.title)}</h3>
        <p class="small" style="margin-top:var(--space-2)">${t(C.booking.body)}</p>
      </div>
      <button type="button" class="modal__close" data-book-close aria-label="Close">${icon('close', { size: 18 })}</button>
    </div>

    <form class="form" id="booking-form" novalidate>
      ${field('firstName', C.booking.fields.firstName, { type: 'text', autocomplete: 'given-name', required: true })}
      ${field('lastName', C.booking.fields.lastName, { type: 'text', autocomplete: 'family-name', required: true })}
      ${field('phone', C.booking.fields.phone, { type: 'tel', autocomplete: 'tel', required: true })}
      ${field('email', C.booking.fields.email, { type: 'email', autocomplete: 'email', required: true })}
      <div class="field">
        <label class="field__label" for="field-preferredTime">${esc(C.booking.fields.preferredTime)}</label>
        <select id="field-preferredTime" name="preferredTime">
          <option value="">Select a time</option>
          ${list(C.booking.preferredTimes, (o) => `<option>${esc(o)}</option>`)}
        </select>
      </div>
      <div class="field">
        <label class="field__label" for="field-reason">${esc(C.booking.fields.reason)}</label>
        <select id="field-reason" name="reason">
          <option value="">Select an option</option>
          ${list(C.booking.reasons, (o) => `<option>${esc(o)}</option>`)}
        </select>
      </div>
      <p class="field__error" id="form-error" role="alert" hidden>${t(C.booking.errorBody)}</p>
      <button type="submit" class="btn btn--primary btn--block" id="booking-submit">${esc(C.booking.submit)}</button>
      <p class="form__note">${esc(C.booking.privacy)}</p>
    </form>

    <div class="form__status" id="booking-success" role="status" aria-live="polite" hidden>
      <h4>${esc(C.booking.successTitle)}</h4>
      <p style="margin-top:var(--space-3)">${esc(C.booking.successBody)}</p>
      ${btnCall(C.booking.successCta, 'booking_success')}
    </div>
  </div>
</div>`;

function field(id, label, { type, autocomplete, required }) {
  return `<div class="field" data-invalid="false">
    <label class="field__label" for="field-${id}">${esc(label)} ${required ? '<span class="field__req" aria-hidden="true">*</span>' : ''}</label>
    <input id="field-${id}" name="${id}" type="${type}" autocomplete="${autocomplete}"
      ${required ? 'aria-required="true"' : ''} data-validate="${id}">
    <span class="field__error" id="error-${id}" hidden></span>
  </div>`;
}

/* ---------- JSON-LD ---------- */
const jsonLd = () => JSON.stringify([
  {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: practice.name,
    description: fill(C.meta.description),
    telephone: practice.phone.display,
    email: practice.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${practice.address.line1}, ${practice.address.line2}`,
      addressLocality: practice.address.city,
      addressRegion: practice.address.state,
      postalCode: practice.address.zip,
    },
    medicalSpecialty: 'Dentistry',
    availableService: [
      { '@type': 'MedicalTherapy', name: 'Oral appliance therapy for obstructive sleep apnea' },
      { '@type': 'MedicalTherapy', name: 'Snoring treatment' },
      { '@type': 'MedicalTest', name: 'Sleep apnea screening and airway evaluation' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: C.faq.items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  },
]);

/* ---------- assembly ---------- */
const css = ['tokens', 'base', 'components', 'sections']
  .map((f) => readFileSync(join(root, `src/styles/${f}.css`), 'utf8'))
  .join('\n');

const extraCss = `
/* standalone-only helpers */
.mt-8 { margin-top: var(--space-8); }
.appliance-viewer__fallback { width: 100%; height: 100%; object-fit: contain; }
`;

const runtime = readFileSync(join(root, 'tools/runtime.js'), 'utf8');

/** Config the runtime reads: copy strings it needs, and the hero variants. */
const config = JSON.stringify({
  airwayStates: Object.fromEntries(
    Object.entries(C.airway.states).map(([k, v]) => [k, v.label])
  ),
  validation: C.booking.validation,
  submitting: C.booking.submitting,
  variants: Object.fromEntries(
    Object.entries(adGroups).map(([k, v]) => [k, {
      eyebrow: v.eyebrow,
      headlineLines: v.headlineLines,
      paragraphs: v.paragraphs.map(fill),
      primaryCta: v.primaryCta,
    }])
  ),
}).replace(/</g, '\\u003c');

const bodyMarkup = `
<a class="skip-link" href="#main">Skip to content</a>
${header()}
<main id="main">
  ${hero()}
  ${problem()}
  ${symptoms()}
  ${breathing()}
  ${airway()}
  ${education()}
  ${matters()}
  ${treatment()}
  ${appliance()}
  ${applianceSteps()}
  ${journey()}
  ${candidate()}
  ${cpap()}
  ${provider()}
  ${technology()}
  ${testimonials()}
  ${faq()}
  ${local()}
  ${finalCta()}
</main>
${footer()}
${stickyBar()}
${bookingDialog()}`;

const fonts =
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@600;700;800&display=swap" rel="stylesheet">';

const fullDoc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t(C.meta.title)}</title>
<meta name="description" content="${t(C.meta.description)}">
<meta name="theme-color" content="#123C7A">
${fonts}
<style>
${css}
${extraCss}
</style>
</head>
<body>
${bodyMarkup}
<script type="application/ld+json">${jsonLd()}</script>
<script>window.__LP_CONFIG__ = ${config};</script>
<script>
${runtime}
</script>
</body>
</html>`;

/* The artifact host supplies <!doctype>, <head> and <body>, so that flavour is
   body content only with the title and styles inlined at the top.
   Its <title> is the gallery/tab name for the shared preview; the SEO title
   from copy deck section 24 lives in the production file above. */
const artifactDoc = `<title>Restore Sleep Apnea LP</title>
${fonts}
<style>
${css}
${extraCss}
</style>
${bodyMarkup}
<script type="application/ld+json">${jsonLd()}</script>
<script>window.__LP_CONFIG__ = ${config};</script>
<script>
${runtime}
</script>`;

mkdirSync(join(root, 'dist-standalone'), { recursive: true });
writeFileSync(join(root, 'dist-standalone/sleep-apnea-landing-page.html'), fullDoc);
writeFileSync(join(root, 'dist-standalone/artifact.html'), artifactDoc);

const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(1)} kB`;
console.log(`sleep-apnea-landing-page.html  ${kb(fullDoc)}`);
console.log(`artifact.html                  ${kb(artifactDoc)}`);
