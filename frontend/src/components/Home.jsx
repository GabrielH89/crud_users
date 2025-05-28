// ... (importações e estilos)
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
    const [users, setUsers] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteAllConfirmation, setDeleteAllConfirmation] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/users`);
                console.log(response.data.msg);
                setUsers(response.data.msg);
            } catch (err) {
                console.log("Houve o seguinte erro: " + err);
            }
        };
        getUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${API_URL}/users/${id}`);
            setUserToDelete(null);
            setShowConfirmation(false); // Fecha o modal após a exclusão
            // Atualiza o estado local após a exclusão
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (err) {
            console.log("Houve o seguinte erro: " + err);
        }
    }

    const deleteAllUsers = async () => {
        try {
            await axios.delete(`${API_URL}/users`);
            setUserToDelete(null);
            setShowConfirmation(false);
            setUsers([]);
        } catch (err) {
            console.log("Houve o seguinte erro: " + err);
        }
    }

    const showDeleteConfirmation = (id) => {
        setUserToDelete(id);
        setShowConfirmation(true);
    };

    const showDeleteAllConfirmation = () => {
        setDeleteAllConfirmation(true);
        setShowConfirmation(true);
    }

    const cancelDelete = () => {
        setUserToDelete(null);
        setShowConfirmation(false);
        setDeleteAllConfirmation(false);
    };

    const confirmDeleteAll = () => {
        setDeleteAllConfirmation(false);
        deleteAllUsers();
    };

    return (
        <div>
            <div className='header'>
                <Link to="/addUser"><button>Adicionar usuários</button></Link>
                <button 
                    onClick={() => showDeleteAllConfirmation()} 
                    disabled={users.length === 0} 
                    className={users.length === 0 ? 'disabled-button' : ''}
                >
                    Excluir todos os usuários
                </button>
            </div>
            
            <table className='body'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Contato</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.nome}</td>
                            <td>{user.email}</td>
                            <td>{user.contato}</td>
                            <td className='td-actions'>
                                <div className='buttonOptions'>
                                <Link to={`/updateUser/${user.id}`}><button  
                                className='btn-editar'>
                                    Editar
                                    </button>
                                </Link>
                                <button onClick={() => showDeleteConfirmation(user.id)} 
                                className='btn-excluir'>
                                    Excluir 
                                </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showConfirmation && (
                <div className="modal">
                    <div className="modal-content">
                        {deleteAllConfirmation ? (
                            <p>Deseja realmente excluir todos os usuários?</p>
                        ) : (
                            <p>Deseja realmente excluir este usuário?</p>
                        )}
                        <div className='modal-buttons'>
                            {deleteAllConfirmation ? (
                                <button id='btn-sim' onClick={confirmDeleteAll}>Sim</button>
                            ) : (
                                <button id='btn-sim' onClick={() => deleteUser(userToDelete)}>Sim</button>
                            )}
                            <button id='btn-cancel' onClick={cancelDelete}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
