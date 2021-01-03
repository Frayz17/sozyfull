export interface Props {
  id: string;
  onChange: (id: any, value: string, file: FileList) => void;
  label?: string;
  valid?: boolean;
  touched?: boolean;
  onBlur?: () => void;
}
