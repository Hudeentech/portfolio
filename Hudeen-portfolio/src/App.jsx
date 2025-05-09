import { BrowserRouter as Switch, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </>
  )
}

export default App
