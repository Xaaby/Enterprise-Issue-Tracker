export enum IssueStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export interface Issue {
  id?: number;
  title: string;
  description: string;
  status: IssueStatus;
  assignedTo: string;
  createdAt?: string;
  updatedAt?: string;
}
