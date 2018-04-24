package com.yingchunli.todolist;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TodoRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TodoRepository todoRepository;

    @Test
    public void whenQuery_thenReturnTodo() {
        // given
        Todo todoMilk = new Todo(
                "milk",
                "remember the milk",
                Date.from(LocalDate.now()
                        .with(TemporalAdjusters.next(DayOfWeek.SATURDAY))
                        .atStartOfDay(ZoneId.systemDefault())
                        .toInstant()),
                Todo.Status.Pending
                );
        entityManager.persistAndFlush(todoMilk);
        Todo todoDrink = new Todo(
                "drink",
                "have a drink",
                Date.from(LocalDateTime.now()
                        .plusHours(1)
                        .atZone(ZoneId.systemDefault())
                        .toInstant()),
                Todo.Status.Done
        );
        entityManager.persistAndFlush(todoDrink);

        // when
        Iterable<Todo> todos = todoRepository.findAll();

        // then
        assertThat(todos)
                .hasSize(2)
                .contains(todoMilk)
                .contains(todoDrink);
    }

}
