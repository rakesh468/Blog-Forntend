import React from 'react';
import "./CreateView.css";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import * as yup from "yup";
import {useHistory} from "react-router-dom";

const API_URL="https://blog-backendcode.herokuapp.com";

const formvalidationSchema=yup.object({
    title:yup.string().required("Title Required"),
    poster:yup.string().required("URL Required"),
    author:yup.string().required("Author Name Required"),
    summary:yup.string().required("Description Required"),
    date:yup.string().required("Date Required")

});

function CreateView() {
    const history=useHistory();
    const{handleChange,handleBlur,handleSubmit,values,errors,touched}=useFormik({
    initialValues:{
        title:"",
        poster:"",
        author:"",
        summary:"",
        date:""
    },
    validationSchema:formvalidationSchema,
    onSubmit:(newblog)=>{
        console.log("onsubmit",newblog)
        addblog(newblog)
    }
});
const addblog=(newblog)=>{
    console.log(newblog)
    fetch(`${API_URL}/blogs`,{
        method:"POST",
    body:JSON.stringify(newblog),
    headers:{"Content-Type":"application/json",}
    }).then(()=>history.push("/"))

}
  return (
      <form className="cover-form" onSubmit={handleSubmit}>
          <AddCircleIcon/>
          <TextField
         onChange={handleChange}
         onBlur={handleBlur}
         id="title"
         variant="standard"
         label="Enter title"
         name="title"
         values={values.title}
         error={errors.title && touched.title}
         helperText={errors.title && touched.title && errors.title}
         />
          <TextField
         onChange={handleChange}
         onBlur={handleBlur}
         id="poster"
         variant="standard"
         label="Enter poster"
         name="poster"
         values={values.poster}
         error={errors.poster && touched.poster}
         helperText={errors.poster && touched.poster && errors.poster}
         />
         <TextField
         onChange={handleChange}
         onBlur={handleBlur}
         id="author"
         variant="standard"
         label="Enter Author Name"
         name="author"
         values={values.author}
         error={errors.author && touched.author}
         helperText={errors.author && touched.author && errors.author}
         />
       <TextField
         onChange={handleChange}
         onBlur={handleBlur}
         id="summary"
         variant="standard"
         label="Enter Description"
         name="summary"
         values={values.summary}
         error={errors.summary && touched.summary}
         helperText={errors.summary && touched.summary && errors.summary}
         />
         <TextField
         onChange={handleChange}
         onBlur={handleBlur}
         id="date"
         variant="standard"
         label="Enter Date"
         name="date"
         values={values.date}
         error={errors.date && touched.date}
         helperText={errors.date && touched.date && errors.date}
         />
    <Button type="submit" variant="contained" >Publish</Button>

     </form>
     
      
  )
}

export default CreateView;
