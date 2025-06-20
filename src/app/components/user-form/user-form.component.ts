import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit{

  user: User;

  constructor(private sharingData: SharingDataService, private route: ActivatedRoute, private service: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {

    // Evento que espera el retorno del usuario que buscamos por id con el evento 'findUserByIdEventEmitter'
    this.sharingData.selectUserEventEmitter.subscribe( user => this.user = user);


    // Obtenemos los parametros asociados a la ruta específica.
    this.route.paramMap.subscribe( params => {
      // Buscamos el parámetro que se llame id.
      // Viene como tipo string y lo queremos como number, lo casteamos añadiendo +
      // Como puede ser null le decimos que si lo es (null) que devuelva un 0 como string (también se convierte a number)
      const id: number = +(params.get('id') || '0');

      if(id > 0) {
        this.sharingData.findUserByIdEventEmitter.emit(id);
        // Lo traemos desde el backend
        // this.service.findById(id).subscribe(user => this.user = user);
      }
    } )
  }

  onSubmit(userForm: NgForm): void {
    if(userForm.valid) {
      this.sharingData.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

  onClear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

}
