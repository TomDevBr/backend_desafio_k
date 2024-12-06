import { useState } from "react"
import UserProfile from "./components/userProfile/UserProfile";
import UserRepositories from "./components/userRepositories/UserRepositories";
import styles from "./App.module.css"


function App() {
  const [inputValue, setInputValue] = useState<string>('')
  const [search, setUserName] = useState<string>('')


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

  };

  const handleClick = () => {
    setUserName(inputValue)

  }

  return (
    <>

      <div className={styles.container}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="button" onClick={handleClick}>Pesquisar</button>
        <UserProfile searchedUser={search} />
        <UserRepositories searchedUser={search} />

      </div>

    </>
  )
}

export default App
