import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://0.0.0.0:5000/users');
    setUsers(response.data);
  };

  const addUser = async () => {
    const response = await axios.post('http://0.0.0.0:5000/users', { name, email });
    setUsers([...users, response.data]);
    setName('');
    setEmail('');
  };

  const updateUser = async () => {
    const response = await axios.put(`http://0.0.0.0:5000/users/${editingUser.id}`, { name, email });
    setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));
    setName('');
    setEmail('');
    setEditingUser(null);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://0.0.0.0:5000/users/${id}`);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={editingUser ? updateUser : addUser}>
        {editingUser ? 'Update User' : 'Add User'}
      </button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => {
              setName(user.name);
              setEmail(user.email);
              setEditingUser(user);
            }}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

