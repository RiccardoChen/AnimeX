package it.project.animex_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "anime")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Anime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, name = "name")
    private String name;

    @Column(name = "category")
    private String category;

    @Column(name = "episode")
    private int episode;

    @Column(name = "description")
    private String description;

    @Column(name = "release_year")
    private int year;

    @Column(name = "img_url", unique = true)
    private String img;

    @Column(name = "video_url", unique = true)
    private String video;

    @OneToMany(mappedBy = "anime", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProfileAnime> animeProfile;


}
