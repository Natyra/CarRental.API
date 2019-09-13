import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css']
})
export class BookingSummaryComponent implements OnInit {
  changeFilterField: boolean = false;
  pickUpLocation;
  returnLocation;
  datePickUp;
  dateReturn;

  constructor() { }

  ngOnInit() {
  }

  changeFilter() {
    this.changeFilterField = true;
  }

}
