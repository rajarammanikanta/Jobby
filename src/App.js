import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import JobItemDetails from './components/JobItemDetails'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <Route path="/not-found" component={NotFound} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
