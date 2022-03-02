import React from 'react';
import Box from '@mui/material/Box';
import "./Details.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import {useParams,useHistory} from "react-router-dom";
import {useEffect,useState} from "react";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';

const API_URL="https://blog-backendcode.herokuapp.com";

function Details() {
    const{id}=useParams();
    const history=useHistory();
    const [data,setdata]=useState({})
    useEffect(()=>{
        fetch(`${API_URL}/blogs/${id}`,{
            method:"GET",
            headers:{"X-auth-token":localStorage.getItem('token')},
        })
        .then((data)=>data.json())
        .then((dt)=>setdata(dt))
    },[id])

    const deleteblog=(_id)=>{
        fetch(`${API_URL}/blogs/${_id}`,{
            method:"DELETE",
            headers:{"X-auth-token":localStorage.getItem('token')},
        }).then(()=>history.push("/blogs"))
    }
  return (
      <Box className="detail-container">
     <img src={data.poster} alt="Banner" className="images"/>
      <Box className="icons">
          < IconButton onClick={()=>history.push("/edit/"+ id)} ><EditIcon className="icon" color="secondary"/></ IconButton >
         <IconButton><DeleteIcon onClick={()=>deleteblog(id)}  className="icon" color="error"/></IconButton>
      </Box>
      <Typography className="detail-heading">
          {data.title}
      </Typography>
      <Box className="subheading">
          <Typography>Author:<span style={{fontWeight:"600"}}>{data.author}</span></Typography>
          <Typography style={{marginLeft:"auto"}}>{data.date}</Typography>
       </Box>
        <Typography>{data.summary}</Typography>
      
      <Button onClick={()=>history.push("/blogs")} variant="contained" size="small"><KeyboardBackspaceIcon/>BACK</Button>
      </Box>
  )
}

export default Details;
