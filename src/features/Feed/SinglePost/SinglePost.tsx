import React, { useState, useEffect } from "react";
import Image from "components/Image/Image";
import { useParams } from "react-router-dom";
import { IPost } from "./types";
import css from "./styles.module.css";

const SinglePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    author: "",
    date: "",
    image: "",
    content: "",
  });
  const { postId } = useParams() as { postId: string };

  useEffect(() => {
    fetch("URL")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch status");
        }
        return res.json();
      })
      .then((resData: IPost) => {
        setPostData({
          title: resData.post.title,
          author: resData.post.creator.name,
          date: new Date(resData.post.createdAt).toLocaleDateString("en-US"),
          content: resData.post.content,
          image: resData.post.image,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className={css.singlePost}>
      <h1>{postData.title}</h1>
      <h2 className={css.title}>
        Created by {postData.author} on {postData.date}
      </h2>
      <div className={css.image}>
        <Image contain imageUrl={postData.image} />
      </div>
      <p>{postData.content}</p>
    </section>
  );
};

export default SinglePost;
