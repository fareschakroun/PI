package com.example.forum.Service;

import com.example.forum.Entity.Tag;
import com.example.forum.Exception.TagExistsException;
import com.example.forum.Exception.TagNotFoundException;
import com.example.forum.Repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TagServiceImp  implements TagService {
    private final TagRepository tagRepository;

    @Override
    public Tag save(Tag tag) {

        return tagRepository.save(tag);
    }

    @Override
    public Tag getTagById(Long id) {
        return tagRepository.findById(id).orElseThrow(TagNotFoundException::new);
    }

    @Override
    public Tag getTagById(String id) {
        long tagId = Long.parseLong(id); // Parsing id to long
        return tagRepository.findById(tagId).orElseThrow(TagNotFoundException::new);    }

    @Override
    public Tag getTagByName(String name) {
        Optional<Tag> optionalTag = tagRepository.findTagByName(name);

        Tag tag = optionalTag.orElseGet(() -> {
            Tag newTag = new Tag();
            newTag.setName(name);
            newTag.setTagUseCounter(0);
            System.out.println(newTag.getTagUseCounter());
             tagRepository.save(newTag);
            System.out.println(newTag.getTagUseCounter());
             return  newTag;
        });

        return tag;
    }

    @Override
    public Tag createNewTag(String name) {
        try {
            Tag tag = getTagByName(name);
            if (tag != null) {
                throw new TagExistsException();
            }
        } catch (TagNotFoundException e) {
            Tag newTag = new Tag();
            newTag.setName(name);
            newTag.setTagUseCounter(1);
            newTag.setDateCreated(new Date());
            newTag.setDateLastModified(new Date());
            return tagRepository.save(newTag);
        }
        return null;
    }

    @Override
    public Tag increaseTagUseCounter(Tag tag) {

        tag.setTagUseCounter(tag.getTagUseCounter()+1);
        tag.setDateLastModified(new Date());
        return tagRepository.save(tag);
    }

    @Override
    public Tag decreaseTagUseCounter(String name) {
        Tag targetTag = getTagByName(name);
        targetTag.setTagUseCounter(targetTag.getTagUseCounter()-1);
        targetTag.setDateLastModified(new Date());
        return tagRepository.save(targetTag);
    }

    @Override
    public List<Tag> getTimelineTags() {
        return tagRepository.findAll(
                PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "tagUseCounter"))
        ).getContent();
    }
}
