const functionalTheme = {
  primary: '#2b3c8f',
  secondary: '#2a174a',
  tertiary: '#b3e3f5',
  dark: '#161318',
  light: '#f0f0f0',
};
export const theme = {
  colors: {
    ...functionalTheme,
    gray: '#70707f',
    white: '#ffffff',
    black: '#000',
    green: '#48a9a6',
    red: '#ca2e55',
    yellow: '#E3B505',
    orange: '#F5AB00',
    pink: '#f08cae',
    blue: functionalTheme.primary,
    purple: functionalTheme.secondary,
    teal: functionalTheme.tertiary,
  },
  fonts: { body: 'Open Sans', mono: 'Fira Code' },
  fontWeights: {
    hairline: 300,
    thin: 300,
    light: 300,
    normal: 400,
    medium: 600,
    semibold: 600,
    bold: 800,
    extrabold: 800,
    black: 800,
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.25rem',
    '4xl': '1.5rem',
    '5xl': '1.75rem',
    '6xl': '2rem',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    '4xl': '4rem',
    '5xl': '5rem',
    '6xl': '6rem',
  },
};

export const nav = {
  left: [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'Cloud',
      link: '/cloud',
    },
    {
      title: 'Services',
      link: '/services',
    },
    {
      title: 'Consulting',
      link: '/consulting',
    },
  ],
  right: [{ title: 'About', link: '/about' }],
};

const stars = {
  particles: {
    type: 'circle',
    number: {
      value: 160,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    line_linked: {
      enable: true,
      opacity: 0.02,
      distance: 48,
    },
    move: {
      direction: null,
      random: true,
      speed: 0.25,
    },
    size: {
      value: 1,
      random: true,
    },
    opacity: {
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.05,
      },
    },
  },
  interactivity: {
    events: {
      onclick: {
        enable: true,
        mode: 'push',
      },
      onhover: {
        enable: true,
        mode: 'grab',
      },
    },
    modes: {
      push: {
        particles_nb: 1,
      },
      grab: {
        line_linked: {
          opacity: 0.2,
        },
        distance: 200,
      },
    },
  },
  retina_detect: true,
};

export default {
  siteSlogan: 'Fueling your digital velocity',
  theme: theme,
  nav: nav,
  stars: stars,
};
