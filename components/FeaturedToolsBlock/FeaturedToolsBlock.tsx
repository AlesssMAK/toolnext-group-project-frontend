'use client';

import { useEffect, useState } from "react";
import { Tool } from "../../types/tool";
import { ToolCard } from "../ToolCard/ToolCard";
import styles from "./FeaturedToolsBlock.module.css";

export const FeaturedToolsBlock: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch("https://toolnext-group-project-backend.onrender.com/api/tools");
        const data = await res.json();

        const toolsArray = data.tools || [];

        setTools(toolsArray.slice(0, 8));
      } catch (error) {
        console.log("Error loading tools", error);
      }
    };

    fetchTools();
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