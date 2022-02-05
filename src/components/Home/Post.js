import React from 'react';
import Posts from "./Posts";
import Grid from "@mui/material/Grid";
import {useState,useEffect} from "react";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom"

const API_URL="https://blog-backendcode.herokuapp.com";

function Post() {
  const [data,setdata]=useState([])
  const history=useHistory();
   
  const getdata=()=>{
    fetch(`${API_URL}/blogs`,{method:"GET"})
    .then((data)=>data.json())
    .then((dt)=>setdata(dt));
  }
  useEffect(getdata,[]);

    
  return (
      <>
      {data.map(({title,summary,poster,author,date,id,_id})=>(
        <Grid item lg={3} sm={4} xs={12}>
          <Button variant="text" onClick={()=>history.push("/details/"+ _id)} style={{textDecoration:"none",color:"inherit"}}>
        <Posts 
        title={title}
        summary={summary}
        author={author}
        date={date}
        key={id}
        id={_id}
        poster={poster}/>
        </Button>
        </Grid>

      ))}
      </>
     
      
      
  )
}

export default Post;
