package Intern.Management.Intern.management.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import Intern.Management.Intern.management.entities.IdCardType;
import Intern.Management.Intern.management.entities.Intern;

@Repository
public interface InternRepository extends JpaRepository<Intern, Long> {

    @Query("SELECT COUNT(i) FROM Intern i WHERE i.dateOfJoining = :date AND i.idCardType = :type")
    Long countByDateAndType(@Param("date") LocalDate date, @Param("type") IdCardType type);

    List<Intern> findByBatchId(Long batchId);
    boolean existsByEmail(String email);
}