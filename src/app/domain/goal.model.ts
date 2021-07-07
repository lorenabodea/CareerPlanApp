export interface Goal {
  id: number;
  title: string;
  tasks: Task[];
  done: boolean;
  comments: Comment[];
  careerPlanId: number;
  userId: string;
}

export interface Task {
  id: number;
  goalId: number;
  description: string;
  effort: number;
  recurringType: RECURRING_TYPE;
  duedate: string;
  done: boolean;
}

export enum RECURRING_TYPE {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  NEVER = 'never',
}

export interface Comment {
  id: number;
  goalId: number;
  commentText: string;
  currentDate: string;
  resolved: boolean;
  commenterId: number;
  replyComments: ReplyComment[];
}

export interface ReplyComment {
  id: number;
  commentText: string;
  currentDate: string;
  commenterId: number;
  commentId: number;
}
