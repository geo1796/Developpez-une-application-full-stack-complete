package com.openclassrooms.mddapi.service.impl;

import java.util.List;
import java.util.Optional;

import com.openclassrooms.mddapi.service.TopicService;
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

	@Override
	public Optional<Topic> findById(Long id) {
		return topicRepository.findById(id);
	}

}
