export interface Feedback {
  _id: string;
  name: string;
  description: string;
  rate: number;
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

export type FeedbacksVariant = 'home' | 'tool';

export interface FeedbacksBlockProps {
  toolId?: string;
  userId?: string;
  isOwner?: boolean;
  variant?: FeedbacksVariant;
}
