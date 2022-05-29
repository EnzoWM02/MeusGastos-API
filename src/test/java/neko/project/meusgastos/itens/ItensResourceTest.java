package neko.project.meusgastos.itens;

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

public class ItensResourceTest extends BaseIntegrationTest {

    @Autowired
    private ItensRepository itensRepository;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {

        final List<Users> usersList = userRepository.saveAllAndFlush(
                IntStream.range(0, 2)
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

        itensRepository.saveAll(
                IntStream.range(0, 10)
                        .mapToObj(i -> {
                            final Itens itens = new Itens();
                            itens.setName("Hello " + i);
                            itens.setDescription("world" + i + "@test.ccom");
                            itens.setValue(100.0);
                            itens.setUser_id(Integer.parseInt(""+usersList.get(1).getId()));
                            itens.setItem_date(LocalDateTime.now());
                            itens.setCreatedAt(LocalDateTime.now());
                            itens.setUpdatedAt(LocalDateTime.now());

                            return itens;
                        })
                        .collect(Collectors.toList())
        );
    }
    
    @Test
    void findAll() throws Exception {
        this.mvc.perform(
                        MockMvcRequestBuilders
                                .get("/api/itens")
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
                
    }

}