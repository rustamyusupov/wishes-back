export interface Category {
  id: string;
  name: string;
}

export interface Currency {
  id: string;
  name: string;
}

export interface Wish {
  archive: boolean;
  categoryId: Category['id'];
  currencyId: Currency['id'];
  id: string;
  link: string;
  name: string;
  sort: number;
  userId: User['id'];
}

export interface Price {
  id: string;
  wishId: Wish['id'];
  value: number;
  date: string;
}

export interface User {
  id: string;
  login: string;
  email: string;
  password: string;
}

export interface Data {
  categories: Category[];
  currencies: Currency[];
  wishes: Wish[];
  prices: Price[];
  users: User[];
}

export interface CategoryWithWishes extends Category {
  wishes: Wish[];
}
