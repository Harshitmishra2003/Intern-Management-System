package Intern.Management.Intern.management.services;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import Intern.Management.Intern.management.Dto.InternRequestDTO;
import Intern.Management.Intern.management.Dto.InternResponseDTO;
import Intern.Management.Intern.management.entities.Batch;
import Intern.Management.Intern.management.entities.IdCardType;
import Intern.Management.Intern.management.entities.Intern;
import Intern.Management.Intern.management.repositories.BatchRepository;
import Intern.Management.Intern.management.repositories.InternRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class InternServiceImpl implements InternService {

    private final InternRepository internRepository;
    private final BatchRepository batchRepository;

    public InternServiceImpl(InternRepository internRepository,
                             BatchRepository batchRepository) {
        this.internRepository = internRepository;
        this.batchRepository = batchRepository;
    }

    // ================= ID GENERATION =================

    private String generateInternId(LocalDate date, IdCardType type) {

        Long countObj = internRepository.countByDateAndType(date, type);
        long next = (countObj != null ? countObj : 0) + 1;

        String prefix = type == IdCardType.PREMIUM ? "EMP" : "TDA";
        String formattedDate =
                date.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        String sequence = String.format("%03d", next);

        return prefix + formattedDate + "-" + sequence;
    }
    // ================= CREATE =================

    @Override
    public InternResponseDTO create(InternRequestDTO dto) {

        if (internRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("User already exists with this email");
        }

        Batch batch = batchRepository.findById(dto.getBatchId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        Intern intern = new Intern();

        intern.setName(dto.getName());
        intern.setEmail(dto.getEmail());
        intern.setMobileNumber(dto.getMobileNumber());
        intern.setIdCardType(dto.getIdCardType());
        intern.setDateOfJoining(dto.getDateOfJoining());
        intern.setBatch(batch);

        String internId =
                generateInternId(dto.getDateOfJoining(), dto.getIdCardType());

        intern.setInternId(internId);

        return mapToDTO(internRepository.save(intern));
    }
    // ================= GET ALL =================

    @Override
    public List<InternResponseDTO> getAll() {
        return internRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ================= GET BY ID =================

    @Override
    public InternResponseDTO getById(Long id) {
        return mapToDTO(internRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Intern not found")));
    }

    // ================= GET BY BATCH =================

    @Override
    public List<InternResponseDTO> getByBatch(Long batchId) {
        return internRepository.findByBatchId(batchId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ================= UPDATE =================

    @Override
    public InternResponseDTO update(Long id, InternRequestDTO dto) {

        Intern existing = internRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Intern not found"));

        existing.setName(dto.getName());
        existing.setEmail(dto.getEmail());
        existing.setMobileNumber(dto.getMobileNumber());

        return mapToDTO(internRepository.save(existing));
    }

    // ================= DELETE =================

    @Override
    public void delete(Long id) {
        internRepository.deleteById(id);
    }

    // ================= MAPPER =================

    private InternResponseDTO mapToDTO(Intern intern) {

        return InternResponseDTO.builder()
                .id(intern.getId())
                .internId(intern.getInternId())
                .name(intern.getName())
                .email(intern.getEmail())
                .mobileNumber(intern.getMobileNumber())
                .idCardType(intern.getIdCardType())
                .dateOfJoining(intern.getDateOfJoining())
                .batchId(intern.getBatch().getId())
                .batchName(intern.getBatch().getName())   // 🔥 MUST BE HERE
                .build();
    }
}