package com.openclassrooms.mddapi.controller;

import java.util.List;

import com.openclassrooms.mddapi.dto.response.TopicResponse;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.service.TopicService;

@RestController
@RequestMapping("/topic")
@AllArgsConstructor
public class TopicController {
	
	private TopicService topicService;
	private UserService userService;

	@GetMapping
	public List<TopicResponse> getTopics() {
		return topicService.getTopics();
	}

	@PostMapping("/{id}/follow")
	public ResponseEntity<?> follow(@PathVariable Long id) {
		Topic topic = topicService.getById(id);
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		userService.followTopic(user, topic);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{id}/follow")
	public ResponseEntity<?> unfollowTopic(@PathVariable Long id) {
		Topic topic = topicService.getById(id);
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		userService.unfollowTopic(user, topic);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/following")
	public List<TopicResponse> getFollowing() {
		return topicService.getFollowing();
	}
}
