package it.project.animex_backend.repository;

import it.project.animex_backend.entity.Role;
import it.project.animex_backend.entity.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(final RoleType name);
}
