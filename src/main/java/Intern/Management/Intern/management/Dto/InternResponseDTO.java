package Intern.Management.Intern.management.Dto;

import java.time.LocalDate;
import Intern.Management.Intern.management.entities.IdCardType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InternResponseDTO {

    private Long id;
    private String internId;
    private String name;
    private String email;
    private String mobileNumber;
    private IdCardType idCardType;
    private LocalDate dateOfJoining;

    private Long batchId;
    private String batchName;   // ✅ ADD THIS
}