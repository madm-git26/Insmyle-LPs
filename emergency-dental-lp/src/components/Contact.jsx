import { useEffect, useRef, useState } from 'react'
import { Phone, MapPin, Clock, Loader2, Check } from 'lucide-react'
import { brand, contact } from '../data/content.js'
import Section, { GLASS } from './Section.jsx'

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', required: true },
  {
    name: 'phone',
    label: 'Phone number',
    type: 'tel',
    autoComplete: 'tel',
    required: true,
    help: 'The fastest way for us to reach you.',
  },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: false },
]

function validate(name, value) {
  const v = value.trim()
  if (name === 'name') return v ? '' : 'Enter your name so we know who to ask for.'
  if (name === 'phone') {
    if (!v) return 'Enter a phone number so we can call you back.'
    return v.replace(/\D/g, '').length >= 10 ? '' : 'That number looks too short — include the area code.'
  }
  if (name === 'email') {
    if (!v) return ''
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Check the email address — it is missing an @ or a domain.'
  }
  return ''
}

const INPUT =
  'mt-2 block min-h-[48px] w-full rounded-xl border bg-white/5 px-4 py-3 text-[15px] text-white ' +
  'placeholder:text-gray-400 backdrop-blur-md transition-colors focus:bg-white/[0.08]'

