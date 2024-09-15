import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const SpecifiedPost = () => {
  const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/post/${id}`);
        console.log(response);
        setPosts(response.data); 
        // setLoading(false);
      } catch (err) {
        setError("Lỗi rồi !");
        // setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.post_id}>
            <div className="flex flex-row items-center gap-2">
              <img 
              src={`http://localhost:8000/storage/${post.users.profile_image}`}
              alt="" 
              className="w-10 h-10 rounded-full border border-gray-500 object-cover p-1 aspect-square"
              />
              <div>
                {post.users.display_name}
              </div>
            </div>
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.content}</p>
            <div className='flex flex-row gap-10 text-xl'>
              <button><FontAwesomeIcon className='hover:text-gray-500' icon={faHeart}/></button>
              <button><FontAwesomeIcon className='hover:text-gray-500' icon={faComment}/></button>
              <button><FontAwesomeIcon className='hover:text-gray-500' icon={faRetweet}/></button>
              <button><FontAwesomeIcon className='hover:text-gray-500' icon={faShareFromSquare}/></button>
            </div>
          </div>
        ))
      ) : (
        <div>No posts available</div>
      )}
    </>
  );
};

export default SpecifiedPost;
