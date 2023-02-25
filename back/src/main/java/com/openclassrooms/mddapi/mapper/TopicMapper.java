package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.response.TopicResponse;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TopicMapper {
    public TopicResponse toDto(Topic topic, User user) {
        return TopicResponse.builder()
                .followed(user.getFollowing().contains(topic))
                .id(topic.getId())
                .name(topic.getName())
                .description(topic.getDescription())
                .build();
    }

    public List<TopicResponse> toDto(List<Topic> topics, User user) {
        return topics.stream().map(topic -> toDto(topic, user)).collect(Collectors.toList());
    }
}
