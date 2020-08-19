import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
      setIsDelete(false);
    })
  }, [isDelete])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      id: "",
      url: "http://gitblablabla...",
      title: `novo projeto ${Date.now()}`,
      techs: ["Node.js", "Reactjs"]
    });

    const repository = response.data;
    setRepositories([ ...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    setIsDelete(true);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          
       
          {repositories.map( repository => 
            <li key={repository.id}>
                
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
          )};
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
