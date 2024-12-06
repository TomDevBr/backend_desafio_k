import { useEffect, useState } from "react";
import { IUserRepositories } from "../../interfaces/IUserRepositories";
import { getUserRepositories } from "../../api/Api";

function UserRepositories({ searchedUser }: { searchedUser: string }) {
    const [repositories, setRepositories] = useState<IUserRepositories[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (!searchedUser) {
            return;
        }
        const fetchData = async () => {
            try {
                setLoading(true);
                const data: IUserRepositories[] = await getUserRepositories(searchedUser);
                setRepositories(data);
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
    return <div>{repositories.map(repository => (
        <ul>
            <li key={repository.html_url}>
                <a href={repository.html_url}>{repository.name}</a>
                <p>{repository.description}</p>
            </li>
        </ul>
    ))}</div>


}

export default UserRepositories;