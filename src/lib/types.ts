export type Task = {
   id: string;
   title: string;
   completed: boolean;
   groupId: string;
   createdAt: Date;
   deadline?: string;
}

export type Group = {
   id: string;
   name: string;
   color: string;
   createdAt?: Date;
};