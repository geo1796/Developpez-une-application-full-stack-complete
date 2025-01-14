package com.openclassrooms.mddapi;

import com.openclassrooms.mddapi.dto.request.RegisterRequest;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.service.security.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class MddApiApplication implements CommandLineRunner {

    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private CommentRepository commentRepository;

    public static void main(String[] args) {
        SpringApplication.run(MddApiApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        String dummyDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown " +
                "printer took a galley of type and scrambled it to make a type specimen book...";

        List<Topic> dummyTopics = List.of(
                Topic.builder().name("Thème 1").description(dummyDescription).build(),
                Topic.builder().name("Thème 2").description(dummyDescription).build(),
                Topic.builder().name("Thème 3").description(dummyDescription).build(),
                Topic.builder().name("Thème 4").description(dummyDescription).build(),
                Topic.builder().name("Thème 5").description(dummyDescription).build(),
                Topic.builder().name("Thème 6").description(dummyDescription).build()
        );

        topicRepository.saveAll(dummyTopics);

        User user = userDetailsService.register(new RegisterRequest("bob", "bob.sponge@test.com", "Gary123!"));

        List<Post> dummyPosts = List.of(
                Post.builder().name("Article 1").topic(dummyTopics.get(0)).content(dummyDescription).author(user).build(),
                Post.builder().name("Article 2").topic(dummyTopics.get(1)).content(dummyDescription).author(user).build(),
                Post.builder().name("Article 3").topic(dummyTopics.get(2)).content(dummyDescription).author(user).build(),
                Post.builder().name("Article 4").topic(dummyTopics.get(3)).content(dummyDescription).author(user).build(),
                Post.builder().name("Article 5").topic(dummyTopics.get(4)).content(dummyDescription).author(user).build(),
                Post.builder().name("Article 6").topic(dummyTopics.get(5)).content(dummyDescription).author(user).build()
        );

        postRepository.saveAll(dummyPosts);

        List<Comment> dummyComments = List.of(
                Comment.builder().content(dummyDescription).post(dummyPosts.get(0)).user(user).build(),
                Comment.builder().content(dummyDescription).post(dummyPosts.get(0)).user(user).build(),
                Comment.builder().content(dummyDescription).post(dummyPosts.get(0)).user(user).build(),
                Comment.builder().content(dummyDescription).post(dummyPosts.get(0)).user(user).build(),
                Comment.builder().content(dummyDescription).post(dummyPosts.get(0)).user(user).build(),
                Comment.builder().content(dummyDescription).post(dummyPosts.get(0)).user(user).build()
        );

        commentRepository.saveAll(dummyComments);
    }
}
