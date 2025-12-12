import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "./RatingIcon.module.css";

type RatingProps = {
  value: number;
  size?: number;
};

export const Rating = ({ value, size = 24 }: RatingProps) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const full = value >= i;
    const half = !full && value >= i - 0.5;

    if (full) {
      stars.push(
        <AiFillStar key={i} size={size} className={styles.star} />
      );
    } else if (half) {
      stars.push(
        <div key={i} className={styles.halfWrapper} style={{ width: size, height: size }}>
          <AiOutlineStar size={size} className={styles.starOutline} />
          <AiFillStar
            size={size}
            className={styles.starHalf}
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      );
    } else {
      stars.push(
        <AiOutlineStar key={i} size={size} className={styles.star} />
      );
    }
  }

  return <div className={styles.wrapper}>{stars}</div>;
};
