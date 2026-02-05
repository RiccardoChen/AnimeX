package it.project.animex_backend.specifications;

import it.project.animex_backend.entity.Account;
import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

@Data
public class AccountSpecifications {

    private String username;
    private String email;

    int size = 9;
    int page = 0;


    public Specification<Account> toSpecification() {

        Specification<Account> spec = Specification.where(null);

        if (username != null) {
            spec = spec.or((root, query, criteriaBuilder)
                    -> criteriaBuilder.like(root.get("username"), "%" + username + "%"));
        }
        if (email != null) {
            spec = spec.or(((root, query, criteriaBuilder)
                    -> criteriaBuilder.like(root.get("email"), "%" + email + "%")));
        }
        return spec;

    }

    public Pageable toPageSpecification() {
        return PageRequest.of(page, size);
    }

    }
