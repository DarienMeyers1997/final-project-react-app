import axios from "axios";
import { useNavigate } from "react-router-dom";

function BlogsCard(props) {
  const navigate = useNavigate();

  const url = "http://localhost:5001";

  const handleDelete = async (id) => {
    props.setShouldRefresh(true);
    const response = await axios.delete(`${url}/blogs/delete-by-id/${id}`);
    props.setShouldRefresh(false);
  };
  return (
    <div
      style={{
        border: "1px solid",
        height: "200px",
        width: "150px",
        margin: "20px",
      }}
    >
      <h3>{props.blog.title}</h3>
      <p>{props.blog.text}</p>
      <p>author: {props.blog.author}</p>
      <p>categories: {props.blog.category}</p>
      <button onClick={() => handleDelete(props.blog.id)}>Delete Blog</button>
      <button onClick={() => navigate(`/edit-blog/${props.blog.id}`)}>
        Edit
      </button>
    </div>
  );
}

export default BlogsCard;
