export interface GoalDto {
    id: number,
    title: string,
    tasks: TaskDto[],
    done: boolean,
    comments: CommentDto[]
    careerPlanId: number,
}

export interface TaskDto {
    id: number,
    goalId: number,
    description: string,
    effort: number,
    done: boolean
    recurringType: string,
    duedate: string,
}

export interface CommentDto {
    id: number,
    goalId,
    commentText: string,
    currentDate: string,
    resolved: boolean,
    commenterId: number,
    replyComments: ReplyCommentDto[]
}

export interface ReplyCommentDto {
    id: number,
    commentText: string,
    currentDate: string,
    commenterId: number,
    commentId: number
}
