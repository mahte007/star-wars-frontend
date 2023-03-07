import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import CharacterSelector from "./pages/CharacterSelector";
import Login from "./pages/Login";


function App() {

  const [user, setUser] = useState({
    token: '',
    refreshToken: '',
    user: {
            email: '',
            firsName: '',
            lastName: ''
          }
  });

  function handleLogout(){
    setUser({
      token: '',
      refreshToken: '',
      user: {
              email: '',
              firsName: '',
              lastName: ''
            }
    })
  }

  if(user.token){
    return (
      <div className="main-container">
        <Header user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={ <CharacterSelector user={user} /> } />
        </Routes>
      </div>
      );
  }else{
    return(
        <Login setUser={setUser} user={user} />
    )
  }
}

export default App;
