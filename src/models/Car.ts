import {User} from './User';

export interface Car {
  _id: string;
  make: string;
  model: string;
  productionYear: number;
  createdBy: User['_id']
}

  