import './App.scss'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Skills from "./sections/Skills"
import Experience from "./sections/Experience"
import Projects from "./sections/Projects"
import CyberFlowBackground from './components/CyberFlowBackground'

function App() {  
  return (
    <>
      <CyberFlowBackground />
      <Header />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Footer />
    </>
  )
}

export default App
