import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  startDate = new Date(2020, 0, 1);

  inputEvent(event){
    console.log(event.value);
}
changeEvent(event){
    console.log(event.value);
}

  constructor() { }

  ngOnInit(): void {
  }

}
