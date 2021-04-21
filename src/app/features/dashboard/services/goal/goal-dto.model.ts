export interface GoalDto {
    id: number,
    title: string,
    tasks: TaskDto[],
    done: boolean
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
