import AddEditToolForm from '@/components/AddEditToolForm/AddEditToolForm';
import css from "./CreateToolPage.module.css";

const CreateToolPage = () => {
  return (
    <>
      <section className="container">
        <h1 className={css.titleText}>Публікація інструменту</h1>
        <AddEditToolForm />
      </section>
    </>
  );
};

export default CreateToolPage;
