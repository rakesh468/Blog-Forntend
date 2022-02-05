import './App.css';
import Box from '@mui/material/Box';
import {BrowserRouter,Switch,Route} from "react-router-dom";



import Header from './components/Header';
import Home from './components/Home/Home';
import Details from "./Post/Details"
import CreateView from './Post/CreateView';
import EditViews from './Post/EditViews';
import Login from "./user/login";
import Signup from "./user/signup"


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Box style={{marginTop:"64px"}}>
        <Switch>
          <Route exact path="/">
      <Home/>
      </Route>
      <Route exact path="/edit/:id">
        <EditViews/>
      </Route>
      <Route exact path="/details/:id">
        <Details/>
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/signup">
        <Signup/>
      </Route>
      <Route exact path="/create">
        <CreateView/>
        </Route>
      </Switch>
      </Box>
     
    </BrowserRouter>
  );
}

export default App;
