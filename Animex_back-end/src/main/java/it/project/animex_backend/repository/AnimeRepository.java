package it.project.animex_backend.repository;

import it.project.animex_backend.entity.Anime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnimeRepository extends JpaRepository<Anime, Long>, JpaSpecificationExecutor<Anime> {

    Optional<Anime> findAnimeByName(final String name);

    @Query("SELECT a.name FROM Anime a WHERE a.name LIKE ?1%")
    List<String> findNomiByIniziale(String lettera);


}
