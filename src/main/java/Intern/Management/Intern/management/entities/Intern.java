package Intern.Management.Intern.management.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "interns")
public class Intern {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String internId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String mobileNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IdCardType idCardType;

    @Column(nullable = false)
    private LocalDate dateOfJoining;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    @JsonBackReference
    private Batch batch;
    

   
}