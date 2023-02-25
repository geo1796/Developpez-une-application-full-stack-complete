package com.openclassrooms.mddapi.service;

import java.util.List;

import com.openclassrooms.mddapi.dto.response.TopicResponse;
import com.openclassrooms.mddapi.model.Topic;

public interface TopicService {

	List<TopicResponse> getTopics();

	Topic getById(Long id);

}
