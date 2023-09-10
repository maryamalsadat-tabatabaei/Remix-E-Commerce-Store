export interface Product {
  name: string;
  price: number;
  slug: {
    current: string;
  };
  description: string;
  imageUrl: string;
  author: string;
  pages: number;
}
