package Intern.Management.Intern.management.services;
import java.util.List;

import Intern.Management.Intern.management.Dto.InternRequestDTO;
import Intern.Management.Intern.management.Dto.InternResponseDTO;

public interface InternService {

    InternResponseDTO create(InternRequestDTO dto);

    List<InternResponseDTO> getAll();

    InternResponseDTO getById(Long id);

    List<InternResponseDTO> getByBatch(Long batchId);

    InternResponseDTO update(Long id, InternRequestDTO dto);

    void delete(Long id);
}