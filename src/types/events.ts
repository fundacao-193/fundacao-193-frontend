export type Event = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: {
    event_summary?: string;
    event_start_date?: string; // YYYY-MM-DD
    event_end_date?: string;   // YYYY-MM-DD
    event_location?: string;
    event_registration_url?: string;
    event_is_featured?: boolean;
    event_featured_image?: string; // URL
  };
};
