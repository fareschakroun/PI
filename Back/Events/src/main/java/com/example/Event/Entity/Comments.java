package com.example.Event.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class Comments {
    private int level;
    private Comment comment;
    private List<Comments> list;
    private boolean replying;

    // Constructors, getters, and setters
}
