export interface IProducts {
  id: string;
  title: string;
  price: number;
  description: string;
  categoryId: string;
  image: string;
  rating: { rate: number; count: number };
}

