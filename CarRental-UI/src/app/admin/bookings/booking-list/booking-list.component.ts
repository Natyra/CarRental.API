import { Component, OnInit, TemplateRef } from '@angular/core';
import { BookingService } from 'src/app/_services/booking.service';
import { Booking } from 'src/app/_models/Booking';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
bookings: Booking[];
modalRef: BsModalRef;
currentPage = 1;
itemsPerPage = 10;
totalItems;
totalPages;

  constructor(private bookingService: BookingService, private alertify: AlertifyService, private modalService: BsModalService) { }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
return this.bookingService.getBookings(this.currentPage, this.itemsPerPage).subscribe((bookings: PaginatedResult<Booking[]>) => {
this.bookings = bookings.result;
this.currentPage = bookings.pagination.currentPage;
this.itemsPerPage = bookings.pagination.itemsPerPage;
this.totalItems = bookings.pagination.totalItems;
this.totalPages = bookings.pagination.totalPages;
}, error => {
  console.log(error);
});
  }

  deleteBooking(id: number) {
    return this.bookingService.deleteBooking(id).subscribe((result: any) => {
      this.alertify.success(result.message);
      this.loadBookings();
    }, error => {
      this.alertify.error(error);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirm(id: number): void {
   this.deleteBooking(id);
   this.modalRef.hide();
  }
  decline(): void {
    this.modalRef.hide();
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    this.loadBookings();
  }

}
