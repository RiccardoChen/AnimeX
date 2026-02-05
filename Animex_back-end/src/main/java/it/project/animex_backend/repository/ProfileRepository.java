package it.project.animex_backend.repository;

import it.project.animex_backend.entity.Account;
import it.project.animex_backend.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long>, JpaSpecificationExecutor<Profile> {


   Optional <Profile> findProfileByAccount(final Account account);

   boolean existsProfileByName(final String name);
}
