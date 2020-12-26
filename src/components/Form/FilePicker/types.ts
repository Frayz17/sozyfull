export interface Props {
  id: string;
  onChange: (id: string, value: string, file: FileList | null) => void;
  label?: string;
  valid?: boolean;
  touched?: boolean;
  onBlur?: () => void;
}
