/** Possible completion States for an Assignment/Task */
export enum AssignmentTaskStatus {
	NotStarted = 'NotStarted', InProgress = 'InProgress', Skipped = 'Skipped', OnHold = 'OnHold', Completed = 'Completed'
}

export enum AssignmentTaskStatusCategory { Open = 'Open', Closed = 'Closed' }

export const AssignmentTaskStatusCategoryOpenList: AssignmentTaskStatus[] = [AssignmentTaskStatus.NotStarted, AssignmentTaskStatus.InProgress, AssignmentTaskStatus.OnHold];
export const AssignmentTaskStatusCategoryClosedList: AssignmentTaskStatus[] = [AssignmentTaskStatus.Skipped, AssignmentTaskStatus.Completed];
