import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./header/Header";
import CharacterSelector from "./pages/CharacterSelector";
import FightPage from "./pages/FightPage";
import Login from "./pages/Login";


function App() {
  const navigate = useNavigate();
  const [finalCharacters, setFinalCharacters] = useState({
    "dark": "",
    "light": ""
  })

  useEffect(() => {
    navigate("/")
  }, [])

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
    });
    navigate("/")
  }

  if(user.token){
    return (
      <div className="main-container">
        <Header user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={ <CharacterSelector user={user} setFinalCharacters={setFinalCharacters} /> } />
          <Route path="/fight" element={ <FightPage user={user} finalCharacters={finalCharacters} /> } />
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
