export interface FeedState {
  isEditing: boolean;
  posts: any;
  totalPosts: number;
  editPost: any;
  status: string;
  postPage: number;
  postsLoading: boolean;
  editLoading: boolean;
  error?: Error | null;
  // error: { message: string } | null;
}

export interface IPost {
  post: {
    title: string;
    creator: {
      name: string;
    };
    createdAt: string;
    content: string;
    image: string;
  };
}

export enum DirectionType {
  next = "next",
  previous = "previous",
}
