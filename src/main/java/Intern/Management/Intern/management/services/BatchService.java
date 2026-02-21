package Intern.Management.Intern.management.services;

import java.time.LocalDate;

import java.util.List;
import org.springframework.stereotype.Service;

import Intern.Management.Intern.management.entities.Batch;
import Intern.Management.Intern.management.entities.BatchStatus;
import Intern.Management.Intern.management.exception.ResourceNotFoundException;
import Intern.Management.Intern.management.repositories.BatchRepository;

@Service
public class BatchService {

    private final BatchRepository batchRepository;

    public BatchService(BatchRepository batchRepository) {
        this.batchRepository = batchRepository;
    }

    public Batch create(Batch batch) {

        batch.setEndDate(batch.getStartDate().plusMonths(6));

        LocalDate today = LocalDate.now();

        if (batch.getStartDate().isAfter(today)) {
            batch.setStatus(BatchStatus.UPCOMING);
        } else if (batch.getEndDate().isBefore(today)) {
            batch.setStatus(BatchStatus.COMPLETED);
        } else {
            batch.setStatus(BatchStatus.ACTIVE);
        }

        return batchRepository.save(batch);
    }

    public List<Batch> getAll() {
        return batchRepository.findAll();
    }

    public Batch getById(Long id) {
        return batchRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Batch not found with id: " + id)
                );
    }

    public void delete(Long id) {
        batchRepository.deleteById(id);
    }
}
