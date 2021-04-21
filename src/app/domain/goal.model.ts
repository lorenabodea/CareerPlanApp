export interface   Goal {
    id: number,
    title: string,
    tasks: Task[],
    done: boolean
}

export interface Task {
    id: number,
    goalId: number,
    description: string,
    effort: number,
    recurringType: RECURRING_TYPE,
    duedate: string,
    done: boolean,
}

export enum RECURRING_TYPE {
    WEEKLY="weekly", MONTHLY="monthly"
}