package com.openclassrooms.mddapi.service.impl;

import java.util.List;
import java.util.Optional;

import com.openclassrooms.mddapi.dto.response.TopicResponse;
import com.openclassrooms.mddapi.exception.NotFoundException;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.TopicService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;

@Service
@AllArgsConstructor
public class TopicServiceImpl implements TopicService {

	private TopicRepository topicRepository;
	private TopicMapper topicMapper;

	/**
	 *
	 * @return The list of Topic fetched by the repository and mapped to a list of TopicResponse
	 */
	@Override
	public List<TopicResponse> getTopics() {
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return topicMapper.toDto(topicRepository.findAll(), user);
	}

	/**
	 *
	 * @return The list of Topic followed by the authenticated User and mapped to a list of Topic Response
	 */
	@Override
	public List<TopicResponse> getFollowing() {
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return topicMapper.toDto(user.getFollowing(), user);
	}

	/**
	 *
	 * @param id The id of the Topic to retrieve
	 * @return The Topic corresponding to the param id
	 * @throws NotFoundException if there is no Topic corresponding to this id in database
	 */
	@Override
	public Topic getById(Long id) {
		Optional<Topic> topic = topicRepository.findById(id);
		if (topic.isEmpty()) {
			throw new NotFoundException();
		}
		return topic.get();
	}
}
