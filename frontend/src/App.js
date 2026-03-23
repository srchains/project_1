import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const saveUser = async () => {
  // 1️⃣ Validate fields
  if (!name || !email || !mobile || !age) {
    alert("Please fill all fields");
    return;
  }

  try {
    if (editId) {
      // 2️⃣ Update existing user
      await axios.put(`${API}/users/${editId}`, {
        name,
        email,
        mobile,
        age: parseInt(age), // <- This line converts age to integer
      });
      setEditId(null);
    } else {
      // 3️⃣ Create new user
      await axios.post(`${API}/users`, {
        name,
        email,
        mobile,
        age: parseInt(age), // <- This line converts age to integer
      });
    }

    // 4️⃣ Reset form
    setName("");
    setEmail("");
    setMobile("");
    setAge("");

    // 5️⃣ Refresh user list
    fetchUsers();
  } catch (error) {
    console.error("Error saving user:", error);
    alert("Failed to save user. Check console for details.");
  }
};

  const editUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setMobile(user.mobile);
    setAge(user.age);
    setEditId(user.id);
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/users/${id}`);
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br /><br />

      <button onClick={saveUser}>
        {editId ? "Update User" : "Add User"}
      </button>

      <h3>User List</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.mobile}</td>
              <td>{u.age}</td>
              <td>
                <button onClick={() => editUser(u)}>Edit</button>
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;