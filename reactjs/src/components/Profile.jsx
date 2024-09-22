import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useParams, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faComment,
  faHeart,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
const Profile = () => {
  const { user, csrfToken } = useAuth();
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [likes, setLikes] = useState([]);
  const [active, setActive] = useState("posts");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${id}`
        );
        setProfile(response.data);
        setPosts(response.data.posts);
        setLikes(response.data.likes);
        setComments(response.data.comments);
        setRetweets(response.data.retweets);
        setLoading(false);
      } catch (err) {
        setError("Lỗi rồi !");
        console.log(err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const showPosts = () => setActive("posts");
  const showLikes = () => setActive("likes");
  const showComments = () => setActive("comments");
  const showRetweets = () => setActive("retweets");

  if (loading)
    return <div className="text-center mt-5 h-screen">Đợi chút nhé !</div>;
  if (error) return <div className="text-center mt-5 h-screen">{error}</div>;

  return (
    <>
      <div className="flex flex-row justify-between h-20 items-center px-6 mt-3 ">
        <div className="flex flex-col">
          <div className="text-xl font-bold">{profile.display_name}</div>
          <div>{profile.username}</div>
        </div>
        <img
          src={`http://localhost:8000/storage/${profile.profile_image}`}
          alt=""
          className="w-20 h-20 rounded-full border border-gray-500 object-cover p-1 aspect-square"
        />
      </div>
      <div className="text-gray-400 mt-10 px-6">
        {profile.followers_count} người theo dõi
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
          Bài viết đã đăng
        </button>
        <button
          className={`w-36 border-black ${
            active === "comments"
              ? "border-b-2 font-semibold"
              : "border-none text-gray-400"
          }`}
          onClick={showComments}
        >
          Bình luận
        </button>
        <button
          className={`w-36 border-black ${
            active === "retweets"
              ? "border-b-2 font-semibold"
              : "border-none text-gray-400"
          }`}
          onClick={showRetweets}
        >
          Bài viết đăng lại
        </button>
      </div>
      <div className="mt-3">
        {active === "posts" && (
          <div>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.post_id} className="border-b border-black py-3 last:border-none">
                  <div className="px-6">
                    <NavLink to={`/profile/${post.user_id}`}>
                      <div className="flex flex-row items-center gap-2">
                        <img
                          src={`http://localhost:8000/storage/${post?.users?.profile_image}`}
                          alt=""
                          className="w-10 h-10 rounded-full border border-gray-500 object-cover p-1 aspect-square"
                        />
                        <div>{post?.users?.display_name}</div>
                      </div>
                    </NavLink>
                    <NavLink to={`/post/${post.post_id}`}>
                      <h2 className="font-bold">{post.title}</h2>
                      <p>{post.content}</p>
                      <div className="flex justify-end text-gray-400">
                        {post.clicks} Lượt xem
                      </div>
                    </NavLink>
                    <div className="flex flex-row gap-10 text-xl">
                      <div className="flex gap-1 items-center">
                        <button>
                          <FontAwesomeIcon
                            className="hover:text-gray-500"
                            icon={faHeart}
                          />
                        </button>
                        <p className="text-base">{post.likes_count}</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <button>
                          <FontAwesomeIcon
                            className="hover:text-gray-500"
                            icon={faComment}
                          />
                        </button>
                        <p className="text-base">{post.comments_count}</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <button>
                          <FontAwesomeIcon
                            className="hover:text-gray-500"
                            icon={faRetweet}
                          />
                        </button>
                        <p className="text-base">{post.retweets_count}</p>
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
                {user.user_id === id ? (
                  <div className="h-screen">Bạn chưa đăng bài viết nào !</div>
                ) : (
                  <div className="h-screen">Người dùng này chưa đăng bài viết nào</div>
                )}
              </p>
            )}
          </div>
        )}
        {/* {active === "likes" && (
          <div>
            {likes.length > 0 ? (
              likes.map((like, index) => (
                <div key={index}>{like.posts.title}</div>
              )) // Adjust rendering based on user structure
            ) : (
              <p className="text-center">Không tìm thấy tài khoản</p>
            )}
          </div>
        )} */}
        {active === "comments" && (
          <div>
            {comments?.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.comment_id}
                  className="border-b last:border-b-0 border-black py-3"
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
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">
                {user.user_id === id ? (
                  <div className="h-screen">Bạn chưa bình luận vào bài viết nào !</div>
                ) : (
                  <div className="h-screen">Người dùng này chưa bình luận trên các bài viết !</div>
                )}
              </p>
            )}
          </div>
        )}
        {active === "retweets" && (
          <div>
            {retweets?.length > 0 ? (
              retweets.map((retweet) => (
                <div
                  key={retweet.posts.post_id}
                  className="border-b border-black py-3"
                >
                  <div className="px-6">
                    <NavLink to={`/profile/${retweet.posts.user_id}`}>
                      <div className="flex flex-row items-center gap-2">
                        <img
                          src={`http://localhost:8000/storage/${retweet.posts?.users?.profile_image}`}
                          alt=""
                          className="w-10 h-10 rounded-full border border-gray-500 object-cover p-1 aspect-square"
                        />
                        <div>{retweet.posts?.users?.display_name}</div>
                      </div>
                    </NavLink>
                    <NavLink to={`/post/${retweet.posts.post_id}`}>
                      <h2 className="font-bold">{retweet.posts.title}</h2>
                      <p>{retweet.posts.content}</p>
                      <div className="flex justify-end text-gray-400">
                        {retweet.posts.clicks} Lượt xem
                      </div>
                    </NavLink>
                    <div className="flex flex-row gap-10 text-xl">
                      <div className="flex gap-1 items-center">
                        <button>
                          <FontAwesomeIcon
                            className="hover:text-gray-500"
                            icon={faHeart}
                          />
                        </button>
                        <p className="text-base">{retweet.posts.likes_count}</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <button>
                          <FontAwesomeIcon
                            className="hover:text-gray-500"
                            icon={faComment}
                          />
                        </button>
                        <p className="text-base">
                          {retweet.posts.comments_count}
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <button>
                          <FontAwesomeIcon
                            className="hover:text-gray-500"
                            icon={faRetweet}
                          />
                        </button>
                        <p className="text-base">
                          {retweet.posts.retweets_count}
                        </p>
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
                {user.user_id === id ? (
                  <div className="h-screen">Bạn chưa đăng lại bài viết nào !</div>
                ) : (
                  <div className="h-screen">Người dùng này chưa đăng lại bài viết nào !</div>
                )}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default Profile;
