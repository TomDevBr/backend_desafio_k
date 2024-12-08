import axios from "axios";
import { IRepositoryResponse } from "../interfaces/IUserRepositories";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
    }

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

export const getUserRepositories = async (
    username: string,
    perPage: number,
    page: number
): Promise<IRepositoryResponse> => {
    try {
        const response = await axios.get(`/users/${username}/repos`, {
            params: { perPage, page },
        });;


        const countResponse = await axios.get(`/users/${username}/repos/count`);
        const totalItems = countResponse.data;
        const totalPages = Math.ceil(totalItems / perPage);

        return {
            repositories: response.data,
            totalItems,
            totalPages,
        };
    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
        throw error;
    }
};
export default api;