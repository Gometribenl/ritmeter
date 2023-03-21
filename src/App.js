import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import Result from './components/Result';
import Typography from "@mui/material/Typography";
import * as React from "react";
import Menu from './components/Menu'

function App() {
  const [tableData, setTableData] = useState([]);

  return (
      <Router>
          <Menu>
              <Link style={{color: '#fff', textDecoration: 'none', fontWeight: 'bold'}} to="/"><Typography variant="h6"  color='danger'>Home</Typography></Link>
              <Link style={{color: '#fff', textDecoration: 'none', fontWeight: 'bold'}} to="/form"><Typography variant="h6">Form</Typography></Link>
          </Menu>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form setTableData={setTableData} />} />
          <Route path="/result" element={<Result tableData={tableData} />} />
        </Routes>
      </Router>
  );
}

export default App;
