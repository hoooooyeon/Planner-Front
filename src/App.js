import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [result, setResult] = useState();

  useEffect(() => {
    axios.get("planner/").then((response) => {
      setResult(response.data);
    })
      .catch((error) => {
        setResult(error);
      })
  });

  return (
    <div>
      {result}
    </div>
  );
}

export default App;
