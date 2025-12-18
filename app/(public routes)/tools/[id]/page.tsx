import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTools } from '@/lib/api/tools';

/* ---------------- TYPES ---------------- */

type PageProps = {
  params: {
    id: string;
  };
};

/* ---------------- HELPERS ---------------- */

async function getToolById(id: string) {
  const tools = await getTools();
  return tools.find((tool: any) => tool._id === id);
}

/* ---------------- METADATA ---------------- */

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const tool = await getToolById(params.id);

  if (!tool) {
    return {
      title: 'Інструмент не знайдено | ToolNext',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${tool.name} — оренда | ToolNext`,
    description: tool.description,
    openGraph: {
      title: tool.name,
      description: tool.description,
      url: `https://toolnext.ua/tools/${params.id}`,
      siteName: 'ToolNext',
      type: 'article',
      images: [
        {
          url: tool.images,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/* ---------------- PAGE ---------------- */

const ToolDetails = async ({ params }: PageProps) => {
  const tool = await getToolById(params.id);

  if (!tool) {
    notFound();
  }

  // ⛔ тимчасово, щоб не блокувати Task #77
  return (
    <section>
      <h1>{tool.name}</h1>
      <p>{tool.description}</p>
    </section>
  );
};

export default ToolDetails;
