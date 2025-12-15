import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.database.data.TypingDataUser;
import com.database.data.TypingDataResult;
import com.database.repository.TypingUserRepository;
import com.database.repository.TypingResultRepository;

@RestController
@RequestMapping("/api/typing")
public class TypingDataController {

    @Autowired
    private TypingUserRepository typingUserRepository;
    @Autowired
    private TypingResultRepository typingResultRepository;

    @PostMapping("/user")
    public TypingDataUser saveUser(@RequestBody TypingDataUser user) {
        return typingUserRepository.save(user);
    }

    @PostMapping("/dataresult")
    public TypingDataResult saveResult(@RequestBody TypingDataResult result) {
        result.setCreatedAt(LocalDateTime.now());
        return typingResultRepository.save(result);
    }
}