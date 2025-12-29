import AddEditToolForm from '@/components/AddEditToolForm/AddEditToolForm';
import css from "./CreateToolPage.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Публікація інструменту | ToolNext",
  description: "Створіть та опублікуйте інструмент на платформі ToolNext для оренди та бронювання.",
  metadataBase: new URL("https://toolnext-group-project-frontend.vercel.app"),
  openGraph: {
    title: "Публікація інструменту | ToolNext",
    description: "Додайте новий інструмент на платформі ToolNext.",
    url: "https://toolnext-group-project-frontend.vercel.app",
    siteName: "ToolNext",
    type: "website",
  },
};

const CreateToolPage = () => {
  return (
    <>
      <section >
        <div className="container">
          <h1 className={css.titleText}>Публікація інструменту</h1>
        <AddEditToolForm />
        </div>
      </section>
    </>
  );
};

export default CreateToolPage;
