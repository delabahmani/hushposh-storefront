
export type User = {
  name: string | null,
  email: string,
  favoriteIds: string[],
}

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string;
}