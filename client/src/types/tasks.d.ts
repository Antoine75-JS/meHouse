interface ITasksList {
  tasksList: Itask[];
}

interface Itask {
  _id: string;
  taskName: string;
  creationDate: Date | undefined;
  expireDate?: Date;
  repeat: boolean;
  repeatFrequency: number;
}
