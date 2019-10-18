export interface IPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  createdAt: string;
  isPopular: boolean;
  editing: boolean;
  editCount: number;
}

export interface INewPost {
  id: number;
  title: string;
  tags: string[];
  excerpt: string;
  quotes: string[];
  category: string;
  createdAt: string;
  isPopular: boolean;
  editing: boolean;
  editCount: number;
}
