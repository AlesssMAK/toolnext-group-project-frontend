import css from './FeedbacksBlock.module.css';
import { Rating } from '../RatingIcon/RatingIcon';
import { Feedback } from '@/types/feedback';

interface FeedbackItemProps {
  feedback: Feedback;
}

const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  return (
    <div className={css.feedbackItemBox}>
      <Rating value={feedback.rating} />
      <p className={css.feedbackItemText}>{feedback.description}</p>
      <p className={css.feedbackItemName}>{feedback.name}</p>
    </div>
  );
};

export default FeedbackItem;
