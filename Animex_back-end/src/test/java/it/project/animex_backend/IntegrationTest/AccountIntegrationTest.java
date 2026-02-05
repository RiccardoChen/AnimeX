package it.project.animex_backend.IntegrationTest;

import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;
import it.project.animex_backend.BaseIntegrationTest;
import it.itsrizzoli.animex_sb.dto.*;
import it.project.animex_backend.dto.*;
import it.project.animex_backend.entity.RoleType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


public class AccountIntegrationTest extends BaseIntegrationTest {

    @Test
    @Order(0)
    @DisplayName("Signin")
    void deveRiuscireARegistrare() {

        final AccountDto request = AccountDto.builder()
                .username("richard3")
                .email("richard3@gmail.com")
                .password("11111111")
                .role(RoleType.User)
                .build();


        final Message actual = given()
                .port(super.port)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/AnimeX/Account/signIn")
                .then()
                .statusCode(201)
                .contentType(ContentType.JSON)
                .extract()
                .as(new TypeRef<>() {
                });

        final Message expected = Message.builder()
                .message("Account creato con successo!!!")
                .status(HttpStatus.CREATED)
                .timeStamp(Instant.now())
                .build();

        Instant now = Instant.now();

        assertThat(actual)
                .usingRecursiveComparison()
                .ignoringFields("timeStamp")
                .isEqualTo(expected);

        assertThat(actual.getTimeStamp())
                .isBeforeOrEqualTo(now)
                .isAfterOrEqualTo(now.minusSeconds(5));


    }

    @Test
    @Order(1)
    @DisplayName("Login")
    void login() {
        final AccountDto request1 = AccountDto.builder()
                .username("richard1")
                .password("11111111")
                .build();

        TokenMessage actual1 = given()
                .port(super.port)
                .contentType(ContentType.JSON)
                .body(request1)
                .when()
                .log().all()
                .post("/AnimeX/Account/logIn")
                .then()
                .log().all()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .extract()
                .as(new TypeRef<>() {
                });

        assertThat(actual1.getMessage()).isNotNull().isNotBlank();
    }


    @Test
    @Order(2)
    @DisplayName("Get All Account")
    void getAllAccount() {

        final List<AccountDto> accountList = List.of(
                AccountDto.builder()
                        .id(1L)
                        .username("richard1")
                        .email("richard1@gmail.com")
                        .password("ee79976c9380d5e337fc1c095ece8c8f22f91f306ceeb161fa51fecede2c4ba1")
                        .profileId(1L)
                        .role(RoleType.Admin)
                        .build(),

                AccountDto.builder()
                        .id(2L)
                        .username("richard2")
                        .email("richard2@gmail.com")
                        .password("ee79976c9380d5e337fc1c095ece8c8f22f91f306ceeb161fa51fecede2c4ba1")
                        .profileId(2L)
                        .role(RoleType.User)
                        .build()

        );

        final Page<AccountDto> accountPage = new PageImpl<>(accountList,
                PageRequest.of(0, 2), accountList.size());
        final PageDto<AccountDto> expected = new PageDto<>(accountPage);


        final PageDto<AccountDto> actual = given()
                .port(super.port)
                .header("Authorization", jwtToken)
                .when()
                .get("AnimeX/Account/all")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .extract()
                .as(new TypeRef<>() {
                });


        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @Order(3)
    @DisplayName("Get Account Id")
    void getAccountById() {

        final Long requestIndex = 1L;

        final AccountDto expected = AccountDto.builder()
                .id(1L)
                .username("richard1")
                .email("richard1@gmail.com")
                .password("ee79976c9380d5e337fc1c095ece8c8f22f91f306ceeb161fa51fecede2c4ba1")
                .profileId(1L)
                .role(RoleType.Admin)
                .build();

        final AccountDto actual = given()
                .port(super.port)
                .header("Authorization", jwtToken)
                .pathParam("id", requestIndex)
                .when()
                .get("AnimeX/Account/{id}")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .extract()
                .as(new TypeRef<>() {
                });

        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @Order(4)
    @DisplayName("Get Account role")
    void getAccountRole() {

        final RoleMessage roleMessage = RoleMessage.builder()
                .role(RoleType.Admin)
                .timeStamp(Instant.now())
                .build();

        final RoleMessage actual = given()
                .port(super.port)
                .header("Authorization", jwtToken)
                .when()
                .get("AnimeX/Account/role")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .extract()
                .as(new TypeRef<>() {
                });


        assertThat(actual)
                .usingRecursiveComparison()
                .ignoringFields("timeStamp")
                .isEqualTo(roleMessage);

    }

    @Test
    @Order(5)
    @DisplayName("Update Account")
    void UpdateAccount() {

        final AccountDto request = AccountDto.builder()
                .id(1L)
                .username("richard1")
                .email("richard1@gma.com")
                .password("11111111")
                .role(RoleType.Admin)
                .build();

        final AccountDto expected = AccountDto.builder()
                .id(1L)
                .username("richard1")
                .email("richard1@gma.com")
                .password("ee79976c9380d5e337fc1c095ece8c8f22f91f306ceeb161fa51fecede2c4ba1")
                .profileId(1L)
                .role(RoleType.Admin)
                .build();

        final AccountDto actual = given()
                .port(super.port)
                .header("Authorization", jwtToken)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .put("AnimeX/Account/upDate")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .extract()
                .as(new TypeRef<>() {
                });


        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);


    }

    @Test
    @Order(6)
    @DisplayName("Remove Account")
    void RemoveAccount() {

        final Long requestIndex = 2L;

        final Message expect = Message.builder()
                .message("Id: " + requestIndex + " cancellato con successo !!!")
                .status(HttpStatus.OK)
                .timeStamp(Instant.now())
                .build();

        final Message actual = given()
                .port(super.port)
                .header("Authorization", jwtToken)
                .pathParam("id", requestIndex)
                .when()
                .delete("AnimeX/Account/delete/{id}")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .extract()
                .as(new TypeRef<>() {
                });

        assertThat(actual).usingRecursiveComparison()
                .ignoringFields("timeStamp")
                .isEqualTo(expect);

    }


}

