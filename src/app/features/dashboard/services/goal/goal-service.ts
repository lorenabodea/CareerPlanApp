import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiService } from "src/app/core/data-service";
import { Goal, Task } from "src/app/domain/goal.model";
import { GoalDto, TaskDto } from "./goal-dto.model";
import { mapGoalDtoToGoals } from "./goal-mapping";

@Injectable({ providedIn: 'root' })
export class GoalService {
    private uriGoals: string = "api/goals";
    private uriTasks: string = "api/tasks";

    constructor(private readonly apiService: ApiService) { }

    public getGoals(): Observable<Goal[]> {
        return this.apiService
            .get(this.uriGoals)
            .pipe(map((response: GoalDto[]) => {
                console.log(response)
                return response.map(mapGoalDtoToGoals)
            })
        );
    }

    public updateGoal(goal: Goal): Observable<Goal> {
        return this.apiService
            .put(this.uriGoals, goal)
            .pipe(map((response: GoalDto) => {
                console.log(response)
                return mapGoalDtoToGoals(response);
            })
            );
    }
}
