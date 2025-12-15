import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class TypingDataUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountid;
    private String username;
    private String firstname;
    private String lastname;
    private String password;
    private String email;

    // getters & setters
    // constructor(s)
}