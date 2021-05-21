import { GoalDto } from "./goal-dto.model";
import { Goal, RecurringType } from "./goal.model";

export function mapGoalDtoToGoals(goalDto: GoalDto): Goal {
    return {
        id: goalDto.id,
        careerPlanId: 0,
        title: goalDto.title,
        done: goalDto.tasks.some(task => task.done === false) ? false : true,
        tasks: goalDto.tasks.map(t => ({
            id: t.id,
            description: t.description,
            effort: t.effort,
            done: t.done,
            recurringType: t.recurringType === 'week' ? RecurringType.weekly : RecurringType.monthly,
            duedate: t.duedate
        })),
        comments: goalDto.comments ? goalDto.comments.map(c => ({
            id: c.id,
            goalId: c.goalId,
            commentText: c.commentText,
            currentDate: c.currentDate,
            resolved: c.resolved,
            commenterId: c.commenterId,
            replyComments: c.replyComments ? c.replyComments.map(r => ({
                id: r.id,
                commentText: r.commentText,
                currentDate: r.currentDate,
                commenterId: r.commenterId,
                commentId: r.commentId
            })) : []
        })) : []
    }
}