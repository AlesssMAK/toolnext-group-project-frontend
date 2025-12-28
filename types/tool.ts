import { Feedback } from './feedback';

export interface BookedDateRange {
  startDate: string;
  endDate: string;
}

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
  bookedDates: BookedDateRange[];
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

export interface Category {
  _id: string;
  title: string;
}

export interface ToolsWithPaginationRequest {
  page: number;
  limit: number;
  search?: string;
  categories?: string;
}
