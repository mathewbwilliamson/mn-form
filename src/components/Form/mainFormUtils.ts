import { MainForm } from "../../types/mainForm";

export const createFormFromData = (data: MainForm) => {
  const form = new FormData();

  form.append("firstName", data.firstName);
  form.append("lastName", data.lastName);
  form.append("guardianEmailAddress", data.guardianEmailAddress);
  form.append("childsName", data.childsName);
  form.append("phoneNumber", data.phoneNumber);
  form.append("creditCardNumber", data.creditCardNumber);
  form.append("expirationDate", data.expirationDate);
  form.append("cvv", data.cvv);
  form.append("billingAddressStreet", data.billingAddressStreet);
  form.append("billingAddressCity", data.billingAddressCity);
  form.append("billingAddressState", data.billingAddressState);
  form.append("billingAddressZipCode", data.billingAddressZipCode);
  form.append("authorization", `${data.authorization}`);

  return form;
};
