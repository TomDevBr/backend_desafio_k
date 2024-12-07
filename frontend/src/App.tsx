import { useState } from "react"
import UserProfile from "./components/userProfile/UserProfile";
import styles from "./App.module.css"


function App() {
  const [inputValue, setInputValue] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [active, setActive] = useState(false)


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

  };

  const handleClick = () => {
    if (inputValue.trim() === "") {
      setActive(true);
    } else {
      setActive(false);
      setSearch(inputValue.trim());
    }
  };





  return (
    <>

      <div className={styles.container}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className={styles.inputSearch}
          placeholder="Digite o login do usuário do GitHub"
        />
        <button className={styles.buttonSearch} type="button" onClick={handleClick}>Pesquisar</button>
        <UserProfile searchedUser={search} />
        {active ? <p role="alert">Digite o login de um usuário válido</p> : null}





      </div>

    </>
  )
}

export default App
