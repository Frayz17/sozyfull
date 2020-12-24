export interface Props {
  title: string;
  onCancelModal: () => void;
  onAcceptModal: () => void;
  acceptEnabled: boolean;
  isLoading?: boolean;
}
