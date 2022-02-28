import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import "./login.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const formvalidation = yup.object({
  email: yup.string().email().required("Email Required"),
  password: yup
    .string()
    .min(8, "Password must have 8 character")
    .max(12, "Password is too long")
    .required("password Required"),
});
const API_URL="https://blog-backendcode.herokuapp.com";

function Login() {
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

  //formvalidation using formik and yup//
  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    useFormik({
      //get initial values empty//
      initialValues: {
        email: "",
        password: "",
      },
      //validate input//
      validationSchema: formvalidation,
      onSubmit: (newuser) => {
        console.log("onSubmit", newuser);
        Loginuser(newuser)
      },
    });

    const Loginuser=async(newuser)=>{
      await fetch(`${API_URL}/users/login`,{
        method:"POST",
        body:JSON.stringify(newuser),
        headers:{"Content-Type":"application/json",
      },
      })
      .then((response)=>{
        if(response.status===200){
          return response.json();
         }else{
          setMsg({Message:"Invalide Credentials",status:"error"});
          setOpen(true);
        }
      })
      .then((response)=>{
        console.log(response);
        localStorage.setItem('token',response.token);
        setMsg({Message:"Login Successfully",status:"success"});
        setOpen(true);
        setTimeout(()=>history.push("/"),3000);
      })
       .catch((err)=>{
         setMsg({message:"error",status:"error"});
         setOpen(true);
       });
       }
  return (
    <div className="main">
      <div className="sub-main">
        <form onSubmit={handleSubmit} >
          <header>Login</header>
          <br />
          <TextField
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            label="Enter Email Id"
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Enter Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
          />
          <Button type="submit" variant="contained" color="success">
            <LoginIcon />
            Login
          </Button>
          <p>Create an Account ?</p>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => history.push("/signup")}
          >
            <PersonAddAltIcon />
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

export default Login;
