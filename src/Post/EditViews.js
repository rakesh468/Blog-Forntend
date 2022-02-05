import React from "react";
import "./EditViews.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const formvalidationSchema = yup.object({
  title: yup.string().required("Title Required"),
  poster: yup.string().required("URL Required"),
  summary: yup.string().required("Description Required"),
  author:yup.string().required("Author Name Required"),
  date:yup.string().required("Date Required")
});

const API_URL="https://blog-backendcode.herokuapp.com"
function EditViews() {
  const { id } = useParams();
  const [blog, setblog] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/blogs/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((dt) => setblog(dt));
  }, [id]);

  return blog ? <Updateblog blog={blog} /> : " ";
}

function Updateblog({ blog }) {
  const history = useHistory();

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        title: blog.title,
        poster: blog.poster,
        summary: blog.summary,
        author: blog.author,
        date: blog.date,
      },
      validationSchema: formvalidationSchema,
      onSubmit: (updatedblog) => {
        console.log("onsubmit", updatedblog);
        editblog(updatedblog);
      },
    });
  const editblog = (updatedblog) => {
    console.log(updatedblog);
    fetch(`${API_URL}/blogs/${blog._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedblog),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/"));
  };
  return (
    <form className="cover-form" onSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        onBlur={handleBlur}
        id="title"
        variant="standard"
        label="Enter title"
        name="title"
        value={values.title}
        error={errors.title && touched.title}
        helperText={errors.title && touched.title && errors.title}
      />
      <TextField
        onChange={handleChange}
        onBlur={handleBlur}
        id="poster"
        variant="standard"
        label="Enter Title"
        name="poster"
        value={values.poster}
        error={errors.poster && touched.poster}
        helperText={errors.poster && touched.poster && errors.poster}
      />
      <TextField
        onChange={handleChange}
        onBlur={handleBlur}
        id="summary"
        variant="standard"
        label="Enter summary"
        name="summary"
        value={values.summary}
        error={errors.summary && touched.summary}
        helperText={errors.summary && touched.summary && errors.summary}
      />
      <TextField
        onChange={handleChange}
        onBlur={handleBlur}
        id="author"
        variant="standard"
        label="Enter author"
        name="author"
        value={values.author}
        error={errors.author && touched.author}
        helperText={errors.author && touched.author && errors.author}
      />
      <TextField
        onChange={handleChange}
        onBlur={handleBlur}
        id="date"
        variant="standard"
        label="Enter date"
        name="date"
        value={values.date}
        error={errors.date && touched.date}
        helperText={errors.date && touched.date && errors.date}
      />
      <Button type="submit" variant="contained">
        Update
      </Button>
    </form>
  );
}

export default EditViews;
