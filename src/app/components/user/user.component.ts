import { Component, EventEmitter} from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user',
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent {

  title: string = 'Listado de usuarios!';

  users: User[] = [];

  idUserEventEmitter: EventEmitter<number> = new EventEmitter();

  selectedUserEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor(private router: Router, private service: UserService) {

    if(this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else {
      this.service.findAll().subscribe(users => this.users = users);
    }

  }

  selectedUser(user: User): void {
    this.selectedUserEventEmitter.emit(user);
  }

  removeUser(id: number): void {
    this.idUserEventEmitter.emit(id);
  }

}
