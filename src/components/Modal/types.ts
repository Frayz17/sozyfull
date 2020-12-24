export interface Props {
  title: string;
  onCancelModal: () => void;
  onAcceptModal: () => void;
  acceptEnabled: () => void;
  isLoading: boolean;
}
