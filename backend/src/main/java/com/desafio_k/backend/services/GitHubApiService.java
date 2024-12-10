package com.desafio_k.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;

import com.desafio_k.backend.model.RepositoryModel;
import com.desafio_k.backend.model.UserModel;
import com.desafio_k.backend.model.UserModel.User;

import java.util.Arrays;
import java.util.List;

@Service
public class GitHubApiService {

    private RestTemplate restTemplate;

    private final String baseUrl = "https://api.github.com";

    public GitHubApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public User getUser(String name) {
        String url = String.format("%s/users/%s", baseUrl, name);
        return restTemplate.getForObject(url, User.class);

    }

    public List<RepositoryModel.Repository> getRepositories(String name, int perPage, int page) {
        String url = String.format("%s/users/%s/repos?per_page=%d&page=%d", baseUrl, name, perPage, page);
        RepositoryModel.Repository[] repositories = restTemplate.getForObject(url, RepositoryModel.Repository[].class);
        return Arrays.asList(repositories);
    }

    public int getTotalRepositoryCount(String name) {
        String url = String.format("%s/users/%s", baseUrl, name);
        UserModel.User user = restTemplate.getForObject(url, UserModel.User.class);
        return user != null ? user.getPublicRepos() : 0;
    }

}