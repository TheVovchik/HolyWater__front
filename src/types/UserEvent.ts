export interface NewEvent {
  userId?: number,
  title: string,
  description: string,
  year: number,
  month: number,
  day: number,
  time: string,
}

export interface UserEvent extends NewEvent {
  id: number,
  createdAt: Date,
  updatedAt: Date,
}
