import { useEffect, useState } from "react";
import { IUserRepositories } from "../../interfaces/IUserRepositories";
import { getUserRepositories } from "../../api/Api";
import styles from './UserRepositories.module.css'
import Pagination from "../pagination/Pagination";

const UserRepositories = ({ searchedUser }: { searchedUser: string }) => {
    const [repositories, setRepositories] = useState<IUserRepositories[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const perPage = 5;

    useEffect(() => {
        if (!searchedUser) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await getUserRepositories(searchedUser, perPage, page);
                setRepositories(response.repositories);
                setTotalPages(response.totalPages);

            } catch (err) {
                console.error('Erro ao buscar repositórios:', err);
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchedUser, page]);

    if (loading) return <div className={styles.loading}>Carregando...</div>;
    if (error) return <div className={styles.error}>Erro: {error}</div>;
    if (repositories.length === 0) return <div className={styles.noRepos}>Nenhum repositório encontrado.</div>;

    return (
        <div className={styles.repositoriesContainer}>
            <ul className={styles.repositoriesList}>
                {repositories.map((repository) => (
                    <li key={repository.html_url} className={styles.repositoryItem}>
                        <a
                            href={repository.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.repositoryLink}
                        >
                            {repository.name}
                        </a>
                        <p className={styles.repositoryDescription}>
                            {repository.description || 'Sem descrição disponível'}
                        </p>
                        <hr />
                    </li>
                ))}
            </ul>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default UserRepositories;

