import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/navbar.component";
import UppdragList from "./components/uppdrag-list.component";
import EditUppdrag from "./components/edit-uppdrag.component";
import CreateUppdrag from "./components/create-uppdrag.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={UppdragList} />
        <Route path="/edit/:id" component={EditUppdrag} />
        <Route path="/create" component={CreateUppdrag} />
        <Route path="/user" component={CreateUser} />
      </div>    
    </Router>

  );
}

export default App;
