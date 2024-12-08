export interface IUserRepositories {
    name: string;
    html_url: string;
    description: string;
}

export interface IRepositoryResponse {
    repositories: IUserRepositories[];
    totalItems: number;
    totalPages: number;
}
