import ProblemDetail from "./problemDetail";
import { useState,useEffect } from "react";
import ProblemNav from "./problemNav";
const CodeEditor = () => {
  const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem("token");
  
          const res = await fetch("http://localhost:5000/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          const data = await res.json();
          setUser(data.data);
        } catch (err) {
          console.log("Error fetching user");
        }
      };
  
      fetchUser();
    }, []);
  
  return (
    <>
    <ProblemNav user={user}/>
    <ProblemDetail />
    </>
  )
}

export default CodeEditor
