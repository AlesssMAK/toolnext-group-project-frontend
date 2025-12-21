import { Feedback } from './feedback';

export interface Tool {
  _id: string;
  owner: string;
  category: string;
  name: string;
  description: string;
  pricePerDay: number;
  images: string;
  rating: number;
  specifications: Record<string, string>;
  rentalTerms: string;
  bookedDates: string[];
  feedbacks: Feedback[];
}

export interface UserToolsResponse {
  data: {
    tools: Tool[];
    pagination: {
      currentPage: number;
      perPage: number;
      totalTools: number;
      totalPages: number;
    };
  };
}
