import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./signup.css";
import { useHistory } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


//form validation using Yup//
const formvalidation = yup.object({
  firstname: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Please enter valid name")
    .max(40)
    .required("Firstname Required"),
  lastname: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Please enter valid name")
    .max(40)
    .required("Lasname Required"),
  email: yup.string().email().required("Email Required"),
  password: yup
    .string()
    .min(8, "Password must be 8 character")
    .max(12, "password is too long")
    .required("Password Required"),
});

// heroku url//
const API_URL = "https://blog-backendcode.herokuapp.com";

function Signup() {

  const [open, setOpen] = React.useState(false);
  const [Msg, setMsg] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const history = useHistory();

  // form validation using useFormik //
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      //get initial values empty//
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
      //validate input//
      validationSchema: formvalidation,
      onSubmit: (newuser) => {
        console.log("onSubmit", newuser);
        Signupuser(newuser);
      },
    });

  const Signupuser = async (newuser) => {
    await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      body: JSON.stringify(newuser),
      headers: { "Content-Type": "application/json" },
    }).then((response)=>{
      if(response.status===200){
        setMsg({Message:"Login Successfully",status:"success"});
        setOpen(true);
        setTimeout(()=>history.push("/login"),3000);
      }else{
        setMsg({Message:"Invalide Credentials",status:"error"});
        setOpen(true);
      }
    })
     .catch((err)=>{
       setMsg({message:"error",status:"error"});
       setOpen(true);
     });
     }
  return (
    <div className="main">
      <div className="sub-main">
        <form onSubmit={handleSubmit}>
          <header>Signup</header>
          <TextField
            id="firstname"
            name="firstname"
            label="Enter First Name"
            value={values.firstname}
            error={errors.firstname && touched.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.firstname && touched.firstname && errors.firstname
            }
          />
          <TextField
            id="lastname"
            name="lastname"
            label="Enter Last Name"
            value={values.lastname}
            error={errors.lastname && touched.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.lastname && touched.lastname && errors.lastname}
          />
          <TextField
            id="email"
            name="email"
            label="Enter Email Id"
            value={values.email}
            error={errors.email && touched.email}
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.email && touched.email && errors.email}
          />
          <TextField
            id="password"
            name="password"
            label="Enter Password"
            type="password"
            value={values.password}
            error={errors.password && touched.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.password && touched.password && errors.password}
          />
          <Button type="submit" variant="contained" color="success">
            Sign up
          </Button>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={Msg.status}
          sx={{ width: "100%" }}
        >
          {Msg.Message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;
