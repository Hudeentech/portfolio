

import {Nav, Exp, Services, Projects, Hero, About, Testimonial, Footer } from '../..'
import Marque from '../../components/Marque/Marque'

function Home() {
  return (
    <div className='Home'>
        <Nav/>
        <Hero/>
        <About/>
        <Marque/>
        <Services/>
        <Exp/>
        <Projects/>
        <Testimonial/>
        <Footer/>
      
    </div>
    
  )
}

export default Home