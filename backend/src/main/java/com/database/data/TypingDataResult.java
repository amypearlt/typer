import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "result")
public class TypingDataResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultid;
    private Long accountid; 
    private Long quoteid;
    private int rawwpm;
    private double accuracy;
    private int wpm;
    private LocalDateTime datetime;

    // getters & setters
    // constructor(s)
}