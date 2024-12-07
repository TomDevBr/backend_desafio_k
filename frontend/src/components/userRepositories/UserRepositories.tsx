import { useEffect, useState } from "react";
import { IUserRepositories } from "../../interfaces/IUserRepositories";
import { getUserRepositories } from "../../api/Api";
import styles from './UserRepositories.module.css'
import Pagination from "../Pagination";

function UserRepositories({ searchedUser }: { searchedUser: string }) {
    const [repositories, setRepositories] = useState<IUserRepositories[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const perPage = 5
    useEffect(() => {
        if (!searchedUser) {
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUserRepositories(searchedUser, perPage, page);


                const data: IUserRepositories[] = await response.json();
                setRepositories(data);


                const linkHeader = response.headers.get('Link');
                if (linkHeader) {
                    const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
                    setTotalPages(lastPageMatch ? parseInt(lastPageMatch[1], 10) : 1);
                }
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                setError(err instanceof Error ? err.message : "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchedUser, page]);

    if (error) {
        return <div role="alert">Erro ao buscar dados: {error}</div>;
    }
    if (loading && searchedUser !== '') {
        return <div aria-busy="true">Carregando...</div>;
    }
    if (!repositories.length) {
        return <div>Este usuário ainda não possui repositórios.</div>;
    }
    return (
        <div className={styles.repositoriesContainer}>
            <ul >
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {repositories.map(repository => (
                    <>
                        <li key={repository.html_url}>
                            <a href={repository.html_url}>
                                {repository.name}
                            </a>
                            <p>{repository.description}</p>
                        </li><hr />
                    </>
                ))}
            </ul>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(page) => setPage(page)}
            />
        </div>
    )


}

export default UserRepositories;