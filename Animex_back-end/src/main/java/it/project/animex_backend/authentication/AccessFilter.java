package it.project.animex_backend.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import it.project.animex_backend.entity.RoleType;
import it.project.animex_backend.exceptions.ErrorMessage;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;

@Component
public class AccessFilter extends OncePerRequestFilter {

    private static final String DIRECTORY = "/AnimeX";

    private static final String ACCOUNT_DIR = DIRECTORY + "/Account";

    private static final String ANIME_DIR = DIRECTORY + "/Anime";

    private static final String PROFILE_DIR = DIRECTORY + "/Profile";

    private final JwtTokenProvider jwtTokenProvider;

    private ObjectMapper objectMapper;

    public AccessFilter(JwtTokenProvider jwtTokenProvider, ObjectMapper objectMapper) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.objectMapper = objectMapper;
    }

    /**
     * Is called by default each time a new request arrives.
     *
     * @param request     Request received from the user
     * @param response    Response returned to the user
     * @param filterChain Object provided by the servlet container to the developer giving a view into
     *                    the invocation chain of a filtered request for a resource. Filters use the FilterChain
     *                    to invoke the next filter in the chain,
     * @throws ServletException Possible exception
     * @throws IOException      Possible exception
     */
    @Override
    protected void doFilterInternal(final HttpServletRequest request,
                                    final HttpServletResponse response,
                                    final FilterChain filterChain) throws ServletException, IOException {


        String requestURI = request.getRequestURI();
        String method = request.getMethod();

        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        if ((requestURI.equalsIgnoreCase(ACCOUNT_DIR + "/signIn") ||
                requestURI.equalsIgnoreCase(ACCOUNT_DIR + "/logIn")
                        && method.equalsIgnoreCase("POST")) ||
                (requestURI.equalsIgnoreCase(ACCOUNT_DIR + "/role") && method.equalsIgnoreCase("GET"))
                || (requestURI.equalsIgnoreCase(ACCOUNT_DIR + "/validT") && method.equalsIgnoreCase("GET"))){
            filterChain.doFilter(request, response);
            return;
        }

        if ((requestURI.equalsIgnoreCase(ANIME_DIR + "/all") ||
                requestURI.matches(ANIME_DIR + "/\\d+$") || requestURI.equalsIgnoreCase(ANIME_DIR + "/rank") || requestURI.startsWith(ANIME_DIR + "/findName/")
                || requestURI.startsWith(ANIME_DIR + "/findNames/") || requestURI.startsWith(ANIME_DIR + "/findNamesId/")
                        && method.equalsIgnoreCase("GET"))) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = request.getHeader("Authorization");
            if (token == null ||
                    !jwtTokenProvider.isValid(token)
                    || jwtTokenProvider.isTokenExpired(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                handleException("Non sei autorizzato", response);
                return;
            }

            RoleType role = jwtTokenProvider.extractRoleClaims(token);
            if (role == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                handleException("Il ruolo non esiste", response);
                return;
            }

            switch (role) {
                case Admin -> {
                    filterChain.doFilter(request, response);
                    return;
                }
                case User -> {
                    if (filterByEndpoint(response, requestURI, method)) return;
                }
                default -> {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    handleException("Non hai nessun ruolo", response);
                    return;
                }
            }
            filterChain.doFilter(request, response);

        } catch (ExpiredJwtException e) {
            handleException("Token scaduto", response);
        } catch (JwtException | IllegalArgumentException e) {
            handleException("Token non valido o mancante", response);
        }
    }

    private boolean filterByEndpoint(final @NotNull HttpServletResponse response, final String requestURI, final String method) throws IOException {

        if (requestURI.startsWith(ACCOUNT_DIR)) {
            if ((requestURI.endsWith(ACCOUNT_DIR + "/all") && method.equalsIgnoreCase("GET") ||
                    (requestURI.matches(ACCOUNT_DIR + "/delete/\\d+$") && method.equalsIgnoreCase("DELETE")))) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                handleException("Sei un user normale non hai l'accesso per fare questa richiesta '/all'", response);
                return true;
            }
        } else if (requestURI.startsWith(ANIME_DIR)) {
            if ((requestURI.endsWith(ANIME_DIR + "/create") && method.equalsIgnoreCase("POST")) ||
                    (requestURI.endsWith(ANIME_DIR + "/upDate") && method.equalsIgnoreCase("PUT")) ||
                    (requestURI.matches(ANIME_DIR + "/delete/\\d+$") && method.equalsIgnoreCase("DELETE"))) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                handleException("Sei un user normale non hai l'accesso per fare questa richiesta al anime", response);
                return true;
            }
        }
        return false;
    }

    private void handleException(String message, HttpServletResponse response) throws IOException {
        ErrorMessage errorMessage = ErrorMessage.builder()
                .message(message)
                .timeStamp(Instant.now())
                .build();

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter()
                .write(objectMapper.writeValueAsString(errorMessage));
    }
}
