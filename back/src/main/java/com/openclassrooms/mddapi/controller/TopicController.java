package com.openclassrooms.mddapi.controller;

import java.util.List;
import java.util.Optional;

import com.openclassrooms.mddapi.model.User;
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

	@GetMapping
	public List<Topic> getTopics() {
		return topicService.getTopics();
	}

	@GetMapping("/{id}/follow")
	public ResponseEntity<?> follow(@PathVariable Long id) {
		Optional<Topic> topic = topicService.findById(id);
		if (topic.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return ResponseEntity.ok().build();
	}
	
}
