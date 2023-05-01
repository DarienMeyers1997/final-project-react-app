import "./App.css";
//3rd party library that helps us with api calls
import axios from "axios";
import NavBar from "./components/NavBar";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import EditBlog from "./components/EditBlog";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import PrivatePage from "./Pages/PrivatePage";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const url = "http://localhost:5001";
  //useEffect first argument, takes in an anonymous callback function. second argument, dependency array
  useEffect(() => {
    const fetchData = async () => {
      // fetch('url', { method: "POST"})
      //axios will parse the response from our backend back to us so we don't need response.json()
      const response = await axios.get(`${url}/blogs/all-blogs`);
      if (response.data.success) {
        setBlogs(response.data.blogs);
      }
    };
    fetchData();
  }, [shouldRefresh]);

  return (
    <div>
      <NavBar />
      {/* <BlogForm setBlogsProps={setBlogs} blogsProps={blogs} /> */}
      <Routes>
        <Route
          path="/"
          element={
            <Blogs
              blogsProps={blogs}
              setShouldRefreshProps={setShouldRefresh}
            />
          }
        />
        <Route path="/home" element={<PrivatePage />}>
          <Route
            path="blog-form"
            element={
              <BlogForm
                setBlogsProps={setBlogs}
                setShouldRefreshProps={setShouldRefresh}
              />
            }
          />
          <Route
            path="edit-blog/:id"
            element={
              <EditBlog
                blogsProps={blogs}
                setShouldRefreshProps={setShouldRefresh}
              />
            }
          />
        </Route>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

//mounting: when a component is first rendered
//updating: When a component re-renders when there's update in state or props
//unmounting: when a component is no used and taken away

// import "./App.css";
// import NavBar from "./components/NavBar";
// import Blogs from "./components/Blogs";
// import { useState } from "react";

// //jsx mixture html, javascript, css
// //App it the top layer of components
// //all returns have to be in one set of tags
// import React, { Component } from "react";

// // class App extends Component {
// // 	state = {
// // 		name: "",
// // 	};
// //   this.props
// // 	render() {
// // 		console.log(this);
// // 		return <div></div>;
// // 	}
// // }

// function App() {
// 	const initialState = [
// 		{
// 			title: "Today",
// 			text: "Is a warm day",
// 			author: "Max",
// 		},
// 		{
// 			title: "Tomorrow",
// 			text: "Will be warm",
// 			author: "Max",
// 		},
// 	];
// 	const [blogs, setBlogs] = useState(initialState); //[variableName, function]
// 	// const blogs = [
// 	// 	{
// 	// 		title: "Today",
// 	// 		text: "Is a warm day",
// 	// 		author: "Max",
// 	// 	},
// 	// 	{
// 	// 		title: "Tomorrow",
// 	// 		text: "Will be warm",
// 	// 		author: "Max",
// 	// 	},
// 	// ];
// 	const [name, setName] = useState("Ginny");
// 	const [age, setAge] = useState(34);
// 	const [selected, setSelected] = useState("hi");
// 	const handleNameChange = (event) => {
// 		if (event.target.name === "user-name") {
// 			console.log(event.target);
// 			setName(event.target.value);
// 		} else {
// 			console.log(event.target);
// 			console.log(event.target.value);
// 			setSelected(event.target.value);
// 		}
// 	};
// 	const handleOnClick = (e) => {
// 		console.log(e);
// 		console.log("hello");
// 	};
// 	return (
// 		<div className="App">
// 			<NavBar />
// 			<input
// 				type="text"
// 				value={name}
// 				name="user-name"
// 				onChange={handleNameChange}
// 			/>
// 			<select value={selected} onChange={handleNameChange}>
// 				<option value="hi">hi</option>
// 				<option value="hello">hello</option>
// 			</select>
// 			<button onClick={handleOnClick}>submit</button>
// 			{/**key value pair in props*/}
// 			<Blogs name={name} age={age} />
// 		</div>
// 	);
// }

// export default App;
