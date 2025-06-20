import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
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

  constructor(private service: UserService, private sharingData: SharingDataService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  findUserById() {
    // Estamos pendientes (escuchando por el evento) para buscar un usuario por un id dado (recibido por la ruta)
    this.sharingData.findUserByIdEventEmitter.subscribe( id => {
      // Buscamos el usuario con el array method find comparando el id recibido con el id de los usuarios existentes
      const user = this.users.find( user => user.id === id)
      // Devolvemos el usuario encontrado por id
      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }

  addUser() {

    this.sharingData.newUserEventEmitter.subscribe( user => {
      if (user.id > 0) {

        this.service.update(user).subscribe(userUpdated => {
          // Si existe lo actualizamos
          this.users = this.users.map(u => {
            // Si encontramos el usuario
            if (u.id === userUpdated.id) {
              // Devolvemos el usuario con los datos actualizados
              return { ...userUpdated };
            }
            // Si no lo encuentra devolvemos el usuario sin modificar
            return u;
          })
        })

      } else {
        // Si no existe lo añadimos
        this.service.create(user).subscribe(userNew => {
          this.users = [... this.users, { ...userNew }];
        })
      }
      
      this.router.navigate(['/users']);
      
      Swal.fire({
        title: "Good job!",
        text: "User saved successfuly",
        icon: "success"
      });
  
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

          // Necesitamos navegar a una página distinta a la que estamos y luego volver
          // y así refrescamos el estado
          this.router.navigate(['/users/create'], {skipLocationChange: true}).then( () => {
            this.router.navigate(['/users'], { state: {users: this.users} });
          } )

          Swal.fire({
            title: "Deleted!",
            text: "Your user has been deleted.",
            icon: "success"
          });
        }
      });
    })
  }
  
}
