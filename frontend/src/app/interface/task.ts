import {User} from "./user";

export interface Task {
  id?: number
  title: string
  status: string
  dueDate: Date
  description: string
  createdOn: Date
  createdBy: User
}
