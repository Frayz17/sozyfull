export interface Props {
  isAuth: boolean;
  onLogout: () => void;
  onChoose?: () => void;
  mobile?: boolean;
}
