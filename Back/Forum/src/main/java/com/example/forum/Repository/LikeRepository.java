package com.example.forum.Repository;

import com.example.forum.Entity.Dislike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Dislike,Integer> {
    List<Dislike> findByUserID(int user);
    Dislike findLikeByPostIDAndUserID(int post, int user);
    List<Dislike> findByPostID(int post);
}
