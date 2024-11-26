import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Permission {
  code: string;
  id: string;
  name: string;
}

export interface UserState {
  id: string;
  created: string;
  profileName: string;
  name: string;
  phone: string;
  position: string;
  sub_unit: string;
  username: string;
  document: string;
  community: string[];
  permissions: any;
}

export function createInitialState(): UserState {
  return {
    id: '',
    created: '',
    profileName: '',
    name: '',
    phone: '',
    position: '',
    sub_unit: '',
    username: '',
    document: '',
    community: [],
    permissions: {}
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
  public constructor() {
    super({});
  }
}
