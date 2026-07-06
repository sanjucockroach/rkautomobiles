export type LeadErrors = {
  name?: string;
  phone?: string;
};

const phonePattern = /^[0-9+\-\s]{8,16}$/;

export function validateLeadDetails(name: string, phone: string): LeadErrors {
  const errors: LeadErrors = {};
  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();

  if (!trimmedName) {
    errors.name = "Please enter your name so our showroom team knows who to ask for.";
  }

  if (!trimmedPhone) {
    errors.phone = "Please enter a phone number for the callback.";
  } else if (!phonePattern.test(trimmedPhone)) {
    errors.phone = "Use 8-16 digits, spaces, +, or - only.";
  }

  return errors;
}

export function hasLeadErrors(errors: LeadErrors) {
  return Boolean(errors.name || errors.phone);
}
