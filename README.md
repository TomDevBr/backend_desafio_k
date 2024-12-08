## Descrição

Este é um projeto full-stack que tem como objetivo consumir a API do GitHub 
para capturar dados de usuários e seus respectivos repositórios. 
A aplicação é composta por um **back-end** em Spring Boot, responsável por consumir 
a API do GitHub, e um **front-end** em React, que exibe os dados de maneira interativa.

No **front-end**, o usuário pode pesquisar por um nome de usuário do GitHub, 
visualizar informações como o nome, avatar, e ao clicar em um botão, 
visualizar os repositórios associados a esse usuário. 
A aplicação também oferece paginação para exibir os repositórios de forma organizada.

---

## Tecnologias Utilizadas

### Back-End:
- **Java 21+**
- **Spring Boot 3.4.0**
- **Spring Web** (Para realizar as requisições HTTP)
- **Spring Boot Starter Test** (Para testes)
- **Spring Boot Starter DevTools** (Para desenvolvimento)

### Front-End:
- **React 18.3.1**
- **Vite 6.0.1** (Para bundling)
- **TypeScript 5.6.2** (Para tipagem estática)
- **Axios 1.7.9** (Para realizar requisições HTTP)
- **ESLint** (Para linting e boas práticas)

---

## Como Rodar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/SeuUsuario/gitHubUserRepositories.git

```

---
### 2. Configuração do Back-End

- **Configuração do Back-End**
Navegue até a pasta do back-end:

```bash

cd backend
```
- **Instale as dependências utilizando o Maven:**
```bash

mvn clean install
```

- **Rodar a aplicação:**
```bash

mvn spring-boot:run
```
O back-end será executado na porta 8080 por padrão, verifique se seu backend está rodando na porta correta.


- **Configuração de CORS:** 
O back-end foi configurado para permitir requisições apenas do front-end, localizado em http://127.0.0.1:5173. Adicione o link correto do seu frontend local, sso é feito no arquivo de configuração CorsConfig.java:

```java

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://127.0.0.1:5173")
                        .allowedMethods("GET");  
            }
        };
    }
}        
```

### 3. Configuração do front-end

- **Configuração do Front-end**
Navegue até a pasta do front-end:

```bash
cd frontend
```

- **Instale as dependências utilizando o yarn:**
```bash

yarn add
```

- **Crie um arqui .env**
na raiz do projeto front-end com as variáveis de ambiente necessárias 
para o back-end e a API do GitHub. Exemplo de configuração do arquivo .env

```bash

VITE_BACKEND_API_URL=http://localhost:8080  
VITE_GITHUB_TOKEN=seuTokenGitHub  
```

--**Rodar aplicação**

```bash

yarn dev
```

### Estrutura do Projeto

## Estrutura de Pastas do Back-end

### src/java/com/desafio_k/backend/
- **config/**: Contém os arquivos de configuração do CORS e da biblioteca RestTemplate.
- **controller/**: Contém os arquivos responsáveis por gerenciar as rotas da API e as requisições do front-end.
- **model/**: Contém os arquivos que representam as estruturas dos dados utilizados na API.
- **services/**: Contém os arquivos que realizam a lógica de consumo da API do GitHub e o tratamento dos dados.

## Estrutura de Pastas do Front-end

### src/
- **api/**: Essa pasta contém o arquivo de configuração do consumo da API e seus endpoints.
- **components/**: Nesta pasta estão localizados os componentes utilizados para a renderização e exibição dos dados recebidos da API.
- **interfaces/**: Essa pasta contém as interfaces dos componentes e dados da aplicação.
    Componente de Paginação: Permite ao usuário navegar pelas páginas de repositórios.
    Endpoints da API

## Endpoints da API

### 1. **GET /users/{username}**
- **Descrição**: Retorna as informações de um usuário do GitHub.

**Exemplo de Resposta**:
```json
{
  "login": "TomDevBr",
  "name": "Tomás de Jesus Oliveira Calheiros",
  "avatar_url": "https://avatars.githubusercontent.com/u/72022149?v=4",
}
```

### 2. **GET /users/{username}/repos**
- **Descrição**:  Retorna os repositórios públicos de um usuário do GitHub, com suporte à paginação
- **Parâmetros**: 
    -**perPage**: Número de repositórios por página (padrão: 5).
    -**page**: Página atual para os repositórios (padrão: 1).

**Exemplo de Resposta**:
```json
[
  {
    "name": "repo1",
    "description": "Descrição do repositório 1",
    "html_url": "https://github.com/TomDevBr/repo1"
  },
  {
    "name": "repo2",
    "description": "Descrição do repositório 2",
    "html_url": "https://github.com/TomDevBr/repo2"
  }
]
```

### 3. **GET /users/{username}/repos/count**
- **Descrição**: RRetorna o número total de repositórios públicos de um usuário do GitHub.

**Exemplo de Resposta**:
```json
{
 "count": 13
}
```



## Processo de Desenvolvimento

### Criação do Repositório
- Criei no GitHub um repositório para conter os projetos **frontend** e **backend**.

### Criação do Projeto Backend
1. Criei o projeto através do Visual Studio Code utilizando Spring Boot, Maven e outras ferramentas necessárias.
2. Desenvolvi a estrutura inicial imaginada para os dados de **usuário** e **repositório**.
3. Configurei a biblioteca **RestTemplate** e implementei o serviço contendo a lógica inicial para o consumo da API.
4. Criei um **controller** para os endpoints de usuário e repositório.
5. Configurei o **CORS** da aplicação com a lógica inicial para integração com o frontend.
6. Realizei testes dos endpoints utilizando o **Insomnia**.

### Criação do Projeto Frontend
1. Iniciei o projeto com **React** utilizando **Vite** e configurei o uso de **TypeScript**.
2. Configurei a integração com o backend e criei uma estrutura inicial para o frontend testando o input de pesquisa.
3. Desenvolvi o componente para exibir os **dados do usuário** com uma estilização inicial.
4. Desenvolvi o componente para exibir os **repositórios do usuário pesquisado**, também com uma estilização inicial.
5. Comecei a criar estilizações mais definitivas, incluindo configurações globais e ajustes individuais para cada componente.
6. Implementei uma **paginação** para melhorar a visualização dos repositórios, inicialmente tentando fazer a lógica de paginação no frontend.

### Ajustes nos Dois Projetos
1. Migrei a lógica de paginação para o backend.
2. Criei um novo **endpoint** para obter o total de repositórios públicos de um usuário.
3. Realizei alterações no frontend para utilizar a nova lógica de paginação implementada no backend.






