import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./api/userApi";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import "./style.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Load data on start
  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      alert("Error fetching users: " + err.message);
    }
  }

  async function handleCreate(data) {
    const newUser = await createUser(data);
    setUsers([...users, newUser]);
  }

  async function handleUpdate(id, data) {
    const updated = await updateUser(id, data);
    setUsers(users.map(u => (u.id === id ? updated : u)));
    setEditingUser(null);
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete?")) return;
    await deleteUser(id);
    setUsers(users.filter(u => u.id !== id));
  }

  return (
    <div className="container">
      <h1>React CRUD — Categories</h1>

      <UserForm
        onSubmit={
          editingUser
            ? (data) => handleUpdate(editingUser.id, data)
            : handleCreate
        }
        initialUser={editingUser}
        submitLabel={editingUser ? "Update" : "Create"}
      />
      {editingUser && <button onClick={() => setEditingUser(null)}>Cancel Edit</button>}

      <UserList users={users} onEdit={setEditingUser} onDelete={handleDelete} />
    </div>
  );
}
