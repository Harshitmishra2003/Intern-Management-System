package Intern.Management.Intern.management.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import Intern.Management.Intern.management.Dto.InternRequestDTO;
import Intern.Management.Intern.management.Dto.InternResponseDTO;
import Intern.Management.Intern.management.services.InternService;

@RestController
@RequestMapping("/api/interns")
@CrossOrigin(origins = "http://localhost:4200")

public class InternController {

    private final InternService internService;

    public InternController(InternService internService) {
        this.internService = internService;
    }

    @PostMapping
    public InternResponseDTO create(@RequestBody InternRequestDTO dto) {
        return internService.create(dto);
    }

    @GetMapping
    public List<InternResponseDTO> getAll() {
        return internService.getAll();
    }

    @GetMapping("/{id}")
    public InternResponseDTO getById(@PathVariable Long id) {
        return internService.getById(id);
    }

    @PutMapping("/{id}")
    public InternResponseDTO update(
            @PathVariable Long id,
            @RequestBody InternRequestDTO dto) {

        return internService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        internService.delete(id);
    }
}