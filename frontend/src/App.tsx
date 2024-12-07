import { useState } from "react"
import UserProfile from "./components/userProfile/UserProfile";
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
          className={styles.inputSearch}
        />
        <button className={styles.buttonSearch} type="button" onClick={handleClick}>Pesquisar</button>
        <UserProfile searchedUser={search} />




      </div>

    </>
  )
}

export default App
