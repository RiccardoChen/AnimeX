package it.project.animex_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "profile_anime")
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ProfileAnime_id.class)
@Builder
public class ProfileAnime {

    @Id
    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;


    @Id
    @ManyToOne
    @JoinColumn(name = "anime_id")
    private Anime anime;
}
