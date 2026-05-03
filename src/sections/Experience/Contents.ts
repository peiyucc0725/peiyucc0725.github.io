export const getExperiences = (t: any) => [
  {
    company: t('experience.bxbCompany'),
    period: "2020.05 — 2026.02",
    duration: t('experience.bxbDuration'),
    roles: [
      { title: t('experience.bxbRolesTitle1'), date: "2023.11 — 2026.02" },
      { title: t('experience.bxbRolesTitle2'), date: "2020.05 — 2023.10" }
    ],
    tech: ["Vue 3", "Vite", "Pinia", "Canvas", "Fabric.js", "WebSocket", "Web Audio API", "Electron"],
    description: [
      t('experience.bxbDescription1'),
      t('experience.bxbDescription2'),
      t('experience.bxbDescription3'),
      t('experience.bxbDescription4')
    ],
  },
  {
    company: t('experience.KSDCompany'),
    period: "2018.09 — 2020.02",
    duration: t('experience.KSDDuration'),
    roles: [
      { title: t('experience.KSDRolesTitle'), date: "2018.09 — 2020.02" }
    ],
    tech: ["Vue 2", "Nuxt.js", "PHP", "Python Flask", "MapBox"],
    description: [
      t('experience.KSDDescription1'),
      t('experience.KSDDescription2'),
      t('experience.KSDDescription3')
    ],
  },
  {
    company: t('experience.YEPCompany'),
    period: "2017.07 — 2017.08",
    duration: t('experience.YEPDuration'),
    roles: [
      { title: t('experience.YEPRolesTitle'), date: "2017.07 — 2017.08" }
    ],
    tech: ["jQuery", "MVC Architecture", "G Suite API"],
    description: [
      t('experience.YEPDescription1'),
      t('experience.YEPDescription2')
    ],
  }
];