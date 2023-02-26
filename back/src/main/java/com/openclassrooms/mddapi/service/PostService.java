package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.response.CommentResponse;
import com.openclassrooms.mddapi.model.Post;

import java.util.List;

public interface PostService {
    List<Post> getPosts();

    Post getPost(Long id);

    List<CommentResponse> getComments(Long id);
}
