package at.codefabrik.auto.management.repo;

import at.codefabrik.auto.management.model.Autos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AutosRepo extends JpaRepository<Autos, String> {
    Optional<Autos> findById(Autos autos);
}
