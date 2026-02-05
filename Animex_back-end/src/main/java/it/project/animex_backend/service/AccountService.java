package it.project.animex_backend.service;

import it.project.animex_backend.authentication.JwtTokenProvider;
import it.project.animex_backend.dto.*;
import it.project.animex_backend.dto.*;
import it.project.animex_backend.entity.Account;
import it.project.animex_backend.entity.Role;
import it.project.animex_backend.entity.RoleType;
import it.project.animex_backend.mapper.mapstruct.AccountMapper;
import it.project.animex_backend.repository.AccountRepository;
import it.project.animex_backend.repository.RoleRepository;
import it.project.animex_backend.specifications.AccountSpecifications;
import jakarta.transaction.Transactional;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    private final AccountMapper accountMapper;

    private final RoleRepository roleRepository;

    private final ProfileService profileService;

    private final JwtTokenProvider jwtTokenProvider;


    public AccountService(final AccountRepository accountRepository, final AccountMapper accountMapper, final RoleRepository roleRepository, final ProfileService profileService, final JwtTokenProvider jwtTokenProvider) {
        this.accountRepository = accountRepository;
        this.accountMapper = accountMapper;
        this.roleRepository = roleRepository;
        this.profileService = profileService;
        this.jwtTokenProvider = jwtTokenProvider;
    }


    public PageDto<AccountDto> allAccountinPage(final AccountSpecifications accountSpecifications) {
        Page<Account> accountPage = accountRepository.findAll(accountSpecifications.toSpecification(),
                accountSpecifications.toPageSpecification());
        Page<AccountDto> accountDtoPage = accountPage.map(accountMapper::toDTO);

        return new PageDto<>(accountDtoPage);
    }

    public AccountDto findAccountById(final Long id, final String token) {

        long tokenId = jwtTokenProvider.extractIdFromClaims(token);
        RoleType roleCheck = this.jwtTokenProvider.extractRoleClaims(token);

        if(roleCheck != RoleType.Admin) {
            if (id != tokenId) throw new NoSuchElementException("Id :" + id + " non corrisponde all'account");
        }

        return accountMapper.toDTO(accountRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Account con id: " + id + " non trovato")
        ));
    }

    public RoleMessage checkRole(final String token) {

        RoleType roleType = jwtTokenProvider.extractRoleClaims(token);
        return new RoleMessage(roleType == RoleType.Admin ? RoleType.Admin : RoleType.User, Instant.now());
    }

    public Message createAccount(final AccountDto accountDto) {

        Role role = roleRepository.findByName(accountDto.getRole())
                .orElseThrow(() -> new IllegalArgumentException("Role " + accountDto.getRole() + " non trovato"));

        Account account = accountMapper.toEntity(accountDto);
        account.setRole(role);
        account.setPassword(DigestUtils.sha256Hex(account.getPassword()));

        AccountDto accountDto1 = accountMapper.toDTO(accountRepository.save(account));

        ProfileDto profile = ProfileDto.builder()
                .name(accountDto1.getUsername())
                .sex("undefined")
                .accountId(accountDto1.getId())
                .build();

        profileService.saveProfile(profile);

        return new Message("Account creato con successo!!!", HttpStatus.CREATED, Instant.now());

    }

    public TokenMessage verifyAccount(final AccountDto accountDto) {

        String passwordCrypted = DigestUtils.sha256Hex(accountDto.getPassword());

        if (!accountRepository.existsAccountByEmailAndPassword(
                accountDto.getEmail(), passwordCrypted))
            throw new NoSuchElementException("Email o password errato, riprova.");


        AccountDto savedAccountDto = accountMapper.toDTO(accountRepository.findAccountByEmailAndPassword(
                accountDto.getEmail(), passwordCrypted).orElseThrow(
                () -> new NoSuchElementException("Account non trovato")));

        return new TokenMessage(jwtTokenProvider.generateToken(savedAccountDto), Instant.now());
    }


    @Transactional
    public Message updateAccount(final AccountDto accountDto, final String token) {

        long tokenId = jwtTokenProvider.extractIdFromClaims(token);
        RoleType roleCheck = this.jwtTokenProvider.extractRoleClaims(token);

        Account existingAccount = accountRepository.findById(accountDto.getId())
                .orElseThrow(() -> new NoSuchElementException("Id: " + accountDto.getId() + " non esiste , modifica negato"));

        RoleType targetRole = existingAccount.getRole().getName();

        if (roleCheck.equals(RoleType.User)) {
            if (accountDto.getId() != tokenId) {
                throw new NoSuchElementException("Non puoi modificare account diversi dal tuo.");
            }
        }

        else if (roleCheck.equals(RoleType.Admin)) {
            if (!tokenIdEqualsTargetId(tokenId, accountDto.getId()) && targetRole.equals(RoleType.Admin)) {
                throw new NoSuchElementException("Non puoi modificare account di altri admin.");
            }
        }

        existingAccount.setUsername(accountDto.getUsername());
        existingAccount.setEmail(accountDto.getEmail());
        existingAccount.setPassword(DigestUtils.sha256Hex(accountDto.getPassword()));

        Role role = roleRepository.findByName(accountDto.getRole())
                .orElseThrow(() -> new IllegalArgumentException("Role " + accountDto.getRole() + " non trovato"));
        existingAccount.setRole(role);

        accountRepository.save(existingAccount);

        return new Message(jwtTokenProvider.generateToken(accountMapper.toDTO(existingAccount)), HttpStatus.OK, Instant.now());


    }

    private boolean tokenIdEqualsTargetId(long tokenId, long targetId) {
        return tokenId == targetId;
    }

    @Transactional
    public Message changePassword(String oldPassword, String newPassword,String token) {

        long tokenId = jwtTokenProvider.extractIdFromClaims(token);

        Account existingAccount = accountRepository.findById(tokenId)
                .orElseThrow(() -> new NoSuchElementException("Account non trovato"));

        String hashedOldPassword = DigestUtils.sha256Hex(oldPassword);

        if (!existingAccount.getPassword().equals(hashedOldPassword)) {
            throw new NoSuchElementException("Vecchia password errata");
        }

        if(oldPassword.equals(newPassword)){
            throw new NoSuchElementException("Nuova password uguale a quella vecchia");
        }

        existingAccount.setPassword(DigestUtils.sha256Hex(newPassword));
        accountRepository.save(existingAccount);

        return new Message("Password aggiornato con successo", HttpStatus.OK, Instant.now());
    }



    @Transactional
    public Message deleteAccount(final Long id) {

        String message = "";
        HttpStatus status;

        if (!accountRepository.existsById(id)) {
            message = "Id: " + id + " non esiste";
            status = HttpStatus.NOT_FOUND;
        } else {
            accountRepository.deleteById(id);
            message = "Id: " + id + " cancellato con successo !!!";
            status = HttpStatus.OK;
        }
        return new Message(message, status, Instant.now());
    }


    public List<String> findAccName(final String accName){
        return this.accountRepository.findNomiByIniziale(accName + "%");
    }


    public Message isTokenValid(final String token) {
        String message;
        HttpStatus status;

        try {
            if (token == null || token.trim().isEmpty()) {
                message = "Token valido";
                status = HttpStatus.OK;
            } else if (jwtTokenProvider.isValid(token)) {
                message = "Token valido";
                status = HttpStatus.OK;
            } else {
                message = "Token scaduto";
                status = HttpStatus.UNAUTHORIZED;
            }
        } catch (Exception e) {
            message = "Token non valido";
            status = HttpStatus.UNAUTHORIZED;
        }

        return new Message(message, status, Instant.now());
    }




}
