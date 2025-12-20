'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ToolGallery from '@/components/ToolGallery/ToolGallery';
import ToolInfoBlock from '@/components/ToolInfoBlock/ToolInfoBlock';
import { getToolById } from '@/lib/api/tools';

import styles from './ToolPreview.module.css';
import { getUserById } from '@/lib/api/serverApi';

export default function ToolDetails() {
  const params = useParams();
  const toolId = params?.toolId as string;

  const { data: tool, isError } = useQuery({
    queryKey: ['tool', toolId],
    queryFn: () => getToolById(toolId),
  });

  const { data: owner } = useQuery({
    queryKey: ['user', tool?.owner],
    queryFn: () => getUserById(tool!.owner),
    enabled: !!tool?.owner,
  });

  if (isError || !tool) {
    return <p className={styles.notFound}>Sorry, tool not found!</p>;
  }

  return (
    <section className={`${styles.page} container`}>
      <ToolGallery images={[tool.images]} />
      <ToolInfoBlock tool={tool} owner={owner} />
    </section>
  );
}
