import java.util.Scanner;

public class TypingSpeedTest {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in); 
        String quote = "The quick brown fox jumps over the lazy dog.";
        System.out.println(quote);

        long start_time = System.currentTimeMillis();
        String typed_quote = scanner.nextLine(); 
        long end_time = System.currentTimeMillis();
        scanner.close();

        double time_typed = (end_time - start_time) / 60000.0;
        String[] typed_words = typed_quote.split("\\s+");
        int raw_wpm = (int)Math.round(typed_words.length / time_typed);

        String[] words = quote.split("\\s+");
        int correct_words = 0;
        for (int i = 0; i < typed_words.length; i++) {
            if (i < words.length && typed_words[i].equals(words[i])) {
                correct_words++;
            }
        }
        int wpm = (int)Math.round(correct_words / time_typed);

        double accuracy = Math.round((((double)correct_words / typed_words.length) * 100) * 10.0) / 10.0; // Rounded to 1 decimal place. 

        System.out.println(raw_wpm);
        System.out.println(wpm);
        System.out.println(accuracy);
    }
}