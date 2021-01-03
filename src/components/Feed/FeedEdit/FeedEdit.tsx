import React, { useEffect, useState } from "react";
import Backdrop from "components/Backdrop/Backdrop";
import Modal from "components/Modal/Modal";
import Input from "components/Form/Input/Input";
import FilePicker from "components/Form/FilePicker";
import Image from "components/Image/Image";
import { generateBase64FromImage } from "utils/image";
import { FormInputs, Props } from "./types";
import { POST_FORM_DEFAULT } from "./data";

const FeedEdit: React.FC<Props> = ({
  editing,
  selectedPost,
  onCancelEdit,
  onFinishEdit,
  loading,
}) => {
  const [postForm, setPostForm] = useState(POST_FORM_DEFAULT);
  const [formIsValid, setFormIsValid] = useState(false);
  const [imagePreview, setImagePreview] = useState<any>(null);

  useEffect(() => {
    setPostForm({
      title: {
        ...postForm.title,
        value: selectedPost.title,
        valid: true,
      },
      image: {
        ...postForm.image,
        value: selectedPost.image,
        valid: true,
      },
      content: {
        ...postForm.content,
        value: selectedPost.content,
        valid: true,
      },
    });
  }, [selectedPost]);

  const postInputChangeHandler = (
    input: FormInputs,
    value: string,
    files: FileList | undefined
  ) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then((b64) => {
          setImagePreview({ b64 });
        })
        .catch((e) => {
          setImagePreview({ imagePreview: null });
        });
    }

    let isValid = true;
    for (const validator of postForm[input].validators) {
      isValid = isValid && validator(value);
    }
    const updatedForm = {
      ...postForm,
      [input]: {
        ...postForm[input],
        valid: isValid,
        value: files ? files[0] : value,
      },
    };
    const formIsValid =
      updatedForm.title.valid &&
      updatedForm.content.valid &&
      updatedForm.image.valid;

    setPostForm(updatedForm);
    setFormIsValid(formIsValid);
  };

  const inputBlurHandler = (input: FormInputs) => () => {
    setPostForm({
      ...postForm,
      [input]: {
        ...postForm[input],
        touched: true,
      },
    });
  };

  const cancelPostChangeHandler = () => {
    setFormIsValid(false);
    onCancelEdit();
  };

  const acceptPostChangeHandler = () => {
    const post = {
      title: postForm.title.value,
      image: postForm.image.value,
      content: postForm.content.value,
    };
    onFinishEdit(post);

    setPostForm(POST_FORM_DEFAULT);
    setFormIsValid(false);
    setImagePreview(null);
  };

  return editing ? (
    <>
      <Backdrop onClick={cancelPostChangeHandler} />
      <Modal
        title="New Post"
        acceptEnabled={formIsValid}
        onCancelModal={cancelPostChangeHandler}
        onAcceptModal={acceptPostChangeHandler}
        isLoading={loading}
      >
        <form>
          <Input
            id="title"
            label="Title"
            control="input"
            onChange={postInputChangeHandler}
            onBlur={inputBlurHandler(FormInputs.title)}
            valid={postForm["title"].valid}
            touched={postForm["title"].touched}
            value={postForm["title"].value}
          />
          <FilePicker
            id="image"
            label="Image"
            onChange={postInputChangeHandler}
            onBlur={inputBlurHandler(FormInputs.image)}
            valid={postForm["image"].valid}
            touched={postForm["image"].touched}
          />
          <div className="new-post__preview-image">
            {!imagePreview && <p>Please choose an image.</p>}
            {imagePreview && <Image imageUrl={imagePreview} contain left />}
          </div>
          <Input
            id="content"
            label="Content"
            control="textarea"
            rows={5}
            onChange={postInputChangeHandler}
            onBlur={inputBlurHandler(FormInputs.content)}
            valid={postForm[FormInputs.content].valid}
            touched={postForm[FormInputs.content].touched}
            value={postForm[FormInputs.content].value}
          />
        </form>
      </Modal>
    </>
  ) : null;
};

export default FeedEdit;
