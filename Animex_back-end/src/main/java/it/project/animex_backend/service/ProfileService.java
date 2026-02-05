package it.project.animex_backend.service;

import it.project.animex_backend.authentication.JwtTokenProvider;
import it.project.animex_backend.dto.*;
import it.project.animex_backend.dto.AccProfileDto;
import it.project.animex_backend.dto.AccountDto;
import it.project.animex_backend.dto.Message;
import it.project.animex_backend.dto.ProfileDto;
import it.project.animex_backend.entity.Anime;
import it.project.animex_backend.entity.Profile;
import it.project.animex_backend.entity.ProfileAnime;
import it.project.animex_backend.mapper.mapstruct.AccountMapper;
import it.project.animex_backend.mapper.mapstruct.ProfileMapper;
import it.project.animex_backend.repository.AccountRepository;
import it.project.animex_backend.repository.AnimeRepository;
import it.project.animex_backend.repository.ProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.NoSuchElementException;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    private final ProfileMapper profileMapper;

    private final AccountRepository accountRepository;

    private final AccountMapper accountMapper;

    private final AnimeRepository animeRepository;

    private final JwtTokenProvider jwtTokenProvider;

    public ProfileService(final ProfileRepository profileRepository, final ProfileMapper profileMapper, final AccountRepository accountRepository, final AccountMapper accountMapper, final AnimeRepository animeRepository, final JwtTokenProvider jwtTokenProvider) {
        this.profileRepository = profileRepository;
        this.profileMapper = profileMapper;
        this.accountRepository = accountRepository;
        this.accountMapper = accountMapper;
        this.animeRepository = animeRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }


    public ProfileDto findProfileById(final Long id, final String token) {

        long tokenId = jwtTokenProvider.extractIdFromClaims(token);

        if(id != tokenId) throw  new NoSuchElementException("Id:" + id + " non corrisponde al id del utente");


        return profileMapper.toDTO(profileRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Profile con id: " + id + " non torvato")
        ));
    }

    public ProfileDto findProfileByAccount(final AccountDto accountDto, final String token) {

        long tokenId = jwtTokenProvider.extractIdFromClaims(token);

        if(accountDto.getId() != tokenId) throw  new NoSuchElementException("Id:" + accountDto.getId() + " non corrisponde al id del utente");

        return profileMapper.toDTO(profileRepository.findProfileByAccount(accountMapper.toEntity(accountDto)).orElseThrow(
                () -> new NoSuchElementException("Profilo non trovato con questo Account")
        ));

    }

    @Transactional
    public ProfileDto updateProfile(final ProfileDto profileDto, final String token) {

        long id = jwtTokenProvider.extractIdFromClaims(token);

        Profile profile = profileRepository.findById(profileDto.getId()).orElseThrow(
                () -> new NoSuchElementException("Profilo non trovato con id: " + profileDto.getId()));

        if(profile.getAccount().getId() != id) throw new NoSuchElementException("Id:" + profileDto.getId() + " non corrisponde al id del utente");


        profile.setName(profileDto.getName());
        profile.setSex(profileDto.getSex());
        profile.setBirthday(profileDto.getBirthday());

        profile.getProfileAnime().clear();

        if (profileDto.getAnimeIds() != null) {
            for (long animeId : profileDto.getAnimeIds()) {
                Anime anime = animeRepository.findById(animeId).orElseThrow(
                        () -> new NoSuchElementException("Anime non trovato con id : " + animeId));

                ProfileAnime profileAnime = ProfileAnime.builder()
                        .profile(profile)
                        .anime(anime)
                        .build();

                profile.getProfileAnime().add(profileAnime);
            }

        }
        return profileMapper.toDTO(profileRepository.save(profile));
    }

    public AccProfileDto findAccountUserByToken(final String token) {

        AccProfileDto accProfile = new AccProfileDto();

        long id = jwtTokenProvider.extractIdFromClaims(token);

        AccountDto accountDto = accountMapper.toDTO(accountRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Account non trovato con id:" + id)));

        ProfileDto profileDto = this.findProfileByAccount(accountDto, token);

        accProfile.setAccount(accountDto);
        accProfile.setProfile(profileDto);

        return accProfile;
    }


    public void saveProfile(final ProfileDto profileDto) {
        profileRepository.save(profileMapper.toEntity(profileDto));
    }

    @Transactional
    public Message deleteProfile(final Long id) {

        String message = "";
        HttpStatus status;


        if (!profileRepository.existsById(id)) {
            message = "Id: " + id + " non esiste del profile";
            status = HttpStatus.NOT_FOUND;
        } else {
            profileRepository.deleteById(id);
            message = "Id: " + id + " cancellato con successo !!!";
            status = HttpStatus.OK;
        }
        return new Message(message, status, Instant.now());
    }

}
