'use client';

import { useEffect, useState } from "react";
import { getTools } from "@/lib/api/tools";
import { Tool } from "../../types/tool";
import { ToolCard } from "../ToolCard/ToolCard";
import styles from "./FeaturedToolsBlock.module.css";

export const FeaturedToolsBlock: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const toolsArray = await getTools();
        setTools(toolsArray.slice(0, 8));
      } catch (err) {
        console.log("Error loading tools", err);
      }
    };

    load();
  }, []);

  return (
    <section className={styles.featured}>
      <h2 className={styles.featured_title}>Популярні інструменти</h2>

      <div className={styles.featured_grid}>
        {tools.map(tool => (
          <ToolCard key={tool._id} tool={tool} />
        ))}
      </div>

      <button className={styles.featured_btn}>До всіх інструментів</button>
    </section>
  );
};