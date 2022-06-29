package neko.project.meusgastos;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
/*(properties = {
    "spring.datasource.url=jdbc:postgresql://kesavan.db.elephantsql.com:5432/xaxxmasf",
    "spring.datasource.username=xaxxmasf",
    "spring.datasource.password=anOzSpMw6fUENnibG0vQ7MDlxsw17INw"
})*/
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public abstract class BaseIntegrationTest{

    @Autowired
    protected MockMvc mvc;

    @Autowired
    protected ObjectMapper objectMapper;

}
