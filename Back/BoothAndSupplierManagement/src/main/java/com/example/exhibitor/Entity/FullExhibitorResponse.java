package com.example.exhibitor.Entity;


import jakarta.persistence.Entity;
import lombok.*;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FullExhibitorResponse {

    private Exhibitor exhibitor;

    private List<Booth> BoothPosition;
}
