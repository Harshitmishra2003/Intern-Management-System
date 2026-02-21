package Intern.Management.Intern.management.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Intern.Management.Intern.management.entities.Batch;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {
}
