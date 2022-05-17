package neko.project.meusgastos.user;

import neko.project.meusgastos.util.encryptPassword;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import org.json.*;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Users> getUser() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public Users getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createUser(@RequestBody Users user) throws URISyntaxException {
        //Encrypt the password
        user.setPassword(this.encryptedPassword(user.getPassword()));
        Users savedUser = userRepository.save(user);
        return ResponseEntity.created(new URI("/user/" + savedUser.getId())).body(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateUser(@PathVariable Long id, @RequestBody Users user) {
        Users currentUser = userRepository.findById(id).orElseThrow(RuntimeException::new);
        currentUser.setEmail(user.getEmail());
        currentUser = userRepository.save(user);

        return ResponseEntity.ok(currentUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/password")
    public String encryptedPassword(@RequestBody String password) {
        encryptPassword crypt = new encryptPassword();
        String encryptedPassword = null;
        try {
            encryptedPassword = (crypt.encrypt(password));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return encryptedPassword;
    }

    @PostMapping("/cookies")
    public ResponseEntity setLoginCookies (@RequestBody String token) {

        System.out.println("tokenori" + token);
        JSONObject tokenAfterJSON = new JSONObject(token);
        System.out.println("tokenposjson" + tokenAfterJSON.getString("token"));
        
        var cookie = ResponseCookie.from("user-id", tokenAfterJSON.getString("token"))
        .path("/")
        .build();
        System.out.println("cookie:" + cookie.toString());
        return ResponseEntity.ok()
                .body(cookie.toString());

        // Cookie cookie = new Cookie ("user-id", tokenAfterJSON.getString("token"));
        // response.addCookie(cookie);

        // return response;

    }

    @GetMapping("/setCookies")
    public ResponseEntity<?> setCookie(HttpServletResponse response) {
        // create a cookie
        Cookie cookie = new Cookie("username", "Jovan");    
        cookie.setMaxAge(28800);
        cookie.setSecure(false); //TODO: Change this to false or true depending on dev or prod
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        response.addCookie(cookie);
        response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.addHeader("Access-Control-Allow-Credentials", "true");

        return new ResponseEntity<>("enzo", HttpStatus.OK);
    }
}
