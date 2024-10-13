package com.example.forum.Controller;

import com.example.forum.Dto.TagDto;
import com.example.forum.Entity.Post;
import com.example.forum.Entity.Tag;
import com.example.forum.Response.PostResponse;
import com.example.forum.Service.PostService;
import com.example.forum.Service.TagService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.type.TypeReference;
@RestController
@RequestMapping("/api/Posts")
@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
public class PostController {

    private final PostService service;
    private final TagService tagService;
    @PostMapping("/add-post")
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestParam ("title") String title,
                     @RequestParam ("descriptionSubject") String descriptionSubject,
                     @RequestParam("file") MultipartFile file,
                     @RequestParam("postTags") String postTags,
                     @RequestParam("userId") String userId
                     ) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String[] tagIds = postTags.split("\\s+"); // Split the postTags string by spaces
        List<Tag> listPostTag = Arrays.stream(tagIds)
                .map(tagId -> tagService.getTagById(tagId)) // Assuming service.findTagById(tagId) fetches a tag by its ID
                .filter(tag -> tag != null) // Filter out null tags (in case a tag with the given ID doesn't exist)
                .collect(Collectors.toList());        service.savePost(title,descriptionSubject,file, listPostTag,userId);
    }
    @GetMapping("/{tagName}")
    public ResponseEntity<?> getPostsByTag(@PathVariable("tagName") String tagName,
                                           @RequestParam("page") Integer page,
                                           @RequestParam("size") Integer size) {
        page = page < 0 ? 0 : page-1;
        size = size <= 0 ? 5 : size;
        Tag targetTag = tagService.getTagByName(tagName);
        List<PostResponse> taggedPosts = service.getPostByTagPaginate(targetTag, page, size);
        return new ResponseEntity<>(taggedPosts, HttpStatus.OK);
    }

//    @GetMapping("/posts/stream")
//    public ResponseEntity<String> streamPosts() {
//        MediaType mediaType = MediaType.TEXT_EVENT_STREAM;
//        return ResponseEntity.ok().contentType(mediaType)
//                .body(sseEmitter -> {
//                    // Register client connection logic
//                    sseEmitter.onCompletion(() -> System.out.println("Client disconnected"));
//                    sseEmitter.onError(throwable -> System.out.println("Error occurred: " + throwable.getMessage()));
//
//                    // Listen for new posts from the service
//                    Consumer<Post> listener = newPost -> {
//                        try {
//                            sseEmitter.send(convertPostToSseEvent(newPost));
//                        } catch (IOException e) {
//                            // Handle exception
//                        }
//                    };
//                    service.addPostListener(listener);
//
//                    // Unregister listener on disconnect (optional)
//                    sseEmitter.onTimeout(() -> service.removePostListener(listener));
//                });
//    }
//
//    private String convertPostToSseEvent(Post newPost) {
//        // Convert post data to a suitable format for SSE event (e.g., JSON)
//        ObjectMapper mapper = new ObjectMapper();
//        try {
//            String eventData = mapper.writeValueAsString(newPost);
//            return "data: " + eventData + "\n\n"; // Format for SSE event
//        } catch (JsonProcessingException e) {
//            throw new RuntimeException("Error converting post to JSON", e);
//        }
//    }

    @GetMapping("/retrieve-all-posts")
    public List<Post> getListPosts(){
        return service.findAllPosts();
    }

    @PutMapping("/update-post")
    public Post updatePost(@RequestBody Post post){
        return  service.modifyPost( post);
    }

    @DeleteMapping("/remove-post/{post-id}")
    public void removePost(@PathVariable("post-id") Long postId) {
        service.removePost(postId);
    }

    @GetMapping("/retrieve-post/{post-id}")
    public Post retrievePost(@PathVariable("post-id") Long postId) {
        return service.retrievePost(postId);
    }

    @PutMapping("/{postId}/like")
    public Post likePost(@PathVariable long postId){
        return service.likePost(postId);
    }

    @PutMapping("/dilikeSubject-id")
    public void dislike(@RequestParam("id") long id){service.dislike(id);}

    @GetMapping("/findTagByName/{tagname}")
    public Tag findTagByName(@PathVariable("tagname") String tagname)
    {
        return tagService.getTagByName(tagname);
    }
    @PostMapping("/findByTags")
    public List<Post> findByTags(@RequestBody List<Tag> taglist){
        return service.findByTags(taglist);
    }
}
