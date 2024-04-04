export interface Product {
  name: string;
  quantity: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Welcome {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: Date;
}
