"use server";
import { getTools } from "@/lib/api/serverApi";
import { ToolCard } from "../ToolCard/ToolCard";
import { Tool } from "@/types/tool";
import Link from "next/link";
import styles from "./FeaturedToolsBlock.module.css";

export default async function FeaturedToolsBlock() {
  let tools: Tool[] = [];

  try {
    tools = await getTools();
  } catch (error) {
    console.error("Error loading tools", error);
  }

  return (
    <section className={styles.featured}>
      <h2 className={styles.featured_title}>Популярні інструменти</h2>

      <div className={styles.featured_grid}>
        {tools.map(tool => (
          <ToolCard key={tool._id} tool={tool} />
        ))}
      </div>

      <Link href="/tools" className={styles.featured_btn}>
        До всіх інструментів
      </Link>
    </section>
  );
}