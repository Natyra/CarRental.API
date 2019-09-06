import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/User';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
users: User[];
modalRef: BsModalRef;
currentPage = 1;
itemsPerPage = 10;
totalItems;
totalPages;

  constructor(private userService: UserService, private modalService: BsModalService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadFilteredUsers();
  }


  loadFilteredUsers() {
    this.userService.getFilteredUsers(this.currentPage, this.itemsPerPage).subscribe((users: PaginatedResult<User[]>) => {
      this.users = users.result;
      console.log(users);
      this.currentPage = users.pagination.currentPage;
      this.itemsPerPage = users.pagination.itemsPerPage;
      this.totalItems = users.pagination.totalItems;
      this.totalPages = users.pagination.totalPages;
    }, error => {
     console.log(error);
    });
  }

  deleteUser(id: string) {
    return this.userService.deleteUser(id).subscribe((result: any) => {
      this.alertify.success(result.message);
      this.loadFilteredUsers();
    }, error => {
      this.alertify.error(error.error);
    });
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirm(id: string): void {
   this.deleteUser(id);
   this.modalRef.hide();
  }
  decline(): void {
    this.modalRef.hide();
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    this.loadFilteredUsers();
  }
}
