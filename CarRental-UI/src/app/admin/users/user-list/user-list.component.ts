import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/User';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
users: User[];
modalRef: BsModalRef;

  constructor(private userService: UserService, private modalService: BsModalService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadUsers();
  }


  loadUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
     console.log(error);
    });
  }

  deleteUser(id: string) {
    return this.userService.deleteUser(id).subscribe((result:any) => {
      this.alertify.success(result.message);
      this.loadUsers();
    }, error => {
      this.alertify.error(error);
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
}
