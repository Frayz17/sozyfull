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
