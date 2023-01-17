import { Route } from 'react-router-dom';
import Navbar from "./components/layouts/Navbar/Navbar";
import ListCountries from "./components/layouts/ListCountries/ListCountries";
import Home from "./components/layouts/home/Home";
import CountryDetail from "./components/layouts/Detail/Detail";
import ActivityForm from "./components/turistActivities/Form/ActivityForm";
import Response from './components/layouts/response/Response';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path ="/" component={Home} />
      <Route path ="/countries" component={Navbar}/>
      <Route path ="/country" component={Navbar}/>
      <Route exact path="/countries" render={() =>  <ListCountries />} />
      <Route exact path = "/countries/:id" component={CountryDetail} />
      <Route exact path="/country/activity" component={ActivityForm} />
      <Route exact path="/country/activity-response" component={Response} />
    </div>
  );
}

export default App;
