import * as Yup from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const bookingSchema = Yup.object({
  firstName: Yup.string().trim().min(2).max(50).required(),
  lastName: Yup.string().trim().min(2).max(50).required(),
  phone: Yup.string().matches(/^\+?\d{10,14}$/).required(),
  endDate: Yup.object({
    start: Yup.date().required(),
    end: Yup.date().required().min(Yup.ref('start')),
  }).required(),
  city: Yup.string().trim().min(2).required(),
  novaPoshtaBranch: Yup.string().trim().min(1).required(),
});
