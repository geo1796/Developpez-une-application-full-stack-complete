package com.openclassrooms.mddapi.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CommentResponse {
    private Long id;
    private String content;
    private String authorName;
}
