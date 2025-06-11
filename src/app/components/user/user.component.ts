import { Component, EventEmitter} from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {
    this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
  }

  selectedUser(user: User): void {
    this.selectedUserEventEmitter.emit(user);
  }

  removeUser(id: number): void {
    this.idUserEventEmitter.emit(id);
  }

}
