import React from "react";
import Banner from "./Banner";
import Categories from "./categories";
import Post from "./Post";
import Grid from "@mui/material/Grid";

function Home() {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item lg={2} xs={12} sm={2}>
          <Categories />
        </Grid>
        <Grid  container item lg={10} xs={12} sm={10}>
          <Post />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
