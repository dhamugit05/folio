import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjectsByCategory,
  isValidEmail,
  validateContactForm,
  createMailtoLink,
  isRealUrl,
} from './portfolioUtils';
import { ProjectItem } from '../types';

const sampleProjects: ProjectItem[] = [
  {
    id: 'p1',
    slug: 'p1',
    title: 'Horolo',
    subtitle: '3D Watch App',
    description: 'A 3D watch application',
    category: '3D & AI',
    tags: ['React', 'Three.js'],
    image: '/images/p1.webp',
    liveUrl: 'https://horolo.netlify.app',
    githubUrl: 'https://github.com/dhamugit05/horolo',
  },
  {
    id: 'p2',
    slug: 'p2',
    title: 'Volt Storefront',
    subtitle: 'Frontend Storefront',
    description: 'E-commerce frontend',
    category: 'Frontend',
    tags: ['React'],
    image: '/images/p2.webp',
    liveUrl: 'https://voltecom.netlify.app',
  },
  {
    id: 'p3',
    slug: 'p3',
    title: 'Task Manager',
    subtitle: 'Django App',
    description: 'Full stack app',
    category: 'Full Stack',
    tags: ['Django', 'React'],
    image: '/images/p3.webp',
  },
];

test('filterProjectsByCategory correctly filters by exact category', () => {
  const frontendOnly = filterProjectsByCategory(sampleProjects, 'Frontend');
  assert.equal(frontendOnly.length, 1);
  assert.equal(frontendOnly[0].title, 'Volt Storefront');

  const allProjects = filterProjectsByCategory(sampleProjects, 'All');
  assert.equal(allProjects.length, 3);
});

test('isValidEmail accepts valid emails and rejects bad inputs', () => {
  assert.equal(isValidEmail('dhamotharanpers@gmail.com'), true);
  assert.equal(isValidEmail('recruiter@company.co.in'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail(''), false);
});

test('validateContactForm checks honeypot and field constraints', () => {
  const botSubmission = validateContactForm({
    name: 'Bot',
    email: 'bot@example.com',
    message: 'Spam offer here',
    honeypot: 'filled_by_bot',
  });
  assert.equal(botSubmission.valid, false);
  assert.equal(Boolean(botSubmission.errors.honeypot), true);

  const validSubmission = validateContactForm({
    name: 'Alex Recruiter',
    email: 'alex@techfirm.com',
    message: 'Hello, we would love to interview you for a developer role.',
  });
  assert.equal(validSubmission.valid, true);
  assert.equal(Object.keys(validSubmission.errors).length, 0);
});

test('createMailtoLink properly escapes subject and body', () => {
  const link = createMailtoLink(
    'dhamotharanpers@gmail.com',
    'Dhamo Fan',
    'fan@example.com',
    'Great portfolio!'
  );
  assert.match(link, /^mailto:dhamotharanpers@gmail\.com\?/);
  assert.match(link, /subject=Portfolio%20Inquiry%20from%20Dhamo%20Fan/);
});

test('isRealUrl handles valid http/https URLs and detects placeholders', () => {
  assert.equal(isRealUrl('https://horolo.netlify.app'), true);
  assert.equal(isRealUrl('http://localhost:3000'), true);
  assert.equal(isRealUrl('https://github.com/dhamugit05/[HOROLO_REPO]'), false);
  assert.equal(isRealUrl(undefined), false);
  assert.equal(isRealUrl(''), false);
});
