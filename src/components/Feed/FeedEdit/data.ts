import { length, required } from "../../../utils/validators";

export const POST_FORM_DEFAULT = {
  title: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
  image: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  content: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
};
