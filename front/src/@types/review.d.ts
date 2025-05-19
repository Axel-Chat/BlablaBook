export interface IUserPreview {
  id: number;
  name: string;
}

export interface IReview {
  id: number;
  rating: number | null;
  title: string | null;
  comment: string | null;
  user: IUserPreview;
  book_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IReviewApiResponse {
  book_id: number;
  reviews: IReview[];
}

export interface INewReviewPayload {
  rating?: number;
  title?: string;
  comment?: string;
}