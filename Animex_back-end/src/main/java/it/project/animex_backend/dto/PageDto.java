package it.project.animex_backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageDto<DTO> {

    private List<DTO> content;

    @NotNull
    private int pageNumber;

    @NotNull
    private int pageSize;

    @NotNull
    private boolean firstPage;

    @NotNull
    private boolean lastPage;

    @NotNull
    private int totPages;

    @NotNull
    private boolean hasNext;

    public PageDto(Page<DTO> page) {
        this.content = page.getContent();
        this.pageNumber = page.getNumber();
        this.pageSize = page.getSize();
        this.lastPage = page.isLast();
        this.firstPage = page.isFirst();
        this.totPages = page.getTotalPages();
        this.hasNext = page.hasNext();
    }
}
