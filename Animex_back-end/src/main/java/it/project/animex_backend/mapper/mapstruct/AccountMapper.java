package it.project.animex_backend.mapper.mapstruct;

import it.project.animex_backend.dto.AccountDto;
import it.project.animex_backend.entity.Account;
import it.project.animex_backend.entity.Profile;
import it.project.animex_backend.entity.Role;
import it.project.animex_backend.entity.RoleType;
import it.project.animex_backend.mapper.BaseMethodMapper;
import org.mapstruct.*;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        builder = @Builder(disableBuilder = true))
public interface AccountMapper extends BaseMethodMapper<Account, AccountDto> {

    @Mapping(target = "profile", source = "profileId", qualifiedByName = "toProfile")
    @Mapping(target = "role", source = "role", qualifiedByName = "toRole")
    Account toEntity(AccountDto accountDto);


    @Named("toProfile")
    default Profile toProfile(Long profileId){
        if(profileId == null)
            return null;
        return Profile.builder()
                .id(profileId)
                .build();
    }

    @Named("toRole")
    default Role toRole(RoleType role){
        if(role == null)
            return null;
        return Role.builder()
                .name(role)
                .build();

    }

    @Mapping(target = "profileId", source = "profile", qualifiedByName = "toProfileId")
    @Mapping(target = "role", source = "role", qualifiedByName = "toRoleType")
    AccountDto toDTO(Account account);

    @Named("toProfileId")
    default Long toProfileId(Profile profile){
        if(profile == null)
            return null;
        return profile.getId();
    }
    @Named("toRoleType")
    default RoleType toRoleType(Role role){
        if(role == null)
            return null;
        return role.getName();
    }


}
