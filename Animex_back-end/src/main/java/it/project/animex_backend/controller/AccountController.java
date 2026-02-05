package it.project.animex_backend.controller;

import it.project.animex_backend.dto.*;
import it.project.animex_backend.dto.*;
import it.project.animex_backend.service.AccountService;
import it.project.animex_backend.specifications.AccountSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/AnimeX/Account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/all")
    public ResponseEntity<PageDto<AccountDto>> getAllAccount(@ModelAttribute final AccountSpecifications accountSpecifications) {
        return ResponseEntity.status(HttpStatus.OK).body(accountService.allAccountinPage(accountSpecifications));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountDto> getAccountId(@PathVariable final Long id,@RequestHeader(HttpHeaders.AUTHORIZATION) String token ) {
        return ResponseEntity.status(HttpStatus.OK).body(accountService.findAccountById(id, token));
    }

    @GetMapping("/role")
    public ResponseEntity<RoleMessage> checkRole(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return ResponseEntity.status(HttpStatus.OK).body(accountService.checkRole(token));
    }

    @GetMapping("/findName/{name}")
    public ResponseEntity<List<String>> findAccName(@PathVariable final String name){
        return ResponseEntity.status(HttpStatus.OK).body(this.accountService.findAccName(name));
    }

    @GetMapping("/validT")
    public ResponseEntity<Message> isValidToken(@RequestHeader(name = HttpHeaders.AUTHORIZATION, required = false, defaultValue = "") String token) {
        return ResponseEntity.status(HttpStatus.OK).body(accountService.isTokenValid(token));
    }



    @PostMapping("/signIn")
    public ResponseEntity<Message> signIn(@RequestBody @Validated final AccountDto accountDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(accountService.createAccount(accountDto));
    }

    @PostMapping("/logIn")
    public ResponseEntity<TokenMessage> logIn(@RequestBody final AccountDto accountDto) {
        return ResponseEntity.status(HttpStatus.OK).body(accountService.verifyAccount(accountDto));
    }

    @PutMapping("/upDate")
    public ResponseEntity<Message> upDateAccount(@RequestBody @Validated final AccountDto accountDto, @RequestHeader(HttpHeaders.AUTHORIZATION) String token ) {
        return ResponseEntity.status(HttpStatus.OK).body(accountService.updateAccount(accountDto, token));
    }

    @PutMapping("/changePass")
    public ResponseEntity<Message> updatePassword(@RequestBody @Validated final PasswordDto passwordDto, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return ResponseEntity.status(HttpStatus.OK).body(accountService.changePassword(passwordDto.getOldPassword(), passwordDto.getNewPassword(), token));
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Message> deleteAccount(@PathVariable final Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(accountService.deleteAccount(id));
    }

}
