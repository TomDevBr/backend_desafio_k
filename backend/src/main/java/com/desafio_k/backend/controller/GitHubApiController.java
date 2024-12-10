package com.desafio_k.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.desafio_k.backend.model.RepositoryModel;
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
    public ResponseEntity<List<RepositoryModel.Repository>> getUserRepositories(
            @PathVariable String name,
            @RequestParam(defaultValue = "5") int perPage,
            @RequestParam(defaultValue = "1") int page) {
        List<RepositoryModel.Repository> repositories = userService.getRepositories(name, perPage, page);
        return ResponseEntity.ok(repositories);
    }

    @GetMapping("/users/{name}/repos/count")
    public ResponseEntity<Integer> getTotalRepositoryCount(@PathVariable String name) {
        int count = userService.getTotalRepositoryCount(name);
        return ResponseEntity.ok(count);
    }
}