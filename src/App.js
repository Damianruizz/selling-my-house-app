import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DashboardContainer } from './components/dashboardContainer/DashboardContainer';
import { RealEstateForm } from './components/realEstateForm/RealEstateForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={DashboardContainer} />
          <Route path="/edit/:id" component={RealEstateForm} />
          <Route path="/create" component={RealEstateForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
