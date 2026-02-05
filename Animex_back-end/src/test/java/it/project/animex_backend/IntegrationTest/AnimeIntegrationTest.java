package it.project.animex_backend.IntegrationTest;

import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;
import it.project.animex_backend.BaseIntegrationTest;
import it.project.animex_backend.dto.AnimeDto;
import it.project.animex_backend.dto.Message;
import it.project.animex_backend.dto.PageDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class AnimeIntegrationTest extends BaseIntegrationTest {

    @Test
    @Order(0)
    @DisplayName("All anime")
    void getAllAnime(){

        final List<AnimeDto> animeList = List.of(
                AnimeDto.builder()
                        .id(1L)
                        .name("Attack on Titan")
                        .category(null)
                        .episode(1)
                        .description(null)
                        .year(0)
                        .img(null)
                        .video(null)
                        .profileIds(List.of(1L))
                        .build(),

                AnimeDto.builder()
                        .id(2L)
                        .name("Dragon Ball Z")
                        .category(null)
                        .episode(1)
                        .description(null)
                        .year(0)
                        .img(null)
                        .video(null)
                        .profileIds(List.of(2L))
                        .build()

        );

        final Page<AnimeDto> pageAnime = new PageImpl<>(animeList,
                PageRequest.of(0, 2), animeList.size());

        final PageDto<AnimeDto> expect = new PageDto<>(pageAnime);

        final PageDto<AnimeDto> actual = given()
                .port(super.port)
                .when()
                .get("AnimeX/Anime/all")
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
    @DisplayName("Get Anime id")
    void getAnimeId(){

        final Long requestIndex = 1L;

        final AnimeDto expect =AnimeDto.builder()
                .id(1L)
                .name("Attack on Titan")
                .category(null)
                .episode(1)
                .description(null)
                .year(0)
                .img(null)
                .video(null)
                .profileIds(List.of(1L))
                .build();


        final AnimeDto actual = given()
                .port(super.port)
                .pathParam("id", requestIndex)
                .when()
                .get("AnimeX/Anime/{id}")
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
    @DisplayName("Create Anime")
    void createAnime(){

        final AnimeDto requestAnime = AnimeDto.builder()
                .name("Zetaman")
                .category(null)
                .episode(1)
                .description(null)
                .year(0)
                .img(null)
                .video(null)
                .build();


        final AnimeDto expect = AnimeDto.builder()
                .id(3L)
                .name("Zetaman")
                .category(null)
                .episode(1)
                .description(null)
                .year(0)
                .img(null)
                .video(null)
                .profileIds(new ArrayList<>())
                .build();

        final AnimeDto actual = given()
                .port(super.port)
                .header("Authorization", jwtToken)
                .contentType(ContentType.JSON)
                .body(requestAnime)
                .when()
                .post("AnimeX/Anime/create")
                .then()
                .statusCode(201)
                .contentType(ContentType.JSON)
                .extract()
                .as(new TypeRef<>() {
                });

        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expect);
    }

    @Test
    @Order(3)
    @DisplayName("Update Anime")
    void updateAnime(){

        final AnimeDto requestAnime = AnimeDto.builder()
                .id(1L)
                .name("Zetaman")
                .category(null)
                .episode(1)
                .description(null)
                .year(0)
                .img(null)
                .video(null)
                .build();

        final AnimeDto expect = AnimeDto.builder()
                .id(1L)
                .name("Zetaman")
                .category(null)
                .episode(1)
                .description(null)
                .year(0)
                .img(null)
                .video(null)
                .profileIds(new ArrayList<>())
                .build();


        final AnimeDto actual = given()
                .port(super.port)
                .header("Authorization", jwtToken)
                .contentType(ContentType.JSON)
                .body(requestAnime)
                .put("AnimeX/Anime/upDate")
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
    @Order(4)
    @DisplayName("Delete Anime")
    void deleteAnime(){

        final Long requestIndex = 2L;

        final Message expect = Message.builder()
                .message("Anime cancellato con successo!!!")
                .status(HttpStatus.OK)
                .timeStamp(Instant.now())
                .build();

        final Message actual = given()
                .port(super.port)
                .header("Authorization", jwtToken)
                .pathParam("id", requestIndex)
                .delete("AnimeX/Anime/delete/{id}")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .extract()
                .as(new TypeRef<>() {
                });

        assertThat(actual)
                .usingRecursiveComparison()
                .ignoringFields("timeStamp")
                .isEqualTo(expect);
    }
}
