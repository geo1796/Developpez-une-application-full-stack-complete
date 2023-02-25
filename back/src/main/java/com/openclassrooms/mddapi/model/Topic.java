package com.openclassrooms.mddapi.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "topics")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Topic {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "topic_id")
	private Long id;
	
	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String description;

	@Override
	public boolean equals(Object o) {
		try {
			Topic other = (Topic) o;
			return Objects.equals(other.id, this.id);
		} catch (ClassCastException e) {
			return false;
		}
	}
}
