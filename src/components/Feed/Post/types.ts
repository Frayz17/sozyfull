export interface Props {
  id: string;
  author: string;
  title: string;
  date: string;
  onStartEdit: () => void;
  onDelete: () => void;
}
