package com.yingchunli.todolist;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.UUID;

@RestResource
public interface TodoRepository extends CrudRepository<Todo, UUID> {
}
