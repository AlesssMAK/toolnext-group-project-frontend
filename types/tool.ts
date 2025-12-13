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