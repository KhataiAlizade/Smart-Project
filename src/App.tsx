import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { AppDispatch, RootState } from "./store";
import { fetchUsers } from "./userReducer";
function App() {
  const [searchName, setSearchName] = useState<string>("");
  const [searchUsername, setSearchUsername] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [searchPhone, setSearchPhone] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { users, loading,error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchName.toLowerCase()) &&
      user.username.toLowerCase().includes(searchUsername.toLowerCase()) &&
      user.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
      user.phone.includes(searchPhone)
  );
  return (
    <div className="App">
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>
              Name
              <input
                onChange={(e) => setSearchName(e.target.value)}
                type="text"
                title="Name"
              />
            </th>
            <th>
              Username
              <input
                onChange={(e) => setSearchUsername(e.target.value)}
                type="text"
                title="Username"
              />
            </th>
            <th>
              Email
              <input
                onChange={(e) => setSearchEmail(e.target.value)}
                type="text"
                title="Email"
              />
            </th>
            <th>
              Number
              <input
                onChange={(e) => setSearchPhone(e.target.value)}
                type="text"
                title="Number"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4}>Loading...</td>
            </tr>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr className="TableBody" key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
