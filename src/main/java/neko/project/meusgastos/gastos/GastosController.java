package neko.project.meusgastos.gastos;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/gastos")
public class GastosController {

    private GastosRepository gastosRepository;

    public GastosController(GastosRepository gastosRepository) {
        this.gastosRepository = gastosRepository;
    }

    @GetMapping
    public List<Gastos> getClients() {
        return gastosRepository.findAll();
    }

    @GetMapping("/{id}")
    public Gastos getGastos(@PathVariable int id) {
        return gastosRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createGastos(@RequestBody Gastos gastos) throws URISyntaxException {
        System.out.println(gastos.getName());
        System.out.println(gastos.getDescription());
        System.out.println(gastos.getValue());
        System.out.println(gastos.getUser_id());
        Gastos savedClient = gastosRepository.save(gastos);
        return ResponseEntity.created(new URI("/gastos/" + savedClient.getId())).body(savedClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateGastos(@PathVariable int id, @RequestBody Gastos gastos) {
        Gastos currentGasto = gastosRepository.findById(id).orElseThrow(RuntimeException::new);
        currentGasto.setName(gastos.getName());
        currentGasto.setDescription(gastos.getDescription());
        currentGasto.setValue(gastos.getValue());
        currentGasto = gastosRepository.save(currentGasto);

        return ResponseEntity.ok(currentGasto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteGastos(@PathVariable int id) {
        gastosRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}


