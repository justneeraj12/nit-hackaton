import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ParentLogin from './components/ParentLogin';
import KidLogin from './components/KidLogin';
import ParentDashboard from './components/ParentDashboard';
import KidDashboard from './components/KidDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
        <Switch>
          <Route path="/parent-login" component={ParentLogin} />
          <Route path="/kid-login" component={KidLogin} />
          <Route path="/parent-dashboard" component={ParentDashboard} />
          <Route path="/kid-dashboard" component={KidDashboard} />
          <Route path="/" exact>
            <div className="container mx-auto py-12 text-center">
              <h1 className="text-4xl font-bold text-purple-800 mb-8">Welcome to KidScreen</h1>
              <div className="space-x-4">
                <a href="/parent-login" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  Parent Login
                </a>
                <a href="/kid-login" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  Kid Login
                </a>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;