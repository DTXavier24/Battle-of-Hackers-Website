/**
 * Site-wide configuration. Edit this file to update event details or to
 * enable the "Join CTF" button once the CTFd instance is live.
 */
export const site = {
  name: 'APU Battle of Hackers',
  host: {
    short: 'FSEC-SS',
    full: 'APU Forensic & Cybersecurity Research Centre Student Section',
    university: 'Asia Pacific University of Technology & Innovation',
  },

  /**
   * Target of the "Join CTF" button: a URL or an in-page anchor. Set to null to
   * render the button disabled with a "Coming soon" note.
   */
  ctfUrl: '#iboh-2026' as string | null,

  /** Competition categories shown in the IBOH 2026 registration section. */
  categories: [
    {
      name: 'Jeopardy',
      image: '/iboh-2026/jeopardy.webp',
      registerUrl: 'https://bit.ly/IBOH2026_Registration_Forms_FSECSS',
    },
    {
      name: 'Attack & Defense',
      image: '/iboh-2026/attack-defense.webp',
      registerUrl: 'https://bit.ly/IBOH26_AD_RegistrationForm_FSECSS',
    },
  ],

  /**
   * Registration terms per category, transcribed from the official category
   * posters. Deadlines are 23:59 GMT+8.
   */
  terms: [
    {
      category: 'Jeopardy',
      division: 'National',
      format: 'Physical or online',
      team: '1 to 3 members',
      fee: 'RM150 physical, RM100 online',
      closes: '2 Nov physical, 5 Nov online',
    },
    {
      category: 'Jeopardy',
      division: 'International',
      format: 'Physical or online',
      team: '1 to 3 members, cross-university teams allowed',
      fee: 'USD35 physical, USD25 online',
      closes: '2 Nov physical, 5 Nov online',
    },
    {
      category: 'Attack & Defense',
      division: 'Local teams only',
      format: 'Physical only',
      team: '1 to 3 members, one organisation per team, 10 teams max',
      fee: 'RM200 per team',
      closes: '2 Nov',
    },
  ],
  termsNote: 'All deadlines 23:59 GMT+8. Shirts are provided for physical participants only.',

  event: {
    day: '14',
    month: 'November',
    year: '2026',
    time: '8:30 AM to 6:00 PM',
    /** One line per competition category. */
    mode: ['Jeopardy: Hybrid, on campus and online', 'A&D: Offline only'],
    venue: 'APU Campus, Kuala Lumpur',
    audience: 'Open to local and international students',
  },

  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/apu_fsec.ss/' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/forensic-security-research-center-student-section-apu/',
    },
    { label: 'Discord', href: 'https://discord.com/invite/U7asN8gmV9' },
    { label: 'Email', href: 'mailto:fsec.ss@gmail.com' },
  ],
} as const;
