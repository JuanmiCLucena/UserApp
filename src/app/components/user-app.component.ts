import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  imports: [UserComponent, UserFormComponent, RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {

  users: User[] = [];

  userSelected: User;

  constructor(private service: UserService, private sharingData: SharingDataService) {
    this.userSelected = new User();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
  }

  addUser() {

    this.sharingData.newUserEventEmitter.subscribe( user => {
      if (user.id > 0) {
        // Si existe lo actualizamos
        this.users = this.users.map(u => {
          // Si encontramos el usuario
          if (u.id === user.id) {
            // Devolvemos el usuario con los datos actualizados
            return { ...user };
          }
          // Si no lo encuentra devolvemos el usuario sin modificar
          return u;
        })
      } else {
        // Si no existe lo añadimos
        this.users = [... this.users, { ...user, id: new Date().getTime() }];
      }
  
      Swal.fire({
        title: "Good job!",
        text: "User saved successfuly",
        icon: "success"
      });
  
      // Limpiamos el userSelected
      this.userSelected = new User();
    })
  }

  removeUser() {

    this.sharingData.idUserEventEmitter.subscribe( id => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.users = this.users.filter(user => user.id != id);
          Swal.fire({
            title: "Deleted!",
            text: "Your user has been deleted.",
            icon: "success"
          });
        }
      });
    })
  }

  selectedUser(): void {
    this.sharingData.selectedUserEventEmitter.subscribe( userRow => this.userSelected = { ...userRow });
  }

  
}
