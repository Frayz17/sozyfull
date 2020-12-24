export interface Props {
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
  design?: string;
  mode?: string;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}
