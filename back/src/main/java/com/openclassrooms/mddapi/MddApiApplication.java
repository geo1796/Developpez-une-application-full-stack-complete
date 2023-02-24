package com.openclassrooms.mddapi;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class MddApiApplication implements CommandLineRunner {

    @Autowired
    private TopicRepository topicRepository;

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
    }
}
