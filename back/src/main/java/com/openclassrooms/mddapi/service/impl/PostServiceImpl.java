package com.openclassrooms.mddapi.service.impl;

import com.openclassrooms.mddapi.exception.NotFoundException;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

	private PostRepository postRepository;

	@Override
	public List<Post> getPosts() {
		return postRepository.findAllByOrderByDateAsc();
	}

	@Override
	public Post getPost(Long id) {
		Optional<Post> post = postRepository.findById(id);
		if (post.isEmpty()) {
			throw new NotFoundException();
		}
		return post.get();
	}

}
