// import BookingForm from "@/components/BookingToolForm/BookingToolForm";
import BookingConfirmationPage from "./BookingConfirmationPage";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Підтвердження бронювання | ToolNext',
  description: 'Ваш інструмент успішно заброньовано. Власник скоро з вами зв’яжеться.',
};

export default function Page() {
  return <BookingConfirmationPage />;
  // return <BookingForm />
}