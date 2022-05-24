package neko.project.meusgastos.itens;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/itens")
public class ItensController {

    private ItensRepository itensRepository;

    public ItensController(ItensRepository itensRepository) {
        this.itensRepository = itensRepository;
    }

    @GetMapping
    public List<Itens> getItens() {
        return itensRepository.findAll();
    }

    @GetMapping("/{id}")
    public Itens getItens(@PathVariable int id) {
        return itensRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createItens(@RequestBody Itens itens) throws URISyntaxException {
        Itens savedClient = itensRepository.save(itens);
        return ResponseEntity.created(new URI("/itens/" + savedClient.getId())).body(savedClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateItens(@PathVariable int id, @RequestBody Itens itens) {
        Itens currentItem = itensRepository.findById(id).orElseThrow(RuntimeException::new);
        currentItem.setName(itens.getName());
        currentItem.setDescription(itens.getDescription());
        currentItem.setValue(itens.getValue());
        currentItem.setItem_date(itens.getItem_date());
        currentItem = itensRepository.save(currentItem);

        return ResponseEntity.ok(currentItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteItens(@PathVariable int id) {
        itensRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}


