package it.project.animex_backend.service;

import it.project.animex_backend.authentication.JwtTokenProvider;
import it.project.animex_backend.dto.AnimeDto;
import it.project.animex_backend.dto.Message;
import it.project.animex_backend.dto.PageDto;
import it.project.animex_backend.entity.Anime;
import it.project.animex_backend.mapper.mapstruct.AnimeMapper;
import it.project.animex_backend.repository.AnimeRepository;
import it.project.animex_backend.specifications.AnimeSpecifications;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AnimeService {

    private final AnimeRepository animeRepository;
    private final AnimeMapper animeMapper;


    public AnimeService(final AnimeRepository animeRepository, final AnimeMapper animeMapper, final JwtTokenProvider jwtTokenProvider) {
        this.animeRepository = animeRepository;
        this.animeMapper = animeMapper;
    }


    public PageDto<AnimeDto> allAnimeinPage(final AnimeSpecifications animeSpecifications) {
        Page<Anime> animePage = animeRepository.findAll(animeSpecifications.toSpecification(),
                animeSpecifications.toPageSpecification());
        Page<AnimeDto> animeDtoPage = animePage.map(animeMapper::toDTO);
        return new PageDto<>(animeDtoPage);
    }


    public AnimeDto findAnimeById(final Long id) {

        return animeMapper.toDTO(animeRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Id: " + id + " non esiste di questo anime")
        ));
    }

    public AnimeDto createAnime(final AnimeDto animeDto) {
        return animeMapper.toDTO(animeRepository.save(animeMapper.toEntity(animeDto)));
    }


    public AnimeDto updateAnime(final AnimeDto animeDto) {
        if (!animeRepository.existsById(animeDto.getId()))
            throw new NoSuchElementException("Id: " + animeDto.getId() + " non esiste , modifica negato");
        return animeMapper.toDTO(animeRepository.save(animeMapper.toEntity(animeDto)));
    }


    @Transactional
    public Message deleteAnime(final Long animeId) {

        String message = "";
        HttpStatus status;

        if (!animeRepository.existsById(animeId)) {
            message = "Anime non trovato con id: " + animeId;
            status = HttpStatus.NOT_FOUND;
        }else {
            animeRepository.deleteById(animeId);
            message = "Anime cancellato con successo!!!";
            status = HttpStatus.OK;
        }

        return new Message(message, status, Instant.now());
    }



    public PageDto<AnimeDto> animeOrderByLike() {

        List<Anime> animes = animeRepository.findAll();

        List<AnimeDto> sortedDtos = animes.stream()
                .map(animeMapper::toDTO)
                .sorted((a1, a2) -> Integer.compare(a2.getProfileIds().size(), a1.getProfileIds().size()))
                .limit(6)
                .toList();
        Page<AnimeDto> animeDtos = new PageImpl<>(sortedDtos, PageRequest.of(0, 3), sortedDtos.size());
        return new PageDto<>(animeDtos);
    }

    public AnimeDto findAnimeName(final String name){

        return animeMapper.toDTO(animeRepository.findAnimeByName(name).orElseThrow(
                () -> new NoSuchElementException("Nome: " + name + " non trovato")
        ));
    }

    public List<String> findAllAnimeStartWithName(final String name){
        return animeRepository.findNomiByIniziale(name);
    }





}
