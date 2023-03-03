package com.openclassrooms.mddapi.service.impl;

import com.openclassrooms.mddapi.dto.request.CommentRequest;
import com.openclassrooms.mddapi.dto.request.PostRequest;
import com.openclassrooms.mddapi.dto.response.CommentResponse;
import com.openclassrooms.mddapi.exception.NotFoundException;
import com.openclassrooms.mddapi.mapper.CommentMapper;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.TopicService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private TopicService topicService;
    private PostRepository postRepository;
    private CommentRepository commentRepository;
    private CommentMapper commentMapper;

    /**
     *
     * @return The list of Post fetched by the repository
     */
    @Override
    public List<Post> getPosts() {
        return postRepository.findAllByOrderByDateDesc();
    }

    /**
     *
     * @param id The id of the Post to retrieve
     * @return The Post corresponding to the param id
     * @throws NotFoundException if there is no Post corresponding to this id in the database
     */
    @Override
    public Post getPost(Long id) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isEmpty()) {
            throw new NotFoundException();
        }
        return post.get();
    }

    /**
     *
     * @param postId The id of the Post related to the list of Comment
     * @return The list of Comment fetched by the repository and mapped to a List of CommentResponse
     */
    @Override
    public List<CommentResponse> getComments(Long postId) {
        return commentMapper.toDto(commentRepository.findByPostId(postId));
    }

    /**
     *
     * @param postId The id of the Post related to the new Comment
     * @param commentRequest The dto holding the data of the new Comment
     * @return The new Comment saved to the database and mapped to a CommentResponse
     */
    @Override
    public CommentResponse addComment(Long postId, CommentRequest commentRequest) {
        Post post = getPost(postId);
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Comment comment = Comment.builder()
                .content(commentRequest.getContent())
                .user(user)
                .post(post)
                .build();
        return commentMapper.toDto(commentRepository.save(comment));
    }

    /**
     *
     * @param postRequest The dto holding the data of the new Post
     * @return The new Post saved to the database
     */
    @Override
    public Post addPost(PostRequest postRequest) {
        Topic topic = topicService.getById(postRequest.getTopicId());
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Post post = Post.builder()
                .topic(topic)
                .author(user)
                .name(postRequest.getName())
                .content(postRequest.getContent())
                .build();
        return postRepository.save(post);
    }
}
