import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from '../../services/ui.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  description!: string;
  date!: string;
  status: boolean = false;
  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService, private taskService: TaskService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  onSubmit() {
    debugger;
    if (!this.description) {
      alert('Please add a task!');
      return;
    }

    const newTask = {
      description: this.description,
      date: this.date,
      status: this.status,
    };

    this.onAddTask.emit(newTask);

    this.description = '';
    this.date = '';
    this.status = false;
    
    this.taskService.getTasks();
  }
}
