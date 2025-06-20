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

  

  constructor(private router: Router, private service: UserService, private sharingData: SharingDataService) {}

  ngOnInit(): void {
     this.service.findAll().subscribe(users => this.users = users);
  }

  selectedUser(user: User): void {
    //this.sharingData.selectedUserEventEmitter.emit(user);
    this.router.navigate(['/users/edit', user.id]);
  }

  removeUser(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

}
