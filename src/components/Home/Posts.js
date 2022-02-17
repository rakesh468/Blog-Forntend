import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./posts.css";

function Posts({ title, poster, summary, author, date }) {
  return (
    <Box className="post-container">
      <img src={poster} alt="poster" className="post-image" />
      <Typography className="text">{title}</Typography>
      <Typography className="text">Author:{author}</Typography>
      <Typography className="details">{summary}</Typography>
      <Typography>{date}</Typography>
    </Box>
  );
}

export default Posts;
