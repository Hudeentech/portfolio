import { Nav, Hero, Philosophy, Projects, Services, Process, Testimonial, Exp, About, Footer } from '../..'

function Home() {
  return (
    <div className='Home'>
        <Nav/>
        <Hero/>
        <Philosophy/>
        <Projects/>
        <Services/>
        <Process/>
        <Testimonial/>
        <Exp/>
        <About/>
        <Footer/>
    </div>
  )
}

export default Home