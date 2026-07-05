import { BrowserRouter as Switch, Route, Routes} from 'react-router-dom';

import Home from './Pages/Home/Home'
import ProjectPage from './Pages/ProjectsPage/ProjectPage';
import ProjectDetails from './Pages/ProjectDetails/ProjectDetails.jsx';

import './App.css'

function App() {
  
  return (
      <>
      <Switch>
        <Routes>
        <Route exact path='/' Component={Home}/>

        <Route path='/Project' Component={ProjectPage}/>
        
        <Route path='/project/:id' Component={ProjectDetails}/>
      </Routes>
    </Switch>
        
      </>
  )
}

export default App
