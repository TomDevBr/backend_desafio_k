package com.desafio_k.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.desafio_k.backend.model.RepositoryModel.Repository;
import com.desafio_k.backend.model.UserModel.User;

import java.util.Arrays;
import java.util.List;

@Service
public class GitHubApiService {

    private final RestTemplate restTemplate;
    private final String baseUrl = "https://api.github.com";

    public GitHubApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public User getUser(String name) {
        String url = String.format("%s/users/%s", baseUrl, name);
        return restTemplate.getForObject(url, User.class);

    }

    public List<Repository> getRepositories(String name) {
        String url = String.format("%s/users/%s/repos", baseUrl, name);
        Repository[] repositories = restTemplate.getForObject(url, Repository[].class);
        return Arrays.asList(repositories);
    }
}