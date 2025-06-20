import { Component, EventEmitter, OnInit} from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{

  title: string = 'Listado de usuarios!';

  users: User[] = [];

  

  constructor(private router: Router, private service: UserService, private sharingData: SharingDataService) {
    // Comprobamos si en la actual navegación existe el state
    // y si tenemos los users en el state los asignamos al estado del componente
    if(this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    }
  }

  ngOnInit(): void {
    // Si el state no contiene usuarios entonces los buscamos en el backend
    if(this.users == undefined || this.users == null ||  this.users.length == 0) {
      this.service.findAll().subscribe(users => this.users = users);
    }
  }

  selectedUser(user: User): void {
    //this.sharingData.selectedUserEventEmitter.emit(user);
    this.router.navigate(['/users/edit', user.id]);
  }

  removeUser(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

}
