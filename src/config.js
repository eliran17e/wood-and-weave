// Shop contact details.
// ----------------------------------------------------------------------------
// Edit the three values below with the real numbers and they propagate
// everywhere — homepage CTA, sticky contact bar on the PDP, etc.
//
// Formats:
//   phoneDisplay   — exactly what appears on screen
//   phoneTel       — used in the tel: link (include country code with +)
//   whatsappNumber — international format, digits only (no +, no spaces, no dashes)
// ----------------------------------------------------------------------------

export const CONTACT = {
  phoneDisplay:   '055-560-2025',          
  phoneTel:       '+972-55-560-2025',      
  whatsappNumber: '972555602025',          
};

/**
 * Build a WhatsApp deep-link, optionally pre-filling a message.
 * Usage: <a href={whatsappUrl('Hi, I’m interested in the Aalto Sofa')} />
 */
export const whatsappUrl = (message = '') => {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
