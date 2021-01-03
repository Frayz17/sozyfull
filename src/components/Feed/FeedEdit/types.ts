export enum FormInputs {
  title = "title",
  image = "image",
  content = "content",
}

export interface InputElement {
  value: string;
  valid: boolean;
  touched: boolean;
  validators: ((value: string) => boolean)[];
}

export type SelectedPost = {
  [propName in FormInputs]: string;
};

export interface PostForm {
  [propType: string]: InputElement;
}

export interface Props {
  editing: boolean;
  selectedPost: SelectedPost;
  onCancelEdit: () => void;
  onFinishEdit: (post: SelectedPost) => void;
  loading: boolean;
}
