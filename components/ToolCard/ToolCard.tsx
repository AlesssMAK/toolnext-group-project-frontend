import { Tool } from '../../types/tool';
import styles from './ToolCard.module.css';
import { Rating } from '../RatingIcon/RatingIcon';
import { ToolCardButton } from './ToolCardButton/ToolCardButton';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className={styles.tool_card}>
      <div className={styles.tool_card_image}>
        <img src={tool.images} alt={tool.name} />
      </div>

      <div className={styles.tool_card_content}>
        <div className={styles.tool_card_rating}>
          <Rating value={tool.rating} />
        </div>

        <h3 className={styles.tool_card_title}>{tool.name}</h3>

        <p className={styles.tool_card_price}>{tool.pricePerDay} грн/день</p>
      </div>
      <ToolCardButton toolId={tool._id} className={styles.tool_card_bottom} />
    </div>
  );
};
