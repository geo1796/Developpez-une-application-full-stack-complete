package com.openclassrooms.mddapi.service.impl;

import com.openclassrooms.mddapi.dto.response.CommentResponse;
import com.openclassrooms.mddapi.exception.NotFoundException;
import com.openclassrooms.mddapi.mapper.CommentMapper;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.CommentRepository;
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
	private CommentRepository commentRepository;
	private CommentMapper commentMapper;
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

	@Override
	public List<CommentResponse> getComments(Long id) {
		return commentMapper.toDto(commentRepository.findByPostId(id));
	}
}
