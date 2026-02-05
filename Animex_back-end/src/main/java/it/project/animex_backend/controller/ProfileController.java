package it.project.animex_backend.controller;

import it.project.animex_backend.dto.AccProfileDto;
import it.project.animex_backend.dto.ProfileDto;
import it.project.animex_backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/AnimeX/Profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;


    @GetMapping("/{id}")
    public ResponseEntity<ProfileDto> getProfileId(@PathVariable final Long id,@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return ResponseEntity.status(HttpStatus.OK).body(profileService.findProfileById(id,token));
    }

    @PutMapping("/upDate")
    public ResponseEntity<ProfileDto> updateProfile(@RequestBody @Validated final ProfileDto profileDto, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return ResponseEntity.status(HttpStatus.OK).body(profileService.updateProfile(profileDto,token));
    }

    @GetMapping("/takeData")
    public ResponseEntity<AccProfileDto> takeData(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return ResponseEntity.status(HttpStatus.OK).body(profileService.findAccountUserByToken(token));
    }


}
