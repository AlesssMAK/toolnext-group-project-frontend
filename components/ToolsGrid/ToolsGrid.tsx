import styles from "./ToolsGrid.module.css";
import { ToolCard } from "@/components/ToolCard/ToolCard";
import { Tool } from "@/types/tool";

type Props = {
  tools: Tool[];
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
};

export default function ToolsGrid({
  tools,
  hasMore,
  loading,
  onLoadMore,
}: Props) {
  return (
    <div className={styles.grid_cover}>
      <div className={styles.grid}>
        {tools.map(tool => (
          <ToolCard key={tool._id} tool={tool} />
        ))}
      </div>

      
        <button
          className={styles.loadMoreBtn}
          onClick={onLoadMore}
          disabled={!hasMore}
        >
           {loading ? "Завантаження..." : "Показати більше"}
        </button>

    </div>
  );
}