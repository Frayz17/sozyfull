export interface Props {
  id: string;
  onChange: (id: any, value: string, files?: FileList) => void;
  value: string | number;
  label?: string;
  control?: "input" | "textarea";
  type?: string;
  valid?: boolean;
  touched?: boolean;
  onBlur?: () => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}
