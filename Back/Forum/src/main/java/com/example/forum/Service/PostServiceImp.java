package com.example.forum.Service;

import com.example.forum.Dto.TagDto;
import com.example.forum.Entity.Post;
import com.example.forum.Entity.Tag;
import com.example.forum.Exception.TagNotFoundException;
import com.example.forum.Repository.CommentRepository;
import com.example.forum.Repository.PostRepository;
import com.example.forum.Response.PostResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class PostServiceImp implements PostService {
    private final PostRepository postRepo;
    private final TagService tagService;
    private final CommentRepository commentRepo;
    private final List<Consumer<Post>> listeners = new ArrayList<>();
    @Override
    public Post savePost(String title,String descriptionSubject,MultipartFile file,List<Tag> postTags,String userId){
        Post p = new Post();
        p.setUserId(Integer.parseInt(userId));
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        if(fileName.contains(".."))
        {
            log.error("not a valid file");
        }
        try {
            p.setImage(Base64.getEncoder().encodeToString(file.getBytes()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        p.setDescriptionSubject(descriptionSubject);
        p.setTitle(title);
        p.setLikesSubject(0);
        p.setDateCreationPost(new Date());

        if (postTags != null && postTags.size() > 0) {
            postTags.forEach(tagDto -> {
                Tag tagToAdd = new Tag();

                    Tag existingTag = tagService.getTagByName(tagDto.getName());
                    if (existingTag != null) {
                        tagToAdd = tagService.increaseTagUseCounter(tagDto);
                       //      tagToAdd=   tagService.save(tagToAdd);
                    }

                p.getPostTags().add(tagToAdd);
            });
        }
      return  postRepo.save(p);
        //  notifyNewPost(p);
    }

    @Override
    public List<Post> findAllPosts() {
        return postRepo.findAll();
    }

    @Override
    public Post retrievePost(Long postId) {
        return postRepo.findById(postId).get();
    }

    @Override
    public void removePost(Long postId) {
        postRepo.deleteById(postId);
    }
    @Override
    public Post modifyPost(Post post) {
        return postRepo.save(post);
    }

    @Override
    public Post likePost(long id) {
        return null;
    }

//    @Override
//    public Post likePost(long postId) {
//        Post post = postRepo.findById(postId).orElse(null);
//        if (post != null) {
//            post.setLikesSubject(post.getLikesSubject() + 1);
//            return postRepo.save(post);
//        }
//        return null;
//    }

    @Override
    public int addLike(long id) {
        Post a = postRepo.findById(id).orElse(new Post());
        int nb = a.getLikesSubject() + 1;
        return postRepo.addLike(nb , id) ; }

    @Override
    public int dislike(long id) {
        Post a = postRepo.findById(id).orElse(new Post());
        int nb = a.getLikesSubject() -1 ;
        return postRepo.addLike(nb , id) ; }

    @Override
    public List<Post> findByTags(List<Tag> tags) {

        return  postRepo.findPostsByTags(tags) ;
    }

    @Override
    public PostResponse getPostResponseById(Long postId) {

        Post foundPost = retrievePost(postId);
        return PostResponse.builder()
                .post(foundPost)
                .build();
    }
    @Override
    public List<PostResponse> getPostByTagPaginate(Tag tag, Integer page, Integer size) {
        return postRepo.findPostsByPostTags(
                        tag,
                        PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "dateCreated")))
                .stream().map(this::postToPostResponse).collect(Collectors.toList());
    }
    private PostResponse postToPostResponse(Post post) {
        return PostResponse.builder()
                .post(post)
                .build();
    }




}
