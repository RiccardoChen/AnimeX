package it.project.animex_backend.mapper;

import java.util.List;

public interface BaseMethodMapper<Entity, DTO> {

    Entity toEntity(DTO dto);

    DTO toDTO(Entity entity);

    List<Entity> toListEntity(List<DTO> dto);

    List<DTO> toListDTO(List<Entity> entities);

}
