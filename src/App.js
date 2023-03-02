import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import HomeRoute from './components/HomeRoute'
import JobsRoute from './components/JobsRoute'
import JobsRouteItemDetails from './components/JobsRouteItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={HomeRoute} />
        <ProtectedRoute exact path="/jobs" component={JobsRoute} />
        <ProtectedRoute
          exact
          path="/jobs/:id"
          component={JobsRouteItemDetails}
        />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
