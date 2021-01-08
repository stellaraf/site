export interface IIf {
  condition: boolean;
  render?: () => JSX.Element;
  children: React.ReactElement;
}
