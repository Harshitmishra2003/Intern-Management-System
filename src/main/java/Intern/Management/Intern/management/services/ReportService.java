package Intern.Management.Intern.management.services;


import java.util.List;

import org.springframework.stereotype.Service;

import Intern.Management.Intern.management.entities.Batch;
import Intern.Management.Intern.management.entities.Intern;
import Intern.Management.Intern.management.repositories.BatchRepository;
import Intern.Management.Intern.management.repositories.InternRepository;
import Intern.Management.Intern.management.exception.ResourceNotFoundException;

@Service
public class ReportService {

    private final BatchRepository batchRepository;
    private final InternRepository internRepository;

    public ReportService(BatchRepository batchRepository,
                         InternRepository internRepository) {
        this.batchRepository = batchRepository;
        this.internRepository = internRepository;
    }

    public Batch getBatch(Long id) {
        return batchRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Batch not found"));
    }

    public List<Intern> getInternsByBatch(Long batchId) {
        return internRepository.findByBatchId(batchId);
    }
}