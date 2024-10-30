import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const apiURL = "https://thread-laravel.vercel.app/api";

export const useLikePost = () => {
  const { csrfToken } = useAuth();

  const likePost = async (postID) => {
    try {
      await csrfToken();
      const response = await axios.post(
        `${apiURL}/post/${postID}/like`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error liking post:", error);
      return null;
    }
  };

  const unlikePost = async (postID) => {
    try {
      await csrfToken();
      const response = await axios.delete(
        `${apiURL}/post/${postID}/like`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error liking post:", error);
      return null;
    }
  };

  const checkLikePost = async (postID) => {
    try {
      const response = await axios.get(`${apiURL}/post/${postID}/check-like`);
      return response.data;
    } catch (error) {
      console.error("Error when checking if user has liked post:", error);
      return null;
    }
  };

  const fetchLikesOfPost = async (postID) => {
    try {
      const response = await axios.get(
        `${apiURL}/post/${postID}/like`);
      return response.data;
    } catch (error) {
      console.error("Error counting likes of this post:", error);
      return 0;
    }
  };

  return {likePost, unlikePost, checkLikePost, fetchLikesOfPost};
};

export const useLikeComment = ({postID, commentID}) => {
  const { csrfToken } = useAuth();

  const likeComment = async () => {
    try {
      await csrfToken();
      const response = await axios.post(
        `${apiURL}/post/${postID}/comment/${commentID}/like`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      console.log(response.data);
      return response.data; // Optionally return response data
    } catch (error) {
      console.error("Error liking comment:", error);
      throw error; // Rethrow the error if needed
    }
  };

  const fetchLikesOfComment = async (postID, commentID) => {
    try {
      const response = await axios.get(
        `${apiURL}/post/${postID}/comment/${commentID}/like`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error counting likes of this comment:", error);
    }
  };

  const checkLikeComment = async (postID, commentID) => {
    try {
      const response = await axios.get(
        `${apiURL}/post/${postID}/comment/${commentID}/check-like`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error when checking if user has liked comment:", error);
    }
  };

  return {likeComment, fetchLikesOfComment, checkLikeComment};
};