export default function Contact() {
  const [values, setValues] = useState({ name: '', phone: '', email: '', urgency: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [focusTarget, setFocusTarget] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  // Move focus to the first invalid field AFTER the error state has committed.
  // Doing it inside the submit handler races React's render and the focus is lost.
  useEffect(() => {
    if (!focusTarget) return
    document.getElementById(`field-${focusTarget}`)?.focus()
    setFocusTarget(null)
  }, [focusTarget])

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    // only clear an existing error while typing; never introduce one mid-keystroke
    if (errors[name]) setErrors((e) => ({ ...e, [name]: validate(name, value) }))
  }

  const onBlur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors((e) => ({ ...e, [name]: validate(name, values[name]) }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const next = {}
    FIELDS.forEach((f) => {
      const msg = validate(f.name, values[f.name])
      if (msg) next[f.name] = msg
    })
    setErrors(next)
    setTouched(Object.fromEntries(FIELDS.map((f) => [f.name, true])))

    const firstInvalid = FIELDS.find((f) => next[f.name])
    if (firstInvalid) {
      setFocusTarget(firstInvalid.name)
      return
    }

    setStatus('sending')
    // No backend wired up yet — swap this for the real submit.
    window.setTimeout(() => setStatus('sent'), 900)
  }

  const errorList = FIELDS.filter((f) => errors[f.name])

  return (
    <Section id="contact" eyebrow={contact.eyebrow} heading={contact.heading} intro={contact.intro}>
      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        {/* ---- form ---- */}
        <div className={`${GLASS} p-6 sm:p-8`}>
          {status === 'sent' ? (
            <div role="status" className="flex flex-col items-start gap-4 py-8">
              <span className="grid size-12 place-items-center rounded-full border border-blue-400/40 bg-blue-500/15 text-blue-300">
                <Check className="size-6" strokeWidth={2.6} />
              </span>
              <h3 className="text-xl font-semibold text-white">Message sent</h3>
              <p className="max-w-sm text-[14px] leading-relaxed text-gray-400">
                We will reply as soon as we open. If your pain is severe, please call{' '}
                <a href={brand.phoneHref} className="font-semibold text-blue-400 underline underline-offset-2">
                  {brand.phone}
                </a>{' '}
                rather than waiting for a reply.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate>
              {/* error summary — anchors straight to the offending field */}
              {/* Only after a submit attempt. Rendering this on blur inserts a block above
                  the fields mid-click, which moves the submit button and drops the click. */}
              {submitted && errorList.length > 1 && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-[13px] text-red-200"
                >
                  <p className="font-semibold">Please fix {errorList.length} fields:</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    {errorList.map((f) => (
                      <li key={f.name}>
                        <a href={`#field-${f.name}`} className="underline underline-offset-2">
                          {f.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                {FIELDS.map((f) => {
                  const invalid = touched[f.name] && !!errors[f.name]
                  return (
                    <div key={f.name} className={f.name === 'email' ? 'sm:col-span-2' : ''}>
                      <label htmlFor={`field-${f.name}`} className="text-[13px] font-medium text-gray-200">
                        {f.label}
                        {f.required ? (
                          <span className="ml-1 text-red-300" aria-hidden="true">
                            *
                          </span>
                        ) : (
                          <span className="ml-2 text-[11px] font-normal text-gray-400">Optional</span>
                        )}
                      </label>
                      <input
                        id={`field-${f.name}`}
                        name={f.name}
                        type={f.type}
                        autoComplete={f.autoComplete}
                        required={f.required}
                        aria-required={f.required}
                        aria-invalid={invalid}
                        aria-describedby={
                          // only reference ids that are actually in the DOM right now
                          (invalid ? `err-${f.name}` : f.help ? `help-${f.name}` : undefined)
                        }
                        value={values[f.name]}
                        onChange={(e) => setField(f.name, e.target.value)}
                        onBlur={() => onBlur(f.name)}
                        className={`${INPUT} ${invalid ? 'border-red-400/60' : 'border-white/10'}`}
                      />
                      {/* Reserved line: help and error occupy the same slot, so validation
                          messages never reflow the form. Without this the submit button shifts
                          down between mousedown and mouseup and the click is dropped. */}
                      <div className="mt-1.5 min-h-[16px] text-[12px] leading-4">
                        {invalid ? (
                          <p id={`err-${f.name}`} role="alert" className="text-red-300">
                            {errors[f.name]}
                          </p>
                        ) : f.help ? (
                          <p id={`help-${f.name}`} className="text-gray-400">
                            {f.help}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  )
                })}

                <div className="sm:col-span-2">
                  <label htmlFor="field-urgency" className="text-[13px] font-medium text-gray-200">
                    What is happening?
                  </label>
                  <select
                    id="field-urgency"
                    name="urgency"
                    value={values.urgency}
                    onChange={(e) => setField('urgency', e.target.value)}
                    className={`${INPUT} border-white/10`}
                  >
                    <option value="">Select the closest match</option>
                    {contact.urgencyOptions.map((o) => (
                      <option key={o} value={o} className="bg-[#0b1120]">
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="field-message" className="text-[13px] font-medium text-gray-200">
                    Anything else we should know?
                    <span className="ml-2 text-[11px] font-normal text-gray-400">Optional</span>
                  </label>
                  <textarea
                    id="field-message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => setField('message', e.target.value)}
                    className={`${INPUT} border-white/10 resize-y`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-7 inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === 'sending' && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
                {status === 'sending' ? 'Sending…' : 'Request A Callback'}
              </button>
              <p className="mt-3 text-[12px] text-gray-400">
                In severe pain? Calling is faster than this form.
              </p>
            </form>
          )}
        </div>

        {/* ---- details ---- */}
        <div className="flex flex-col gap-5">
          <a
            href={brand.phoneHref}
            className={`${GLASS} flex items-center gap-4 p-6 transition-colors hover:border-blue-400/30`}
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
              <Phone className="size-5" strokeWidth={2.4} />
            </span>
            <span>
              <span className="block text-[11px] font-semibold tracking-[0.16em] text-gray-400 uppercase">
                Call now
              </span>
              <span className="mt-1 block text-lg font-bold text-white">{brand.phone}</span>
            </span>
          </a>

          <div className={`${GLASS} p-6`}>
            <h3 className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.16em] text-gray-400 uppercase">
              <Clock aria-hidden="true" className="size-4 text-blue-400" />
              Opening hours
            </h3>
            <dl className="mt-4 space-y-2.5">
              {contact.hours.map((h) => (
                <div key={h.day} className="flex items-baseline justify-between gap-4 text-[13px]">
                  <dt className="text-gray-300">{h.day}</dt>
                  <dd className="text-right tabular-nums text-gray-400">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={`${GLASS} p-6`}>
            <h3 className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.16em] text-gray-400 uppercase">
              <MapPin aria-hidden="true" className="size-4 text-blue-400" />
              Where to find us
            </h3>
            <p className="mt-4 text-[14px] leading-relaxed text-gray-300">{contact.address}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
