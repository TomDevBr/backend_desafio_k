
import { useEffect, useState } from "react";

import styles from './UserProfile.module.css'
import { getUser } from "../../api/Api";
import { IUserProfile } from "../../interfaces/IUserProfile";




function UserProfile({ searchedUser }: { searchedUser: string }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<IUserProfile>({
        avatar_url: '',
        login: '',
        name: ''
    });


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
        return <p>Erro ao buscar dados</p>
    }

    if (loading && searchedUser !== '') {
        return <p>Carregando...</p>;
    }

    return (
        <>
            {user && user.avatar_url && (
                <div className={styles.userContainer}>
                    <div className={styles.avatarImageContainer}>
                        <img src={user.avatar_url} className={styles.avatarImage}
                            alt="Image Profile" />
                    </div>
                    <p>{user.login}</p>
                    <h1>{user.name}</h1>
                </div>
            )}
        </>
    )
}

export default UserProfile