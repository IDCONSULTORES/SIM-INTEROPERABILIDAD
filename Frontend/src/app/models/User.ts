interface User {
  username: string;
  name: string;
  phone: string;
  document: string;
  start_date: string;
  position: string;
  profile: string;
  sub_unit: string;
  community: string[];
  id: string;
}

export interface Permission {
  code: string;
  id: string;
  name: string;
}

export interface Profile {
  id: string;
  name: string;
  range: number;
  created: string;
  user: User;
  permissions: Permission[];
}
