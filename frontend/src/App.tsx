import "./App.css";
import { UserTable } from "./components/UserTable";
import { useEffect, useState } from "react";
import { User } from "./components/types";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Volunteers } from "./components/Volunteers";
import { Home } from "./components/Home";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [apiCalls, setApiCalls] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      fetch("http://localhost:5005/api/bog/users")
        .then((data) => data.json())
        .then((data) => setUsers(data));
    };
    fetchData();
  }, [apiCalls]);
  const updateApiCalls = () => {
    setApiCalls(apiCalls + 1);
  };
  const [userStats, setUserStats] = useState<{ [key: string]: number }>({});
  const updateUserStats = (id: string) => {
    if (!userStats[id]) {
      setUserStats((prevStats) => ({
        ...prevStats,
        [id]: 1,
      }));
      return;
    }
    console.log('wassup')
    console.log(userStats[id])
    setUserStats((prevStats) => ({
      ...prevStats,
      [id]: (prevStats[id] + 1),
    }));
    console.log(userStats[id])
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              users={users}
              updateApiCalls={updateApiCalls}
              updateUserStats={updateUserStats}
            />
          }
        />
        <Route path="users/*" element={<Volunteers users={users} userStats={userStats} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
