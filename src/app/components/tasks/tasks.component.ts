import { devOnlyGuardedExpression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  description!: string;
  date!: string;
  status: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  addTask(task: Task) {
    this.taskService.addTask(task)
    .subscribe(
      (task) =>{ 
        this.tasks.push(task)
      });
  }

  getTasks(){
    this.taskService.getTasks()
    .subscribe(
      (tasks) =>{
        this.tasks = [];
       (this.tasks = tasks);
      });
  }
}
