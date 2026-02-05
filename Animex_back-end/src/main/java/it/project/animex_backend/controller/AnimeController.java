package it.project.animex_backend.controller;

import it.project.animex_backend.dto.AnimeDto;
import it.project.animex_backend.dto.Message;
import it.project.animex_backend.dto.PageDto;
import it.project.animex_backend.service.AnimeService;
import it.project.animex_backend.specifications.AnimeSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/AnimeX/Anime")
public class AnimeController {

    @Autowired
    private AnimeService animeService;


    @GetMapping("/all")
    public ResponseEntity<PageDto<AnimeDto>> getAllAnime(@ModelAttribute final AnimeSpecifications animeSpecifications) {
        return ResponseEntity.status(HttpStatus.OK).body(animeService.allAnimeinPage(animeSpecifications));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimeDto> getAnimeId(@PathVariable final Long id) {

        return ResponseEntity.status(HttpStatus.OK).body(animeService.findAnimeById(id));
    }

    @GetMapping("/rank")
    public ResponseEntity<PageDto<AnimeDto>> orderByLike() {
        return ResponseEntity.status(HttpStatus.OK).body(animeService.animeOrderByLike());
    }

    @GetMapping("/findName/{name}")
    public ResponseEntity<AnimeDto> findAnimeByName(@PathVariable final String name){
        return ResponseEntity.status(HttpStatus.OK).body(animeService.findAnimeName(name));
    }

    @GetMapping("/findNames/{name}")
    public ResponseEntity<List<String>> findAnimeByNames(@PathVariable final String name){
        return ResponseEntity.status(HttpStatus.OK).body(animeService.findAllAnimeStartWithName(name));
    }

    @PostMapping("/create")
    public ResponseEntity<AnimeDto> createAnime(@RequestBody @Validated final AnimeDto animeDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(animeService.createAnime(animeDto));
    }

    @PutMapping("/upDate")
    public ResponseEntity<AnimeDto> updateAnime(@RequestBody @Validated final AnimeDto animeDto) {
        return ResponseEntity.status(HttpStatus.OK).body(animeService.updateAnime(animeDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Message> deleteAnime(@PathVariable final Long id) {

        return ResponseEntity.status(HttpStatus.OK).body(animeService.deleteAnime(id));
    }


}
