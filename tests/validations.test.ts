import { describe, expect, it } from 'vitest';
import {
  contactFormSchema,
  emailSchema,
  eventEnquirySchema,
  franchiseFormSchema,
  hospitalityEnquirySchema,
  nameSchema,
  phoneSchema,
  travelEnquirySchema,
  vehicleEnquirySchema,
  visaEnquirySchema,
  formatZodErrors,
} from '@/lib/validations';

const DAY = 24 * 60 * 60 * 1000;
// Dates as the forms send them (YYYY-MM-DD).
const inAWeek = new Date(Date.now() + 7 * DAY).toISOString().slice(0, 10);
const lastWeek = new Date(Date.now() - 7 * DAY).toISOString().slice(0, 10);

const person = {
  name: 'Priya Sharma',
  email: 'priya.sharma@example.org',
  phone: '+91 9823456781',
};

describe('field schemas', () => {
  it('accepts a real name and rejects placeholders, digits and links', () => {
    expect(nameSchema.safeParse('Priya Sharma').success).toBe(true);
    expect(nameSchema.safeParse("Anne-Marie O'Neil").success).toBe(true);
    expect(nameSchema.safeParse('test').success).toBe(false);
    expect(nameSchema.safeParse('John 2').success).toBe(false);
    expect(nameSchema.safeParse('http://spam.example').success).toBe(false);
    expect(nameSchema.safeParse('aaaa').success).toBe(false);
  });

  it('rejects disposable domains and malformed addresses', () => {
    expect(emailSchema.safeParse('priya.sharma@example.org').success).toBe(true);
    expect(emailSchema.safeParse('someone@mailinator.com').success).toBe(false);
    expect(emailSchema.safeParse('a..b@example.org').success).toBe(false);
    expect(emailSchema.safeParse('not-an-email').success).toBe(false);
  });

  it('checks phone length for the dialled country', () => {
    expect(phoneSchema.safeParse('+91 9823456781').success).toBe(true);
    expect(phoneSchema.safeParse('+971 557337618').success).toBe(true);
    expect(phoneSchema.safeParse('+91 98234').success).toBe(false);
    expect(phoneSchema.safeParse('+91 9999999999').success).toBe(false);
    expect(phoneSchema.safeParse('').success).toBe(false);
  });
});

describe('form schemas', () => {
  it('contact form: a valid submission passes, a two-letter message fails', () => {
    expect(
      contactFormSchema.safeParse({ ...person, message: 'Please call me about a Goa trip.' }).success,
    ).toBe(true);
    const bad = contactFormSchema.safeParse({ ...person, message: 'hi' });
    expect(bad.success).toBe(false);
    if (!bad.success) expect(formatZodErrors(bad.error)).toHaveProperty('message');
  });

  it('contact form: shortened links in the message are rejected', () => {
    const r = contactFormSchema.safeParse({ ...person, message: 'Great offer at bit.ly/xyz for you' });
    expect(r.success).toBe(false);
  });

  it('franchise form requires the investor fields', () => {
    const base = {
      fname: person.name,
      email: person.email,
      phone: person.phone,
      country: 'India',
      itype: 'Individual',
      format: 'Kiosk',
      budget: '10-20 lakh',
    };
    expect(franchiseFormSchema.safeParse(base).success).toBe(true);
    expect(franchiseFormSchema.safeParse({ ...base, budget: '' }).success).toBe(false);
  });

  it('travel enquiry: a return date before departure fails', () => {
    const base = { ...person, travelType: 'holiday', destination: 'Dubai', travelers: '2' };
    expect(travelEnquirySchema.safeParse(base).success).toBe(true);
    const r = travelEnquirySchema.safeParse({
      ...base,
      departureDate: '2030-05-10',
      returnDate: '2030-05-01',
    });
    expect(r.success).toBe(false);
    if (!r.success) expect(formatZodErrors(r.error)).toHaveProperty('returnDate');
  });

  it('vehicle enquiry: a pickup date in the past fails', () => {
    const base = {
      ...person,
      vehicleType: 'car',
      pickupLocation: 'Mopa Airport',
      dropoffLocation: 'Calangute',
      pickupDate: inAWeek,
      dropoffDate: inAWeek,
      passengers: 3,
    };
    expect(vehicleEnquirySchema.safeParse(base).success).toBe(true);
    expect(vehicleEnquirySchema.safeParse({ ...base, pickupDate: lastWeek }).success).toBe(false);
  });

  it('hospitality enquiry: needs a property and a check-in date', () => {
    const base = { ...person, destination: 'Beach Resort', checkInDate: inAWeek, guests: 2 };
    expect(hospitalityEnquirySchema.safeParse(base).success).toBe(true);
    expect(hospitalityEnquirySchema.safeParse({ ...base, destination: '' }).success).toBe(false);
  });

  it('visa enquiry caps the applicant count', () => {
    const base = {
      ...person,
      nationality: 'Indian',
      destinationCountry: 'UAE',
      visaType: 'Tourist',
      passengerCount: 2,
      tentativeDate: inAWeek,
    };
    expect(visaEnquirySchema.safeParse(base).success).toBe(true);
    expect(visaEnquirySchema.safeParse({ ...base, passengerCount: 50 }).success).toBe(false);
  });

  it('event enquiry: the guest count is coerced from a string', () => {
    const r = eventEnquirySchema.safeParse({
      ...person,
      eventType: 'Wedding',
      eventLocation: 'Goa',
      eventDate: inAWeek,
      guestCount: '150',
    });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.guestCount).toBe(150);
  });
});
