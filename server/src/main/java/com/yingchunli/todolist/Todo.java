package com.yingchunli.todolist;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
public class Todo {
    public enum Status {
        Pending,
        Done
    }

    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String description;
    private Date dueDate;

    @Enumerated(EnumType.STRING)
    @Column(length = 7)
    private Status status;

    public Todo() {
    }

    public Todo(String name, String description, Date dueDate, Status status) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
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

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Todo)) return false;

        Todo todo = (Todo) o;

        if (name != null ? !name.equals(todo.name) : todo.name != null) return false;
        if (description != null ? !description.equals(todo.description) : todo.description != null) return false;
        if (dueDate != null ? !dueDate.equals(todo.dueDate) : todo.dueDate != null) return false;
        return status == todo.status;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (dueDate != null ? dueDate.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        return result;
    }
}
