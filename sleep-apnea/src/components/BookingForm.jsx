import { useRef, useState } from 'react';
import { Button } from './ui/Button';
import { booking } from '../content/copy';
import { fill, practice } from '../content/practice';
import { track, EVENTS } from '../lib/analytics';
import { getAttribution } from '../lib/utm';

/**
 * Evaluation request form (spec 30/31).
 *  • Five fields, no more.
 *  • Validation is gentle: fields validate on blur, and again on submit —
 *    never destructive, entered values are always preserved.
 *  • Success replaces the form in place. No browser alerts.
 */
const EMPTY = { firstName: '', lastName: '', phone: '', email: '', preferredTime: '' };

const RULES = {
  firstName: (v) => (v.trim() ? '' : booking.validation.required),
  lastName: (v) => (v.trim() ? '' : booking.validation.required),
  phone: (v) => {
    if (!v.trim()) return booking.validation.required;
    return v.replace(/\D/g, '').length >= 10 ? '' : booking.validation.phone;
  },
  email: (v) => {
    if (!v.trim()) return booking.validation.required;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : booking.validation.email;
  },
  preferredTime: () => '',
};

export function BookingForm({ location = 'booking_modal', onSubmitted }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const started = useRef(false);

  const setField = (name) => (e) => {
    const { value } = e.target;
    if (!started.current) {
      started.current = true;
      track(EVENTS.FORM_START, { cta_location: location });
    }
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear an existing error as soon as the value becomes valid — never
    // introduce a new one mid-typing.
    setErrors((prev) => (prev[name] && !RULES[name](value) ? { ...prev, [name]: '' } : prev));
  };

  const validateField = (name) => () =>
    setErrors((prev) => ({ ...prev, [name]: RULES[name](values[name]) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = Object.fromEntries(
      Object.keys(RULES).map((name) => [name, RULES[name](values[name])])
    );
    setErrors(nextErrors);

    const firstInvalid = Object.entries(nextErrors).find(([, msg]) => msg);
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid[0]}`)?.focus();
      return;
    }

    setStatus('submitting');
    track(EVENTS.FORM_SUBMIT, { cta_location: location });

    try {
      // TODO: point at the practice's real endpoint / scheduler API.
      await submitLead({ ...values, ...getAttribution() });
      setStatus('success');
      track(EVENTS.BOOKING_COMPLETE, { cta_location: location });
      onSubmitted?.(values);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="form__status" role="status" aria-live="polite">
        <h4>{booking.successTitle}</h4>
        <p style={{ marginTop: 'var(--space-3)' }}>{booking.successBody}</p>
        <p className="small" style={{ marginTop: 'var(--space-5)' }}>
          Prefer to talk now?{' '}
          <a href={practice.phone.href} style={{ fontWeight: 700, color: 'var(--navy-700)' }}>
            {practice.phone.display}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <Field id="firstName" label={booking.fields.firstName} value={values.firstName}
             error={errors.firstName} onChange={setField('firstName')} onBlur={validateField('firstName')}
             autoComplete="given-name" required />
      <Field id="lastName" label={booking.fields.lastName} value={values.lastName}
             error={errors.lastName} onChange={setField('lastName')} onBlur={validateField('lastName')}
             autoComplete="family-name" required />
      <Field id="phone" label={booking.fields.phone} type="tel" inputMode="tel" value={values.phone}
             error={errors.phone} onChange={setField('phone')} onBlur={validateField('phone')}
             autoComplete="tel" required />
      <Field id="email" label={booking.fields.email} type="email" inputMode="email" value={values.email}
             error={errors.email} onChange={setField('email')} onBlur={validateField('email')}
             autoComplete="email" required />

      <div className="field">
        <label className="field__label" htmlFor="field-preferredTime">
          {booking.fields.preferredTime}
        </label>
        <select id="field-preferredTime" value={values.preferredTime} onChange={setField('preferredTime')}>
          <option value="">Select a time</option>
          {booking.preferredTimes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {status === 'error' && (
        <p className="field__error" role="alert">{fill(booking.errorBody)}</p>
      )}

      <Button
        as="button"
        type="submit"
        variant="primary"
        block
        loading={status === 'submitting'}
        location={location}
        event={EVENTS.FORM_SUBMIT}
      >
        {status === 'submitting' ? booking.submitting : booking.submit}
      </Button>

      <p className="form__note">{booking.privacy}</p>
    </form>
  );
}

function Field({ id, label, error, required, ...rest }) {
  return (
    <div className="field" data-invalid={error ? 'true' : 'false'}>
      <label className="field__label" htmlFor={`field-${id}`}>
        {label} {required && <span className="field__req" aria-hidden="true">*</span>}
      </label>
      <input
        id={`field-${id}`}
        name={id}
        aria-required={required || undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `error-${id}` : undefined}
        {...rest}
      />
      {error && (
        <span className="field__error" id={`error-${id}`} role="alert">{error}</span>
      )}
    </div>
  );
}

/** Replace with the real submission (CRM, scheduler API, or form endpoint). */
async function submitLead(payload) {
  if (import.meta.env?.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[booking] lead', payload);
    return new Promise((resolve) => setTimeout(resolve, 700));
  }
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Lead submission failed');
  return res.json().catch(() => ({}));
}
