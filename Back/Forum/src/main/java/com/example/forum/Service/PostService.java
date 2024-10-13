package com.example.forum.Service;

import com.example.forum.Dto.TagDto;
import com.example.forum.Entity.Post;
import com.example.forum.Entity.Tag;
import com.example.forum.Response.PostResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {

    Post savePost(String title,String descriptionSubject, MultipartFile file,List<Tag> postTags,String userId);
    List<Post> findAllPosts();
    Post retrievePost(Long postId);
    void removePost(Long postId);
    Post modifyPost(Post post);

    Post likePost(long id) ;
    int addLike(long id);
     int dislike(long id);
     List<Post> findByTags(List<Tag> tags);
    List<PostResponse> getPostByTagPaginate(Tag tag, Integer page, Integer size);
    public PostResponse getPostResponseById(Long postId);

}

