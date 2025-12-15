import org.springframework.data.jpa.repository.JpaRepository;

public interface TypingUserRepository extends JpaRepository<TypingDataUser, String> {
    TypingDataUser findByUsername(String username);
}