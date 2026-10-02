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
      image: '/iboh-2026/jeopardy.png',
      registerUrl: 'https://bit.ly/IBOH2026_Registration_Forms_FSECSS',
    },
    {
      name: 'Attack & Defense',
      image: '/iboh-2026/attack-defense.png',
      registerUrl: 'https://bit.ly/IBOH26_AD_RegistrationForm_FSECSS',
    },
  ],

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
