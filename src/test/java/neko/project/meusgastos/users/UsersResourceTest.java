package neko.project.meusgastos.users;

import com.fasterxml.jackson.databind.JsonNode;
import neko.project.meusgastos.BaseIntegrationTest;
import neko.project.meusgastos.user.UserRepository;
import neko.project.meusgastos.user.Users;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class UsersResourceTest extends BaseIntegrationTest {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {

        userRepository.saveAll(
                IntStream.range(0, 10)
                        .mapToObj(i -> {
                            final Users users = new Users();
                            users.setEmail("teste@admin.com");
                            users.setPassword("admin");
                            users.setCreatedAt(LocalDateTime.now());                            
                            users.setUpdatedAt(LocalDateTime.now());
                            return users;
                        })
                        .collect(Collectors.toList())
        );
    }
    
    @Test
    void findAll() throws Exception {
        this.mvc.perform(
                        MockMvcRequestBuilders
                                .get("/api/user")
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
                
    }

    @Test
    void findOne() throws Exception {

        final Users item = createUser();
        final Users persistedCustomer = userRepository.save(item);

        this.mvc.perform(
                        MockMvcRequestBuilders
                                .get("/api/user/{id}", item.getId())
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(result -> {
                    final Users response = objectMapper.readValue(result.getResponse().getContentAsByteArray(), Users.class);
                    Assertions.assertEquals(persistedCustomer.getId(), response.getId());
                });

    }


    private Users createUser() {
        Users user = new Users();
        user.setEmail("teste@admin.com");
        user.setPassword("admin");
        user.setCreatedAt(LocalDateTime.now());                            
        user.setUpdatedAt(LocalDateTime.now());        
        return user;
    }

    @Test
    void save() throws Exception {

        final Users item = createUser();
        final String reqBody = objectMapper.writeValueAsString(item);

        this.mvc.perform(
                        MockMvcRequestBuilders
                                .post("/api/user")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(reqBody)
                )
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(result -> {
                    final Users response = objectMapper.readValue(result.getResponse().getContentAsByteArray(), Users.class);
                    Assertions.assertTrue(userRepository.existsById(response.getId()));
                    Assertions.assertEquals(item.getEmail(), response.getEmail());
                });

    }

    @Test
    void update() throws Exception {
        Users item = findOneUser();

        final String originalEmail = item.getEmail();
        final LocalDateTime originalUpdateDate = item.getUpdatedAt();
        item.setEmail("new@email");

        final String reqBody = objectMapper.writeValueAsString(item);

        this.mvc.perform(
                        MockMvcRequestBuilders
                                .put("/api/user/{id}", item.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(reqBody)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(result -> {
                    final Users response = objectMapper.readValue(result.getResponse().getContentAsByteArray(), Users.class);

                    Assertions.assertTrue(userRepository.existsById(response.getId()));
                    Assertions.assertEquals("new@email", response.getEmail());

                    final Users persistedItem = userRepository.getById(item.getId());
                    Assertions.assertNotEquals(persistedItem.getEmail(), originalEmail);
                    Assertions.assertNotEquals(persistedItem.getUpdatedAt(), originalUpdateDate);
                });

    }

    private Users findOneUser() {
        return userRepository.findAll(PageRequest.of(0, 1))
                .getContent()
                .get(0);
    }

    
    @Test
    void remove() throws Exception {

        final Users item = findOneUser();
        this.mvc.perform(
                        MockMvcRequestBuilders
                                .delete("/api/user/{id}", item.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(result -> {
                    Assertions.assertFalse(userRepository.existsById(item.getId()));
                });

    }

}