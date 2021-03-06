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

    @Test
    void findOne() throws Exception {

        final Itens item = createItem();
        final Itens persistedCustomer = itensRepository.save(item);

        this.mvc.perform(
                        MockMvcRequestBuilders
                                .get("/api/itens/{id}", item.getId())
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(result -> {
                    final Itens response = objectMapper.readValue(result.getResponse().getContentAsByteArray(), Itens.class);
                    Assertions.assertEquals(persistedCustomer.getId(), response.getId());
                });

    }

    private Itens createItem() {
        Itens item = new Itens();
        item.setName("Nome Teste");
        item.setDescription("Descri????o teste");        
        item.setValue(100.0);
        Users user = createUser();
        Users persistedUser = userRepository.save(user);
        item.setUser_id(Integer.parseInt(""+persistedUser.getId()));
        item.setItem_date(LocalDateTime.now());
        item.setCreatedAt(LocalDateTime.now());
        item.setUpdatedAt(LocalDateTime.now());
        return item;
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

        final Itens item = createItem();
        final String reqBody = objectMapper.writeValueAsString(item);

        this.mvc.perform(
                        MockMvcRequestBuilders
                                .post("/api/itens")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(reqBody)
                )
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(result -> {
                    final Itens response = objectMapper.readValue(result.getResponse().getContentAsByteArray(), Itens.class);
                    Assertions.assertTrue(itensRepository.existsById(response.getId()));
                    Assertions.assertEquals(item.getName(), response.getName());
                    Assertions.assertEquals(item.getDescription(), response.getDescription());
                    Assertions.assertEquals(item.getValue(), response.getValue());
                });

    }

    @Test
    void update() throws Exception {
        Itens item = findOneItem();

        final String originalName = item.getName();
        final LocalDateTime originalUpdateDate = item.getUpdatedAt();
        item.setName("Nome mudado teste");

        final String reqBody = objectMapper.writeValueAsString(item);

        this.mvc.perform(
                        MockMvcRequestBuilders
                                .put("/api/itens/{id}", item.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(reqBody)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(result -> {
                    final Itens response = objectMapper.readValue(result.getResponse().getContentAsByteArray(), Itens.class);

                    Assertions.assertTrue(itensRepository.existsById(response.getId()));
                    Assertions.assertEquals("Nome mudado teste", response.getName());

                    final Itens persistedItem = itensRepository.getById(item.getId());
                    Assertions.assertNotEquals(persistedItem.getName(), originalName);
                    Assertions.assertNotEquals(persistedItem.getUpdatedAt(), originalUpdateDate);
                });

    }

    private Itens findOneItem() {
        return itensRepository.findAll(PageRequest.of(0, 1))
                .getContent()
                .get(0);
    }

    
    @Test
    void remove() throws Exception {

        final Itens item = findOneItem();
        this.mvc.perform(
                        MockMvcRequestBuilders
                                .delete("/api/itens/{id}", item.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(result -> {
                    Assertions.assertFalse(itensRepository.existsById(item.getId()));
                });

    }

}