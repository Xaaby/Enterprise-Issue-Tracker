export enum IssueStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export enum Priority {
  P0 = 'P0',
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3'
}

export enum Category {
  BUG = 'BUG',
  FEATURE = 'FEATURE',
  TASK = 'TASK',
  INCIDENT = 'INCIDENT'
}

export interface Issue {
  id?: number;
  key?: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: Priority;
  category: Category;
  assignedTo: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Comment {
  id?: number;
  issueId?: number;
  content: string;
  createdBy?: string;
  createdAt?: string;
}

export interface Activity {
  id?: number;
  issueId?: number;
  activityType: string;
  oldValue?: string;
  newValue?: string;
  performedBy?: string;
  createdAt?: string;
}
