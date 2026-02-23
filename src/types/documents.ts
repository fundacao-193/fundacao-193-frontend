/**
 * Tipo que representa um Documento vindo da API do WordPress
 * CPT: documento
 * Usado na página Documents.tsx
 */
export interface Document {
  id: number;
  title: {
    rendered: string;
  };
  acf?: {
    doc_file?: {
      url: string;
      filename: string;
      filesize: number;
    };
    doc_category?: DocumentCategory;
    doc_size?: string;
    doc_year?: string;
    doc_order?: number;
  };
}

export type DocumentCategory = 
  | 'Documentos Institucionais' 
  | 'Relatórios de Gestão' 
  | 'Termos de Referência' 
  | 'Normas e Procedimentos';
