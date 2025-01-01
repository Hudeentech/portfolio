

import {Nav, Exp, Services, Projects, Hero, Maqrue, Testimonial, Footer } from '../..'


function Home() {
  return (
    <div className='Home'>
        <Nav/>
        <Hero/>
        <Services/>
        <Exp/>
        <Projects/>
        <Testimonial/>
        <Footer/>
    </div>
    
  )
}

export default Home