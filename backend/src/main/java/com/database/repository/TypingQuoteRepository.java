import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TypingQuoteRepository extends JpaRepository<TypingDataQuote, Long> {
    List<TypingDataQuote> findByQuoteId(Long quoteid);
}