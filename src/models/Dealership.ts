import { Car } from "./Car";
import {User} from "./User";
export interface Dealership {
    _id: string;
    name: string;
    location: string;
    cars: Car[]; // One-to-many relationship with Car entity
    createdBy: User['_id']
  }
  