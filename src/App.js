import React, { useEffect, useRef, useState } from 'react';
import Papa from 'papaparse';
import './App.css';

function App() {
  const tableauRef = useRef(null);
  const[sta,setSta] = useState(false);
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    tableauRef.current.appendChild(script);
  }, []);

  const getData = async () =>{
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://docs.google.com/spreadsheets/d/1zwTxn7wGXbHNBhat2q69QJ3sYvUKAr3h_klmOrGVS4M/export?format=csv');
      if (!res.ok) throw new Error('Network response was not ok');
      const csvText = await res.text();
      Papa.parse(csvText, {
        header: true,
        complete: (result) => {
          setData(result.data);
          console.log('Parsed Data:', result.data);
        },
        error: (error) => {
          setError(error);
          console.error('Parsing Error:', error);
        }
      });
      setSta(true);
    } catch (error) {
      setError(error);
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }
  return (
    <div className="App">
      <header className="App-header">
        <div
          className="tableauPlaceholder"
          id="viz1751254772955"
          style={{ position: 'relative' }}
          ref={tableauRef}
        >
          <noscript>
            <a href="#">
              <img
                alt="Sheet 1"
                src="https://public.tableau.com/static/images/CS/CSFRBYH48/1_rss.png"
                style={{ border: 'none' }}
              />
            </a>
          </noscript>
          <object
            className="tableauViz"
            style={{ display: 'none' }}
          >
            <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
            <param name="embed_code_version" value="3" />
            <param name="path" value="shared/CSFRBYH48" />
            <param name="toolbar" value="yes" />
            <param name="static_image" value="https://public.tableau.com/static/images/CS/CSFRBYH48/1.png" />
            <param name="animate_transition" value="yes" />
            <param name="display_static_image" value="yes" />
            <param name="display_spinner" value="yes" />
            <param name="display_overlay" value="yes" />
            <param name="display_count" value="yes" />
            <param name="language" value="en-US" />
          </object>
        </div>
        <p></p>
        <a
          className="App-link"
          href="https://public.tableau.com/views/Jobs_Outsourcing_Analysis/Sheet1?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nefi Garcia Gutierrez - Tableau Public
        </a>
      </header>
      <button style={{background: '#61dafb'}} onClick={getData}>Click to see the data using a Python script</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}> {error.message}</p>}
      {sta && !loading && !error &&
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Country</th>
              <th>Level</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.Company}</td>
                <td>{item.Country}</td>
                <td>{item.Level}</td>
                <td>{item.Role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}

export default App;