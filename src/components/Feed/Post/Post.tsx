import React from "react";
import Button from "components/Button";
import { Props } from "./types";
import css from "./styles.module.css";

const Post: React.FC<Props> = ({
  title,
  id,
  author,
  date,
  onDelete,
  onStartEdit,
}) => (
  <article className={css.post}>
    <header>
      <h3 className={css.post__meta}>
        Posted by {author} on {date}
      </h3>
      <h1 className={css.post__title}>{title}</h1>
    </header>
    {/* <div className="post__image">
      <Image imageUrl={image} contain />
    </div>
    <div className="post__content">{content}</div> */}
    <div className={css.post__actions}>
      <Button mode="flat" link={id}>
        View
      </Button>
      <Button mode="flat" onClick={onStartEdit}>
        Edit
      </Button>
      <Button mode="flat" design="danger" onClick={onDelete}>
        Delete
      </Button>
    </div>
  </article>
);

export default Post;
