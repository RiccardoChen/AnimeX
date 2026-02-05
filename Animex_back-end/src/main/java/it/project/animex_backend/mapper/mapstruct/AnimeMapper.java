package it.project.animex_backend.mapper.mapstruct;

import it.project.animex_backend.dto.AnimeDto;
import it.project.animex_backend.entity.Anime;
import it.project.animex_backend.entity.Profile;
import it.project.animex_backend.entity.ProfileAnime;
import it.project.animex_backend.mapper.BaseMethodMapper;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface AnimeMapper extends BaseMethodMapper<Anime, AnimeDto> {

    @Mapping(target = "animeProfile", source = "profileIds", qualifiedByName = "toAnimeProfile")
    Anime toEntity(AnimeDto animeDto);

    @Named("toAnimeProfile")
    default List<ProfileAnime> toAnimeProfile(List<Long> profileIds){
        if(profileIds == null)
            return new ArrayList<>();
        List<ProfileAnime> profileAnimes = new ArrayList<>();
        for(Long profileId: profileIds){
            ProfileAnime profileAnime = new ProfileAnime(Profile.builder().id(profileId).build(), null);
            profileAnimes.add(profileAnime);
        }
        return profileAnimes;
    }


    @Mapping(target = "profileIds", source = "animeProfile", qualifiedByName = "toProfileIds")
    AnimeDto toDTO(Anime anime);

    @Named("toProfileIds")
    default List<Long> toProfileIds(List<ProfileAnime> profileAnimes){
        if(profileAnimes == null)
            return new ArrayList<>();
        List<Long> profileIds = new ArrayList<>();
        for(ProfileAnime profileAnime: profileAnimes){
            profileIds.add(profileAnime.getProfile().getId());
        }
        return profileIds;
    }
}
