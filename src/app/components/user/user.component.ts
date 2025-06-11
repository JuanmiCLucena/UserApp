import { Component, EventEmitter} from '@angular/core';
import { User } from '../../models/user';
import { RouterModule } from '@angular/router';

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

  selectedUser(user: User): void {
    this.selectedUserEventEmitter.emit(user);
  }

  removeUser(id: number): void {
    this.idUserEventEmitter.emit(id);
  }

}
