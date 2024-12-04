package com.desafio_k.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RepositoryModel {
    public static class Repository {
        private String name;
        @JsonProperty("html_url")
        private String htmlUrl;
        private String description;

        public String getName() {
            return name;
        }

        public String getHtmlUrl() {
            return htmlUrl;
        }

        public String getDescription() {
            return description;
        }

        public void setName(String name) {
            this.name = name;
        }

        public void setHtmlUrl(String htmlUrl) {
            this.htmlUrl = htmlUrl;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }
}
