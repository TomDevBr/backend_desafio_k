package com.desafio_k.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserModel {
    public static class User {

        private String login;
        private String name;
        @JsonProperty("avatar_url")
        private String avatarUrl;

        public String getAvatarUrl() {
            return avatarUrl;
        }

        public String setAvatarUrl(String avatarUrl) {
            return this.avatarUrl = avatarUrl;
        }

        public String getLogin() {
            return login;
        }

        public void setLogin(String login) {
            this.login = login;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
