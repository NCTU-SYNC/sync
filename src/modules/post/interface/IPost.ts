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
