import React from 'react';
import Nav from "./components/Nav/nav";
import Hero from "./components/Hero/hero";
import Upload from "./components/ProcessUpload/upload";
function App() {
  return (
      <div>
         <header>
             <Nav/>
             <Hero/>
             <Upload/>
         </header>
      </div>
  )
}

export default App;
