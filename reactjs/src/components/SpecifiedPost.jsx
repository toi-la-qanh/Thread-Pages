import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { useParams, NavLink } from "react-router-dom";
import { useLikePost, useLikeComment, useUnlikePost } from "./Like";
import { useCommentPost, useCommentOnComment } from "./Comment";
import { useAuth } from "../contexts/AuthContext";

const SpecifiedPost = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const likePost = useLikePost();
  const unlikePost = useUnlikePost();
  const [likeStatus, setLikeStatus] = useState(false);
  const commentPost = useCommentPost("");
  // const commentOnComment = useCommentOnComment();
  const [isFixed, setIsFixed] = useState(false);
  const inputRef = useRef(null);
  const handleLike = async (id) => {
    if (likeStatus) {
      await unlikePost(id);
      setLikeStatus(false);
    } else {
      await likePost(id);
      setLikeStatus(true);
    }
  };
  const [commentContent, setCommentContent] = useState();
  const handleComment = async(event) => {
    event.preventDefault();
    await commentPost({postID:id, content: commentContent});
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/post/${id}`
        );
        console.log(response);
        setPosts(response.data);
        setComments(response.data.comments);
        setLoading(false);
      } catch (err) {
        setError("Lỗi rồi !");
        setLoading(false);
      }
    };
    fetchPosts();
    handleLike();
    handleComment();
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFixed(!entry.isIntersecting);
      },
      { threshold: 1.0 }
    );

    if (inputRef.current) {
      observer.observe(inputRef.current);
    }

    return () => {
      if (inputRef.current) {
        observer.unobserve(inputRef.current);
      }
    };
  }, []);

  if (loading)
    return <div className="text-center mt-5 h-screen">Chờ chút nhé ...</div>;
  if (error) return <div className="text-center mt-5 h-screen">{error}</div>;

  return (
    <>
      <div className="px-6 py-3">
        <NavLink to={`/profile/${posts.user_id}`}>
          <div className="flex flex-row items-center gap-2">
            <img
              src={`http://localhost:8000/storage/${posts.users?.profile_image}`}
              alt=""
              className="w-10 h-10 rounded-full border border-gray-500 object-cover p-1 aspect-square"
            />
            <div>{posts.users.display_name}</div>
          </div>
        </NavLink>
        <h2 className="font-bold">{posts.title}</h2>
        <p>{posts.content}</p>
        <div className="flex justify-end text-gray-400">
          {posts.clicks} Lượt xem
        </div>
        <div className="flex flex-row gap-10 text-xl">
          <div className="flex gap-1 items-center">
            <button onClick={() => handleLike(posts.post_id)}>
              <FontAwesomeIcon
                className={`${
                  likeStatus ? "text-red-600 hover:text-red-300" : ""
                } hover:text-gray-500`}
                icon={faHeart}
              />
            </button>
            <p className="text-base">{posts.likes_count}</p>
          </div>
          <div className="flex gap-1 items-center">
            <button>
              <FontAwesomeIcon
                className="hover:text-gray-500"
                icon={faComment}
              />
            </button>
            <p className="text-base">{posts.comments_count}</p>
          </div>
          <div className="flex gap-1 items-center">
            <button>
              <FontAwesomeIcon
                className="hover:text-gray-500"
                icon={faRetweet}
              />
            </button>
            <p className="text-base">{posts.retweets_count}</p>
          </div>
          <button>
            <FontAwesomeIcon
              className="hover:text-gray-500"
              icon={faShareFromSquare}
            />
          </button>
        </div>
        <div className="border-b border-gray-400 mt-4">{}</div>
        <div className="font-semibold m-2">Bình luận</div>
      </div>
      <div className="border-b border-gray-400">{}</div>
      {user ? (
        <div className="relative border-b border-gray-400 m-5">
          <form action="" onSubmit={handleComment} method="POST" className="flex justify-between">
            <input
              ref={inputRef}
              value={commentContent}
              onChange={(e) => {
                setCommentContent(e.target.value);
              }}
              name="content"
              type="text"
              placeholder="Nói gì đó về bài viết này ..."
              className={`border p-2 w-full ${
                isFixed ? "fixed top-0 left-0 bg-white z-10" : "relative"
              } border-none outline-none w-5/6`}
            />
            <button className="border border-gray-300 py-1 px-2 rounded-lg">Đăng</button>
          </form>
        </div>
      ) : null}
      <div>
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.comment_id}
              className="border-b border-black py-3 last:border-b-0"
            >
              <div className="px-6">
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={`http://localhost:8000/storage/${comment?.users?.profile_image}`}
                    alt=""
                    className="w-10 h-10 rounded-full border border-gray-500 object-cover p-1 aspect-square"
                  />
                  <div>{comment?.users?.display_name}</div>
                </div>
                {comment.content}
                <div className="flex flex-row gap-10 text-xl">
                  <div className="flex gap-1 items-center">
                    <button>
                      <FontAwesomeIcon
                        className=" hover:text-gray-500"
                        icon={faHeart}
                      />
                    </button>
                    <p className="text-base">{comment.likes_count}</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <button>
                      <FontAwesomeIcon
                        className="hover:text-gray-500"
                        icon={faComment}
                      />
                    </button>
                    <p className="text-base">{comment.children_count}</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <button>
                      <FontAwesomeIcon
                        className="hover:text-gray-500"
                        icon={faRetweet}
                      />
                    </button>
                    <p className="text-base">{comment.retweets_count}</p>
                  </div>
                  <button>
                    <FontAwesomeIcon
                      className="hover:text-gray-500"
                      icon={faShareFromSquare}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">
            Chưa có bình luận nào trên bài viết này !
          </p>
        )}
      </div>
    </>
  );
};

export default SpecifiedPost;
