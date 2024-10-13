package com.example.forum.Response;

import com.example.forum.Entity.Post;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class PostResponse {
    private Post post;
    private Boolean likedByAuthUser;
}
