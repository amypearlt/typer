import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TypingResultRepository extends JpaRepository<TypingDataResult, Long> {
    List<TypingDataResult> findByAccountId(Long accountid);
}