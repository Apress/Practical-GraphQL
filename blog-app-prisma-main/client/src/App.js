import "./App.css";
import { Route, Switch } from "react-router";
import Posts from "./pages/Posts/Posts";
import Profile from "./pages/Profile/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route strict exact path="/" component={Posts} />
        <Route strict path="/signup" component={Signup} />
        <Route strict path="/signin" component={Signin} />
        <Route strict path="/profile/:id" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
