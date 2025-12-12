import { Tool } from "../../types/tool";
import styles from "./ToolCard.module.css";
import { Rating } from "../RatingIcon/RatingIcon";

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
          <span className={styles.tool_card_reviews}>
            ({tool.feedbacks.length})
          </span>
        </div>

        <h3 className={styles.tool_card_title}>{tool.name}</h3>
    </div>
    <div className={styles.tool_card_bottom}>
        <p className={styles.tool_card_price}>{tool.pricePerDay} грн/день</p>

        <button className={styles.tool_card_btn}>Детальніше</button>
      </div>
    </div>
  );
};