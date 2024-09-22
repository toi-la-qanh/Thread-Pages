import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faImage } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

const CreatePost = ({ isOpen }) => {
  const { user, csrfToken } = useAuth();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [close, setClose] = useState(false);
  const closeForm = () => {
    setClose(true);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  const [errors, setErrors] = useState([]);
  console.log(user);

  const PostButton = async (event) => {
    event.preventDefault();
    await csrfToken();
    try {
      const result = await axios.post(
        "http://localhost:8000/api/post",
        {
          title,
          content,
          image,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      alert("Đăng bài thành công !");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          console.log("Unprocessable Content:", error.response);
          setErrors(error.response.data.errors);
        } else {
          console.error("Failed to login:", error.response);
          setErrors(error.response);
        }
      } else {
        console.error("Error:", error.message);
        setErrors(error.message);
      }
    }
  };

  return (
    <>
      {!isOpen ? null : (
        <div
          className={`${
            close ? "hidden" : "flex"
          } gap-2 h-[700px] overflow-auto w-full px-6 py-3 bg-white border border-gray-300`}
        >
          <form
            action=""
            className="w-full"
            onSubmit={PostButton}
            method="POST"
          >
            {/* <div className="flex justify-end">
              <button onClick={closeForm}>
                <FontAwesomeIcon className="text-2xl hover:text-red-600" icon={faCircleXmark}/>
              </button>
            </div> */}
            <div className="flex flex-row gap-2">
              <img
                src={`http://localhost:8000/storage/${user.profile_image}`}
                alt=""
                className="w-10 h-10 rounded-full border border-gray-500 object-cover p-1 aspect-square"
              />
              <div className="flex flex-col leading-7 w-full">
                <h2 className="font-bold font-mono">{user.display_name}</h2>
                <input
                  type="text"
                  placeholder="Tiêu đề"
                  name="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="outline-none"
                />
                <p className="text-red-600">{errors.title}</p>
                <input
                  type="text"
                  placeholder="Nội dung: Hôm nay bạn nghĩ gì ?"
                  name="content"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  className="outline-none"
                />
                <p className="text-red-600">{errors.content}</p>
                <div className="w-full flex flex-row items-center gap-2 mt-7">
                  <div className="">Phương tiện:</div>
                  <label htmlFor="imageInput">
                    <FontAwesomeIcon
                      className="text-gray-400 hover:text-black"
                      icon={faImage}
                    />
                  </label>
                  <input
                    type="file"
                    id="imageInput"
                    className="hidden"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            {image && (
              <img src={image} alt="Uploaded" className="h-[500px] w-full" />
            )}
            <div className="flex justify-end mt-10">
              <button className="flex justify-center rounded-lg border border-gray-400 w-14 items-center hover:bg-gray-400">
                Đăng
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreatePost;
