package com.desafio_k.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.desafio_k.backend.model.RepositoryModel.Repository;
import com.desafio_k.backend.model.UserModel.User;
import com.desafio_k.backend.services.GitHubApiService;

import java.util.List;

@RestController
public class GitHubApiController {

    private final GitHubApiService userService;

    public GitHubApiController(GitHubApiService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{name}")
    public User getUser(@PathVariable String name) {
        return userService.getUser(name);
    }

    @GetMapping("/users/{name}/repos")
    public List<Repository> getUserRepositories(@PathVariable String name) {
        return userService.getRepositories(name);
    }
}