"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategorySelect, { Option } from "../CategorySelect/CategorySelect";
import { getCategories } from "@/lib/api/serverApi";
import styles from "./FilterBar.module.css";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<Option[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(err =>
        console.error("Failed to load categories:", err)
      );
  }, []);

  useEffect(() => {
    if (!categories.length) return;

    const categoryParam = searchParams.get("category");

    if (!categoryParam) {
      setSelectedCategories([]);
      return;
    }

    const idsFromUrl = categoryParam.split(",");

    setSelectedCategories(
      categories.filter(cat =>
        idsFromUrl.includes(cat.value)
      )
    );
  }, [categories, searchParams]);

  const handleChange = (values: Option[]) => {
    setSelectedCategories(values);

    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (values.length === 0) {
      params.delete("category");
    } else {
      params.set(
        "category",
        values.map(v => v.value).join(",")
      );
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className={styles.filterBar}>
      <CategorySelect
        options={categories}
        value={selectedCategories}
        onChange={handleChange}
      />

      {selectedCategories.length > 0 && (
        <button
          type="button"
          className={styles.resetFilter}
          onClick={() => router.push("?")}
        >
          Скинути фільтри
        </button>
      )}
    </div>
  );
}
