package it.project.animex_backend.IntegrationTest;

import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;
import it.project.animex_backend.BaseIntegrationTest;
import it.project.animex_backend.dto.AccProfileDto;
import it.project.animex_backend.dto.AccountDto;
import it.project.animex_backend.dto.ProfileDto;
import it.project.animex_backend.entity.RoleType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import java.util.List;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class ProfileIntegrationTest extends BaseIntegrationTest {

    @Test
    @Order(0)
    @DisplayName("Get profile Id")
    void getProfileId() {

        final Long requestIndex = 1L;


        final ProfileDto expect = ProfileDto.builder()
                .id(1L)
                .name("richard1")
                .sex("undefined")
                .birthday(null)
                .accountId(1L)
                .animeIds(List.of(1L))
                .build();


        final ProfileDto actual = given()
                .port(super.port)
                .header("Authorization", jwtToken)
                .pathParam("id", requestIndex)
                .when()
                .get("AnimeX/Profile/{id}")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .extract()
                .as(new TypeRef<>() {
                });


        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expect);

    }

    @Test
    @Order(1)
    @DisplayName("Update Profile")
    void updateProfile() {

        final ProfileDto requestProfile = ProfileDto.builder()
                .id(1L)
                .name("richard11")
                .sex("undefined")
                .birthday(null)
                .accountId(1L)
                .animeIds(List.of(1L))
                .build();

        final ProfileDto expect = ProfileDto.builder()
                .id(1L)
                .name("richard11")
                .sex("undefined")
                .birthday(null)
                .accountId(1L)
                .animeIds(List.of(1L))
                .build();

        final ProfileDto actual = given()
                .port(super.port)
                .header("Authorization", jwtToken)
                .contentType(ContentType.JSON)
                .body(requestProfile)
                .when()
                .put("AnimeX/Profile/upDate")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .extract()
                .as(new TypeRef<>() {
                });


        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expect);


    }

    @Test
    @Order(2)
    @DisplayName("Take Acc&Profile data")
    void getProfileAccData() {

        final AccProfileDto expect = AccProfileDto.builder()
                .account(AccountDto.builder()
                        .id(1L)
                        .username("richard1")
                        .email("richard1@gmail.com")
                        .password("ee79976c9380d5e337fc1c095ece8c8f22f91f306ceeb161fa51fecede2c4ba1")
                        .profileId(1L)
                        .role(RoleType.Admin)
                        .build())
                .profile(ProfileDto.builder()
                        .id(1L)
                        .name("richard1")
                        .sex("undefined")
                        .birthday(null)
                        .accountId(1L)
                        .animeIds(List.of(1L))
                        .build())
                .build();

        final AccProfileDto actual = given()
                .port(super.port)
                .header("Authorization", jwtToken)
                .when()
                .get("AnimeX/Profile/takeData")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .extract()
                .as(new TypeRef<>() {
                });

        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expect);
    }
}
