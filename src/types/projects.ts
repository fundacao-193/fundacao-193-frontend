export interface Project {
  id: number;
  title: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  acf?: {
    impacto?: string;
    project_image?: string;
  };
}
