import { GoalDto } from "./goal-dto.model";
import { Goal, RecurringType } from "./goal.model";

const isDone = (task) => task.done === 0;

export function mapGoalDtoToGoals(goalDto: GoalDto): Goal {
    return {
        id: goalDto.id,
        title: goalDto.title,
        done: goalDto.tasks.some(task => task.done === false) ? false : true,
        tasks: goalDto.tasks.map(t => ({
            id: t.id,
            description: t.description,
            effort: t.effort,
            done: t.done,
            recurringType: t.recurringType === 'week' ? RecurringType.weekly : RecurringType.monthly,
            duedate: t.duedate
        }))
    }
}