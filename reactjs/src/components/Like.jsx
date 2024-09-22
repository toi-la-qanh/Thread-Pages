import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export const useLikePost = () => {
  const { csrfToken } = useAuth();

  const likePost = async (postID) => {
    try {
      await csrfToken();
      const response = await axios.post(
        `http://localhost:8000/api/post/${postID}/like`,
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
      console.error("Error liking post:", error);
    }
  };

  return likePost;
};

export const useUnlikePost = () => {
    const { csrfToken } = useAuth();
  
    const unlikePost = async (postID) => {
      try {
        await csrfToken();
        const response = await axios.delete(
          `http://localhost:8000/api/post/${postID}/like`,
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
        console.error("Error liking post:", error);
      }
    };
  
    return unlikePost;
};

export const useLikeComment = ({postID, commentID}) => {
  const { csrfToken } = useAuth();

  const likeComment = async () => {
    try {
      await csrfToken();
      const response = await axios.post(
        `http://localhost:8000/api/post/${postID}/comment/${commentID}/like`,
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

  return likeComment;
};
