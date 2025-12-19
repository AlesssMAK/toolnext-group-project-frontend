export interface Feedback {
  _id: string;
  name: string;
  description: string;
  rating: number;
  toolId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface feedbacksRequestProps {
  page: number;
  toolId?: string;
  userId?: string;
}

export interface feedbacksProps {
  feedbacks: Feedback[];
  page: number;
  totalPages: number;
  toolId?: string;
  userId?: string;
}
