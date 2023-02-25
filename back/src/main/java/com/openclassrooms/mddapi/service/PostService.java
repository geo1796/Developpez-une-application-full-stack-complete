package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.Post;

import java.util.List;

public interface PostService {
    List<Post> getPosts();

    Post getPost(Long id);
}
