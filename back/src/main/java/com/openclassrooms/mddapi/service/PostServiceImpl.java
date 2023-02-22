package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.repository.PostRepository;

public class PostServiceImpl implements PostService {

	private PostRepository postRepository;
	
	public PostServiceImpl(PostRepository postRepository) {
		this.postRepository = postRepository;
	}
	
}
