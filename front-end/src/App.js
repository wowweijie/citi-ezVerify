import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import AuthPage from "./AuthPage/AuthPage";
import RequestPage from "./RequestPage/RequestPage";



var state = {
  data: null
};

function componentDidMount() {
  // Call our fetch function below once the component mounts
this.callBackendAPI()
  .then(res => this.setState({ data: res.express }))
  .catch(err => console.log(err));
};
// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
var callBackendAPI = async () => {
const response = await fetch('/express_backend');
const body = await response.json();

if (response.status !== 200) {
  throw Error(body.message)
}
return body;
};

function App() {

  return (
    <Router>
    <main>
    <Switch>
      <Route path="/" exact component={RequestPage} />
      <Route path="/auth/:id"  component={AuthPage} />
      <Route render={() => <h1>404: page not found</h1>} />
    </Switch>
    </main>
</Router>
  );
}


export default App;