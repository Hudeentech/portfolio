import { BrowserRouter as Switch, Route, Routes} from 'react-router-dom';

import Home from './Pages/Home/Home'
import AboutPage from './Pages/About/AboutPage.jsx';
import ProjectPage from './Pages/ProjectsPage/ProjectPage';

import './App.css'

function App() {
  
  return (
      <>
      <Switch>
        <Routes>
        <Route exact path='/' Component={Home}/>

        <Route path='/About' Component={AboutPage}/>

        <Route path='/Project' Component={ProjectPage}/>
      </Routes>
    </Switch>
        
      </>
  )
}

export default App
