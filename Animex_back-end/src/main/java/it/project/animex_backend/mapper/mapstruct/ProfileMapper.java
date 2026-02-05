package it.project.animex_backend.mapper.mapstruct;

import it.project.animex_backend.dto.ProfileDto;
import it.project.animex_backend.entity.Account;
import it.project.animex_backend.entity.Anime;
import it.project.animex_backend.entity.Profile;
import it.project.animex_backend.entity.ProfileAnime;
import it.project.animex_backend.mapper.BaseMethodMapper;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface ProfileMapper extends BaseMethodMapper<Profile, ProfileDto> {

    @Mapping(target = "account", source = "accountId", qualifiedByName = "toAccount")
    @Mapping(target = "profileAnime", source = "animeIds", qualifiedByName = "toProfileAnime")
    Profile toEntity(ProfileDto profileDto);

    @Named("toAccount")
    default Account toAccount(Long accountId){
        if(accountId == null)
            return null;
        return Account.builder()
                .id(accountId)
                .build();
    }

    @Named("toProfileAnime")
    default List<ProfileAnime> toProfileAnime(List<Long> animeIds){
        if(animeIds == null)
            return new ArrayList<>();
        List<ProfileAnime> profileAnimes = new ArrayList<>();
        for(Long animeId: animeIds){
            ProfileAnime profileAnime = new ProfileAnime(null, Anime.builder().id(animeId).build());
            profileAnimes.add(profileAnime);
        }
        return profileAnimes;
    }

    @Mapping(target = "accountId", source = "account", qualifiedByName = "toAccountId")
    @Mapping(target = "animeIds", source = "profileAnime", qualifiedByName = "toAnimeIds")
    ProfileDto toDTO(Profile profile);

    @Named("toAccountId")
    default Long toAccountId(Account account){
        if(account == null)
            return null;
        return account.getId();
    }

    @Named("toAnimeIds")
    default List<Long> toAnimeIds(List<ProfileAnime> profileAnimes){
        if(profileAnimes == null)
            return new ArrayList<>();
        List<Long> animeIds = new ArrayList<>();
        for(ProfileAnime profileAnime: profileAnimes){
            animeIds.add(profileAnime.getAnime().getId());
        }
        return animeIds;
    }
}
