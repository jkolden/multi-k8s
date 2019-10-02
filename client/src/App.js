import React from 'react';
import './App.css';
import Dashboard from './Layouts/Dashboard'
import axios from 'axios'
import { Route, withRouter } from "react-router-dom";

class App extends React.Component {

  state = {
    employees: [],
    loading: false
}

componentDidMount() {
    this.fetchEmployees();
}

async fetchEmployees() {
    this.setState({loading: true})
    const employees = await axios.get('/api/employees')
    this.setState({ employees: employees.data, loading: false})

}


  render() {
    const { employees, loading } = this.state
  return (
    <div className="App">
      <Route
        path="/"
        render={() => (
          <Dashboard
            employees={employees}
            loading={loading}
          />
        )}
      />
    </div>
  );
}
}

export default withRouter(App);
