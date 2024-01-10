export interface Category {
  id: number;
  name: string;
}

export interface Currency {
  id: number;
  name: string;
}

export interface Wish {
  archive: boolean;
  categoryId: Category['id'];
  currency: Currency['name'];
  currencyId: Currency['id'];
  id: number;
  link: string;
  name: string;
  price: number;
  sort: number;
}

export interface Price {
  id: number;
  wishId: Wish['id'];
  value: number;
  date: string;
}

export interface User {
  accessToken: string;
  user: {
    id: number;
    login: string;
    email: string;
  };
}

export interface Data {
  categories: Category[];
  currencies: Currency[];
  wishes: Wish[];
  prices: Price[];
  users: User[];
}
