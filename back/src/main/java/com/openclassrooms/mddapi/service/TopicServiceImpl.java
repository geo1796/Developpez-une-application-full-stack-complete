package com.openclassrooms.mddapi.service;

import java.util.List;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;

@Service
@AllArgsConstructor
public class TopicServiceImpl implements TopicService {

	private TopicRepository topicRepository;

	@Override
	public List<Topic> getTopics() {
		return topicRepository.findAll();
	}
	
}
