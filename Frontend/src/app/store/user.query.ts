import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { UserState, UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
	public constructor(protected override store: UserStore) {
		super(store);
	}

	// Observable: Cuando cambia en diferentes partes de la UI
	public selectUserId: Observable<string> = this.select((x) => x.id);
	public selectInformation: Observable<UserState> = this.select();

	// Values: Cuando no cambia en la UI
	public getInformation() {
		return this.getValue();
	}
}
