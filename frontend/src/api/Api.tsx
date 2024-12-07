import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export const getUser = async (username: string) => {
    try {
        const response = await api.get(`/users/${username}`);
        if (response.status !== 200) {
            throw new Error(`Erro na requisição: Status ${response.status}`);
        }

        return response.data;
    } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        throw new Error(err instanceof Error ? err.message : "Erro desconhecido");
    }
};

export const getUserRepositories = async (username: string, perPage: number, page: number): Promise<Response> => {
    const response = await fetch(
        `/users/${username}/repos?per_page=${perPage}&page=${page}`
    );
    if (!response.ok) {
        throw new Error('Erro ao buscar repositórios');
    }
    return response;
};

export default api;