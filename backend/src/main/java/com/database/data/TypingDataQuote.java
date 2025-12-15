import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "quote")
public class TypingDataQuote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quoteid;
    private String quote;
    private int quote_words;
    private int quote_chars;

    // getters & setters
    // constructor(s)
}