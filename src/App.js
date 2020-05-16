import React from 'react';
import './App.css';
import Home from './pages/Home';
import { ThemeProvider } from "@chakra-ui/core";

function App() {
  
  return (
    <div className="App">
      <ThemeProvider>
        <Home/>
      </ThemeProvider>
    </div>
  );
}

export default App;
