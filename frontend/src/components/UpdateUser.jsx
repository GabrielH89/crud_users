import { useEffect, useState } from 'react';
import './AddUser.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';

function UpdateUser() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [contato, setContato] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
      getUserById();
  },[]);


  
  const getUserById = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      const userData = response.data.msg; 
      console.log(userData);
      setNome(userData.nome);
      setEmail(userData.email);
      setContato(userData.contato);
    } catch (err) {
      console.log("Houve o seguinte erro: " + err);
    }
  }

  const atualizarUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("contato", contato);
  
    try {
      const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
      const regexContato = /^\d{2}[-]?\d{4,5}[-]?\d{4}$/;
  
      if (nome.trim().length > 0 && email.trim().length > 0 && contato.trim().length > 0) {
        if (!regexEmail.test(email)) {
          alert("Insira um e-mail válido");
        } else if (!regexContato.test(contato)) {
          alert("Insira um contato válido");
        } else {
          // Use a URL correta com o ID do usuário para a atualização
          const url = `${API_URL}/users/${id}`;
          
          const response = await axios.put(url, formData, {
            headers: {
              "Content-Type": "application/json"
            }
          });
  
          // Verifique se o status da resposta é 200 (OK) antes de navegar
          if (response.status === 200) {
            navigate("/");
          } else {
            console.log("Houve um problema ao atualizar o usuário:", response);
          }
        }
      } else {
        alert("Preencha todos os campos");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("Este e-mail já existe!");
      }
      console.log("Houve o seguinte erro: " + err);
    }
  }
  

  return (
    <div>
      <div className="form">
        <form>
          <label>Nome</label>
          <input type="text" placeholder='Insira o nome' 
          value={nome} onChange={(e) => setNome(e.target.value)}
          >
          </input>
          <label>Email</label>
          <input type="text" placeholder='EX: XXXX@XXXX.COM'
          value={email} onChange={(e) => setEmail(e.target.value)}
          >
          </input>
          <label>Contato</label>
          <InputMask mask="99-99999-9999"  className="input" type="text"
            placeholder='Ex: XX-XXXXX-XXXX'
            value={contato} onChange={(e) => setContato(e.target.value)} 
            required/>
          <button onClick={atualizarUser}>Atualizar</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser;