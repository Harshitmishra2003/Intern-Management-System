package Intern.Management.Intern.management.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Intern.Management.Intern.management.entities.Batch;
import Intern.Management.Intern.management.services.BatchService;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "http://localhost:4200")
public class BatchController {

    private final BatchService batchService;

    public BatchController(BatchService batchService) {
        this.batchService = batchService;
    }

    @PostMapping
    public Batch create(@RequestBody Batch batch) {
        return batchService.create(batch);
    }

    @GetMapping
    public List<Batch> getAll() {
        return batchService.getAll();
    }

    @GetMapping("/{id}")
    public Batch getById(@PathVariable Long id) {
        return batchService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        batchService.delete(id);
    }
}
