
import { useEffect, useState } from "react";

import styles from './UserProfile.module.css'
import { getUser } from "../../api/Api";
import { IUserProfile } from "../../interfaces/IUserProfile";
import UserRepositories from "../userRepositories/UserRepositories";


function UserProfile({ searchedUser }: { searchedUser: string }) {
    const [showRepositories, setShowRepositories] = useState(false)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<IUserProfile>({
        avatar_url: '',
        login: '',
        name: ''
    });

    const handleShowRepositories = () => {
        setShowRepositories(prevState => !prevState)
    }


    useEffect(() => {
        if (!searchedUser) {
            return;
        }
        const fetchData = async () => {
            try {
                setLoading(true);
                const data: IUserProfile = await getUser(searchedUser);
                setUser(data);
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                setError(err instanceof Error ? err.message : "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchedUser]);

    if (error) {
        return <div role="alert">Erro ao buscar dados: {error}</div>;
    }
    if (loading && searchedUser !== '') {
        return <div aria-busy="true">Carregando...</div>;
    }

    return (
        <>
            {user && user.avatar_url && (
                <div>
                    <div className={styles.userContainer}>
                        <div className={styles.avatarImageContainer}>
                            <img src={user.avatar_url} className={styles.avatarImage}
                                alt="Image Profile" />
                        </div>
                        <p>{user.login}</p>
                        <h1>{user.name}</h1>
                    </div>
                    <div className={styles.reposContainer}>
                        <button className={styles.buttonShow}
                            onClick={handleShowRepositories}>
                            {showRepositories ? 'Esconder Repositórios' : 'Ver Repositórios'}
                        </button>
                        {showRepositories ? <UserRepositories searchedUser={user.login} /> : null}

                    </div>
                </div>
            )}
        </>
    )
}

export default UserProfile