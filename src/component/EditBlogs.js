import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditBlog(props) {
  const [titleInput, setTitleInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [categoriesInput, setCategoriesInput] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const url = "http://localhost:5001";

  useEffect(() => {
    const foundBlog = props.blogsProps.find((blog) => {
      return blog.id === id;
    });
    setTitleInput(foundBlog.title);
    setTextInput(foundBlog.text);
    setAuthorInput(foundBlog.author);
    setCategoriesInput(foundBlog.category);
  }, [id, props.blogsProps]);

  const handleOnSubmit = async () => {
    props.setShouldRefreshProps(true);
    const updatedData = {
      title: titleInput,
      text: textInput,
      author: authorInput,
      category: categoriesInput,
    };
    const response = await axios.put(
      `${url}/blogs/update-by-id/${id}`,
      updatedData
    );
    props.setShouldRefreshProps(false);
    navigate("/");
  };
  return (
    <div>
      <h2>Edit Blog</h2>
      <label>Title:</label>
      <input
        type="text"
        value={titleInput}
        name="title"
        onChange={(e) => {
          setTitleInput(e.target.value);
        }}
      />
      <br />
      <label>Text:</label>
      <input
        type="text"
        value={textInput}
        name="text"
        onChange={(e) => {
          setTextInput(e.target.value);
        }}
      />
      <br />
      <label>Author:</label>
      <input
        type="text"
        value={authorInput}
        name="author"
        onChange={(e) => {
          setAuthorInput(e.target.value);
        }}
      />
      <br />
      <label>Categories:</label>
      <input
        type="text"
        value={categoriesInput}
        name="categories"
        onChange={(e) => {
          setCategoriesInput(e.target.value);
        }}
      />
      <br />
      <button onClick={handleOnSubmit}>Submit</button>
    </div>
  );
}
