import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.sass'],
})
export class ToDoItemComponent implements OnInit, OnChanges {
  @Input() toDo: any;

  form = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.generateFormFields();
  }

  generateFormFields() {
    this.toDo.items.forEach((item: any) => {
      this.form.addControl(item.id, this.formBuilder.control(item.checked));
    });
  }
}
