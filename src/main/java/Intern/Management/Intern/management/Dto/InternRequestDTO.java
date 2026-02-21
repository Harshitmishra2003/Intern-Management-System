package Intern.Management.Intern.management.Dto;



import java.time.LocalDate;

import Intern.Management.Intern.management.entities.IdCardType;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class InternRequestDTO {

    @NotBlank
    private String name;

    @Email
    private String email;

    @NotBlank
    private String mobileNumber;

    @NotNull
    private IdCardType idCardType;

    @NotNull
    private LocalDate dateOfJoining;

    @NotNull
    private Long batchId;
}
