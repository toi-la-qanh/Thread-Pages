import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
  faComment,
  faHeart,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";

const Search = () => {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [active, setActive] = useState("posts");
  const [loading, setLoading] = useState(false);
  const apiURL = "http://localhost:8000/api";
  const fetchPosts = async () => {
    if (input) {
      const response = await axios.get(
        `${apiURL}/search/post/${input}`
      );
      if (response) {
        setLoading(false);
        setPosts(response.data);
      } else {
        setLoading(true);
      }
    }
  };
  const fetchUsers = async () => {
    if (input) {
      const response = await axios.get(
        `${apiURL}/search/user/${input}`
      );
      if (response) {
        setLoading(false);
        setUsers(response.data);
      } else {
        setLoading(true);
      }
    }
  };
  const fetchComments = async () => {
    if (input) {
      const response = await axios.get(
        `${apiURL}/search/comment/${input}`
      );
      if (response) {
        setLoading(false);
        setComments(response.data);
      } else {
        setLoading(true);
      }
    }
  };
  useEffect(() => {
    fetchPosts();
    fetchUsers();
    fetchComments();
  });
  const showPosts = () => setActive("posts");
  const showUsers = () => setActive("users");
  const showComments = () => setActive("comments");

  if (loading)
    return <div className="text-center mt-5 h-screen">Chờ chút nhé ...</div>;

  return (
    <>
      <div className="px-6">
        <div className="w-full bg-gray-50 border-gray-300 border h-12 items-center flex gap-3 px-5 rounded-2xl mt-6">
          <FontAwesomeIcon className="text-gray-500" icon={faSearch} />
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="outline-none bg-inherit"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex justify-between mt-7 tracking-wide border-b h-12">
        <button
          className={`w-36 border-black ${
            active === "posts"
              ? "border-b font-semibold"
              : "border-none text-gray-400"
          }`}
          onClick={showPosts}
        >
          Bài viết
        </button>
        <button
          className={`w-36 border-black ${
            active === "users"
              ? "border-b font-semibold"
              : "border-none text-gray-400"
          }`}
          onClick={showUsers}
        >
          Tài khoản
        </button>
        <button
          className={`w-36 border-black ${
            active === "comments"
              ? "border-b font-semibold"
              : "border-none text-gray-400"
          }`}
          onClick={showComments}
        >
          Bình luận
        </button>
      </div>
      <div className="mt-3">
        {active === "posts" && (
          <div>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.post_id}>
                  <NavLink to={`/post/${post.post_id}`}>
                    <div className="flex flex-row items-center gap-2">
                      <img
                        src={`http://localhost:8000/storage/app/public${post.users.profile_image}`}
                        alt=""
                        className="w-10 h-10 rounded-full border border-gray-500 object-cover p-1 aspect-square"
                      />
                      <div>{post.users.display_name}</div>
                    </div>
                    <h2 className="font-bold">{post.title}</h2>
                    <p>{post.content}</p>
                  </NavLink>
                  <div className="flex flex-row gap-10 text-xl">
                    <button>
                      <FontAwesomeIcon
                        className="hover:text-gray-500"
                        icon={faHeart}
                      />
                    </button>
                    <button>
                      <FontAwesomeIcon
                        className="hover:text-gray-500"
                        icon={faComment}
                      />
                    </button>
                    <button>
                      <FontAwesomeIcon
                        className="hover:text-gray-500"
                        icon={faRetweet}
                      />
                    </button>
                    <button>
                      <FontAwesomeIcon
                        className="hover:text-gray-500"
                        icon={faShareFromSquare}
                      />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Không tìm thấy bài viết</p>
            )}
          </div>
        )}
        {active === "users" && (
          <div>
            {users.length > 0 ? (
              users.map((user, index) => <div key={index}>{user.username}</div>) // Adjust rendering based on user structure
            ) : (
              <p className="text-center">Không tìm thấy tài khoản</p>
            )}
          </div>
        )}
        {active === "comments" && (
          <div>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index}>{comment.content}</div>
              )) // Adjust rendering based on comment structure
            ) : (
              <p className="text-center">Không tìm thấy bình luận</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
