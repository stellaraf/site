import * as ReactGA from 'react-ga';
import type { EventArgs, InitializeOptions } from 'react-ga';

type RGA = typeof ReactGA;
type Effect = (ga: RGA) => void;

function useAnalytics(effect: Effect): void {
  if (typeof window !== 'undefined' && typeof process.env.NEXT_PUBLIC_GANALYTICS === 'string') {
    if (typeof effect === 'function') {
      effect(ReactGA);
    }
  }
}

function trackEvent(e: EventArgs) {
  useAnalytics(ga => {
    if (process.env.NODE_ENV === 'production') {
      ga.event(e);
    } else {
      console.log(
        `%cEvent %c${JSON.stringify(e)}`,
        'background: green; color: black; padding: 0.5rem; font-size: 0.75rem;',
        'background: black; color: green; padding: 0.5rem; font-size: 0.75rem; font-weight: bold;',
      );
    }
  });
}

function trackPage(path: string) {
  useAnalytics(ga => {
    if (process.env.NODE_ENV === 'production') {
      ga.pageview(path);
    } else {
      console.log(
        `%cPage View %c${path}`,
        'background: blue; color: white; padding: 0.5rem; font-size: 0.75rem;',
        'background: white; color: blue; padding: 0.5rem; font-size: 0.75rem; font-weight: bold;',
      );
    }
  });
}

function trackModal(path: string) {
  useAnalytics(ga => {
    if (process.env.NODE_ENV === 'production') {
      ga.modalview(path);
    } else {
      console.log(
        `%cModal View %c${path}`,
        'background: red; color: white; padding: 0.5rem; font-size: 0.75rem;',
        'background: white; color: red; padding: 0.5rem; font-size: 0.75rem; font-weight: bold;',
      );
    }
  });
}

function initializeAnalytics(trackingId: string) {
  let initializeOpts: InitializeOptions = {
    titleCase: false,
  };
  if (process.env.NEXT_PUBLIC_GANALYTICS_DEBUG === '1') {
    initializeOpts.debug = true;
  }
  useAnalytics(ga => {
    ga.initialize(trackingId, initializeOpts);
  });
}

export function useGoogleAnalytics() {
  return { trackEvent, trackModal, trackPage, initializeAnalytics, ga: ReactGA };
}
