export enum RecurringType {
    weekly="weekly", monthly="monthly"
};

export interface Goal {
    id: number,
    title: string,
    tasks: Task[], 
    done: boolean
}

export interface Task {
    id: number,
    description: string,
    done: boolean,
    effort: number,
    recurringType: RecurringType,
    duedate: string
}

