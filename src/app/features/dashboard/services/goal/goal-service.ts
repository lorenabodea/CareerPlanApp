import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiService } from "src/app/core/data-service";
import { Comment, Goal, ReplyComment, Task } from "src/app/domain/goal.model";
import { GoalDto, TaskDto } from "./goal-dto.model";
import { mapGoalDtoToGoals } from "./goal-mapping";

@Injectable({ providedIn: 'root' })
export class GoalService {
    private uriGoals: string = "api/goals";
    private uriComments: string = "api/comments";
    private uriReplyComments: string = "api/replycomment";

    constructor(private readonly apiService: ApiService) { }

    public getGoals(): Observable<Goal[]> {
        return this.apiService
            .get(this.uriGoals)
            .pipe(map((response: GoalDto[]) => {
                return response.map(mapGoalDtoToGoals)
            })
            );
    }

    public updateGoal(goal: Goal): Observable<Goal> {
        return this.apiService
            .put(this.uriGoals, goal)
            .pipe(map((response: GoalDto) => {
                return mapGoalDtoToGoals(response);
            })
            );
    }

    public createGoal(goal: Goal): Observable<Goal> {
        return this.apiService
            .post(this.uriGoals, goal)
            .pipe(map((response: GoalDto) => {
                return mapGoalDtoToGoals(response);
            })
            );
    }

    public createComment(comment: Comment): Observable<Goal> {
        return this.apiService
            .post(this.uriComments, comment)
            .pipe(map((response: GoalDto) => {
                return mapGoalDtoToGoals(response);
            })
            );
    }

    public deleteComment(id: number): Observable<number> {
        return this.apiService
            .delete(this.uriComments + '/' + id)
            .pipe(map((response: number) => {
                return response;
            })
            );
    }


    public createReplyComment(reply: ReplyComment): Observable<Goal> {
        return this.apiService
            .post(this.uriReplyComments, reply)
            .pipe(map((response: GoalDto) => {
                return mapGoalDtoToGoals(response);
            })
            );
    }


}
