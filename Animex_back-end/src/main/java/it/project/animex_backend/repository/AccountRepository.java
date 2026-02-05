package it.project.animex_backend.repository;

import it.project.animex_backend.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface AccountRepository extends JpaRepository<Account, Long> , JpaSpecificationExecutor<Account> {

    boolean existsByUsernameAndPassword(final String username,final String password);

    boolean existsAccountByEmailAndPassword(final String email, final String password);

    Optional<Account> findAccountByUsernameAndPassword(final String username, final String password);

    Optional<Account> findAccountByEmailAndPassword(final  String email, final String password);

    @Query("SELECT a.username FROM Account a WHERE a.username LIKE ?1")
    List<String> findNomiByIniziale(String nomeParziale);


}
