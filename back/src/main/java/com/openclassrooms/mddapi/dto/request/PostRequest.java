package com.openclassrooms.mddapi.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PostRequest {
    @NotNull
    private Long topicId;
    @NotBlank
    @Size(min = 10, max = 50)
    private String name;
    @NotBlank
    @Size(min = 100, max = 255)
    private String content;
}
