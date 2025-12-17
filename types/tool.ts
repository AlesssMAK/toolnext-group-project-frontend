export interface Feedback {
  _id: string ;
}

export interface Tool {
  _id: string ;
  owner: string ;
  category: string ;
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

export type ToolsResponse = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  tools: Tool[];
};

export type CategoriesResponse = {
  status: string;
  data: {
    _id: string;
    title: string;
  }[];
};