package com.desafio_k.backend.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import com.desafio_k.backend.model.UserModel.User;

@ExtendWith(MockitoExtension.class)
public class GitHubApiServiceTest {

    @InjectMocks
    private GitHubApiService gitHubApiService;

    @Mock
    private RestTemplate restTemplate;

    @Test
    @DisplayName("Should return user details when user is found")
    void testGetUserSuccess() {
        String userSearched = "TomDevBr";
        String url = "https://api.github.com/users/TomDevBr";
        User mockUser = new User("TomDevBr", "Tomás de Jesus Oliveira Calheiros",
                "https://avatars.githubusercontent.com/u/72022149?v=4");

        when(restTemplate.getForObject(url, User.class)).thenReturn(mockUser);

        User result = gitHubApiService.getUser(userSearched);

        assertNotNull(result);
        assertEquals("TomDevBr", result.getLogin());
        assertEquals("Tomás de Jesus Oliveira Calheiros", result.getName());
        verify(restTemplate, times(1)).getForObject(url, User.class);
    }

    @Test
    @DisplayName("Should return null when user is not found")
    void testGetUserNotFound() {
        String userSearched = "NonExistentUser";
        String url = "https://api.github.com/users/NonExistentUser";

        when(restTemplate.getForObject(url, User.class)).thenReturn(null);

        User result = gitHubApiService.getUser(userSearched);

        assertNull(result);
        verify(restTemplate, times(1)).getForObject(url, User.class);

    }

}
