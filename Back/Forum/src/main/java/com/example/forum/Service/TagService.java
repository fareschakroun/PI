package com.example.forum.Service;

import com.example.forum.Entity.Tag;

import java.util.List;

public interface TagService {
    Tag save(Tag tag);
    Tag getTagById(Long id);
    Tag getTagById(String id);
    Tag getTagByName(String name);
    Tag createNewTag(String name);
    Tag increaseTagUseCounter(Tag tag);
    Tag decreaseTagUseCounter(String name);
    List<Tag> getTimelineTags();
}
