export interface Project {
  id: number;
  title: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  acf?: {
    impacto?: string;
  };
}
