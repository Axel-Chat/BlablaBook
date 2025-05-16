export interface ICategory {
  id: number;
  name: string;
}

// Interface for one book
export interface IBook {
  id: number;
  title: string;
  isbn: string;
  description: string | null;
  published: number | null;
  cover_url: string | null;
  page_count: number;
  categories: ICategory[];
  authors: IAuthor[];
  users_has_read: IUsers;
  users_need_to_read: IUsers;
}

export type IBooks = IBook[];

export type IUsers = IUser[];

export interface IAuthor {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  books_already_read: IBook[];
  books_wish_read: IBook[];
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  currentPassword?: string;
  confirmPassword?: string;
  password?: string;
}
