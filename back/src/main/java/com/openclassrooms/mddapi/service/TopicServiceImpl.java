package com.openclassrooms.mddapi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;

@Service
public class TopicServiceImpl implements TopicService {

	private TopicRepository topicRepository;
	
	public TopicServiceImpl(TopicRepository topicRepository) {
		this.topicRepository = topicRepository;
	}

	@Override
	public List<Topic> getTopics() {
		return topicRepository.findAll();
	}
	
}
