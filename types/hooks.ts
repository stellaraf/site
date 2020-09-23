interface UseScrollPositionPoint {
  x: number;
  y: number;
}
export interface ActiveSectionEffectProps {
  prevPos: UseScrollPositionPoint;
  currPos: UseScrollPositionPoint;
}

export interface UsePageContent {
  error: string | null;
  title: React.FC;
  subtitle: React.FC;
  body: React.FC | null;
  buttonText?: string;
  buttonLink?: string;
  showButton: boolean;
  subsections: React.FC;
}

export type TitleMe = (t: string) => string;
