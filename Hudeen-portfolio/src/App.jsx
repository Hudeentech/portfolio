import { BrowserRouter as Switch, Route, Routes} from 'react-router-dom';

import Home from './Pages/Home/Home'
import AboutPage from './Pages/About/AboutPage';
import CaseStudy from './Pages/Case-study/CaseStudy';
import ProjectPage from './Pages/ProjectsPage/ProjectPage';


import './App.css'



function App() {
  

  return (
      <>
      <Switch>
        <Routes>
        <Route exact path='/' Component={Home}/>

        <Route path='/about' Component={AboutPage}/>

        <Route path='/Project' Component={ProjectPage}/>

        <Route path='/case:id' Component={CaseStudy}/>
      </Routes>
    </Switch>
        
      </>
  )
}

export default App
