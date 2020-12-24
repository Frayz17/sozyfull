interface Error {
  message: string;
}

export interface Props {
  error?: Error;
  onHandle: () => void;
}
