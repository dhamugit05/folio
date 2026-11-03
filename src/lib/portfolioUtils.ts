import { ProjectItem } from '../types';

/**
 * Filter projects by category with 'All' support
 */
export function filterProjectsByCategory(
  projects: ProjectItem[],
  category: string
): ProjectItem[] {
  if (!category || category === 'All') {
    return projects;
  }
  return projects.filter((p) => p.category === category);
}

/**
 * Validates an email address according to standard pattern
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Validates contact form submission
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (data.honeypot && data.honeypot.trim().length > 0) {
    errors.honeypot = 'Bot detected';
  }

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide a valid name (at least 2 characters).';
  }

  if (!isValidEmail(data.email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.message || data.message.trim().length < 5) {
    errors.message = 'Please provide a message with at least 5 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds a direct mailto URI for email fallback
 */
export function createMailtoLink(
  targetEmail: string,
  senderName: string,
  senderEmail: string,
  message: string
): string {
  const subject = encodeURIComponent(`Portfolio Inquiry from ${senderName.trim()}`);
  const body = encodeURIComponent(
    `Hi Dhamotharan,\n\n${message.trim()}\n\n--\nFrom: ${senderName.trim()} (${senderEmail.trim()})`
  );
  return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
}

/**
 * Checks whether a project link is active and valid (not a placeholder or empty)
 */
export function isRealUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (
    trimmed === '' ||
    trimmed === '#' ||
    trimmed.includes('[') ||
    trimmed.includes(']') ||
    trimmed.toUpperCase().includes('PLACEHOLDER')
  ) {
    return false;
  }
  return trimmed.startsWith('http://') || trimmed.startsWith('https://');
}
