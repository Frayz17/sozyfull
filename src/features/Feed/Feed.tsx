import React, { FormEvent, useEffect, useState } from "react";
import Post from "components/Feed/Post/Post";
import Button from "components/Button/Button";
import FeedEdit from "components/Feed/FeedEdit/FeedEdit";
import Input from "components/Form/Input/Input";
import Paginator from "components/Paginator/Paginator";
import Loader from "components/Loader/Loader";
import ErrorHandler from "components/ErrorHandler/ErrorHandler";
import { DirectionType, FeedState } from "./types";

const initialState: FeedState = {
  isEditing: false,
  posts: [],
  totalPosts: 0,
  editPost: null,
  status: "",
  postPage: 1,
  postsLoading: true,
  editLoading: false,
  error: null,
};

const Feed = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    fetch("URL")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch user status.");
        }
        return res.json();
      })
      .then((resData) => {
        setState({ ...state, status: resData.status });
      })
      .catch(catchError);

    loadPosts();
  }, []);

  const loadPosts = (direction?: DirectionType) => () => {
    if (direction) {
      setState({ ...state, postsLoading: true, posts: [] });
    }
    let page = state.postPage;
    if (direction === DirectionType.next) {
      page++;
      setState({ ...state, postPage: page });
    }
    if (direction === DirectionType.previous) {
      page--;
      setState({ ...state, postPage: page });
    }
    fetch("URL")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch posts.");
        }
        return res.json();
      })
      .then((resData) => {
        setState({
          ...state,
          posts: resData.posts,
          totalPosts: resData.totalItems,
          postsLoading: false,
        });
      })
      .catch(catchError);
  };

  const statusUpdateHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("URL")
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Can't update status!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch(catchError);
  };

  const newPostHandler = () => {
    setState({ ...state, isEditing: true });
  };

  const startEditPostHandler = (postId: number) => () => {
    const loadedPost = { ...state.posts.find((p: any) => p._id === postId) };

    setState({
      ...state,
      isEditing: true,
      editPost: loadedPost,
    });
  };

  const cancelEditHandler = () => {
    setState({ ...state, isEditing: false, editPost: null });
  };

  const finishEditHandler = (postData: any) => {
    setState({
      ...state,
      editLoading: true,
    });
    // Set up data (with image!)
    let url = "URL";
    if (state.editPost) {
      url = "URL";
    }

    fetch(url)
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a post failed!");
        }
        return res.json();
      })
      .then((resData) => {
        const post = {
          _id: resData.post._id,
          title: resData.post.title,
          content: resData.post.content,
          creator: resData.post.creator,
          createdAt: resData.post.createdAt,
        };
        setState((prevState) => {
          let updatedPosts = [...prevState.posts];
          if (prevState.editPost) {
            const postIndex = prevState.posts.findIndex(
              (p: any) => p._id === prevState.editPost._id
            );
            updatedPosts[postIndex] = post;
          } else if (prevState.posts.length < 2) {
            updatedPosts = prevState.posts.concat(post);
          }
          return {
            ...state,
            posts: updatedPosts,
            isEditing: false,
            editPost: null,
            editLoading: false,
          };
        });
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          isEditing: false,
          editPost: null,
          editLoading: false,
          error: err,
        });
      });
  };

  const statusInputChangeHandler = (input: any, value: string) => {
    setState({ ...state, status: value });
  };

  const deletePostHandler = (postId: number) => () => {
    setState({ ...state, postsLoading: true });
    fetch("URL")
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a post failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setState((prevState) => {
          const updatedPosts = prevState.posts.filter(
            (p: any) => p._id !== postId
          );
          return { ...state, posts: updatedPosts, postsLoading: false };
        });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, postsLoading: false });
      });
  };

  const errorHandler = () => {
    setState({ ...state, error: null });
  };

  const catchError = (error: Error) => {
    setState({ ...state, error: error });
  };

  return (
    <>
      <ErrorHandler error={state.error} onHandle={errorHandler} />
      <FeedEdit
        editing={state.isEditing}
        selectedPost={state.editPost}
        loading={state.editLoading}
        onCancelEdit={cancelEditHandler}
        onFinishEdit={finishEditHandler}
      />
      <section className="feed__status">
        <form onSubmit={statusUpdateHandler}>
          <Input
            type="text"
            placeholder="Your status"
            control="input"
            onChange={statusInputChangeHandler}
            value={state.status}
          />
          <Button mode="flat" type="submit">
            Update
          </Button>
        </form>
      </section>
      <section className="feed__control">
        <Button mode="raised" design="accent" onClick={newPostHandler}>
          New Post
        </Button>
      </section>
      <section className="feed">
        {state.postsLoading && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Loader />
          </div>
        )}
        {state.posts.length <= 0 && !state.postsLoading ? (
          <p style={{ textAlign: "center" }}>No posts found.</p>
        ) : null}
        {!state.postsLoading && (
          <Paginator
            onPrevious={loadPosts(DirectionType.previous)}
            onNext={loadPosts(DirectionType.next)}
            lastPage={Math.ceil(state.totalPosts / 2)}
            currentPage={state.postPage}
          >
            {state.posts.map((post: any) => (
              <Post
                key={post._id}
                id={post._id}
                author={post.creator.name}
                date={new Date(post.createdAt).toLocaleDateString("en-US")}
                title={post.title}
                image={post.imageUrl}
                content={post.content}
                onStartEdit={startEditPostHandler(post._id)}
                onDelete={deletePostHandler(post._id)}
              />
            ))}
          </Paginator>
        )}
      </section>
    </>
  );
};

export default Feed;
