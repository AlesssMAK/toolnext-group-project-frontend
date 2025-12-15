"use client";

import FilterBar from "./FilterBar/FilterBar";
import ToolsGrid from "./ToolsGrid/ToolsGrid";
import styles from "./ToolsPage.module.css";

import { useToolsPagination } from "@/hooks/useToolsPagination";

export default function ToolsPage() {
  const { tools, loading, hasMore, loadMore } = useToolsPagination();

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Всі інструменти</h1>

      <FilterBar />

      <ToolsGrid
        tools={tools}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </section>
  );
}
