package it.project.animex_backend.specifications;

import it.project.animex_backend.entity.Anime;
import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

@Data
public class AnimeSpecifications {

    private String name;

    private String category;

    private int year;

    private int size = 20;

    private int page = 0;



    public Specification<Anime> toSpecification() {

        Specification<Anime> spec = Specification.where(null);

        if (name != null) {
            spec = spec.and((root, query, criteriaBuilder)
                    -> criteriaBuilder.like(root.get("name"), "%" + name + "%"));
        }
        if (category != null) {
            spec = spec.and(((root, query, criteriaBuilder)
                    -> criteriaBuilder.like(root.get("category"), "%" + category + "%")));
        }
        if  (year != 0) {
            spec = spec.and((root, query, criteriaBuilder)
                    -> criteriaBuilder.equal(root.get("year"), year));
        }
        return spec;
    }

    public Pageable toPageSpecification() {
        return PageRequest.of(page, size);
    }

}
