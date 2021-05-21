export enum RecurringType {
    weekly = "weekly", monthly = "monthly"
};

export interface Goal {
    id: number,
    title: string,
    tasks: Task[],
    done: boolean,
    comments: Comment[],
    careerPlanId: number
}

export interface Task {
    id: number,
    description: string,
    done: boolean,
    effort: number,
    recurringType: RecurringType,
    duedate: string
}

export interface Comment {
    id: number,
    goalId,
    commentText: string,
    currentDate: string,
    resolved: boolean,
    commenterId: number,
    replyComments: ReplyComment[]
}

export interface ReplyComment {
    id: number,
    commentText: string,
    currentDate: string,
    commenterId: number,
    commentId: number
}

