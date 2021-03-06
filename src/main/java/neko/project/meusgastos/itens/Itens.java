package neko.project.meusgastos.itens;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenerationTime;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Itens {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private Double value;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDateTime item_date;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    private int user_id;

    public Itens() {
    }

    public Itens(String name, String description, Double value, int user_id, LocalDateTime item_date) {
        this.name = name;
        this.description = description;
        this.value = value;
        this.user_id = user_id;
        this.item_date = item_date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public LocalDateTime getItem_date() {
        return item_date;
    }

    public void setItem_date(LocalDateTime item_date) {
        this.item_date = item_date;
    }    
}
