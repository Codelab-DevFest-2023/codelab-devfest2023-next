export interface Review {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: any;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}
