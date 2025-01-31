import {IDomainEntity} from './domain-entity-base.model';
import {AssignmentPriority} from './assignment-priority.type';
import {IAccount} from './account.model';
import {AssignmentTaskStatus} from './assignment-task-status.types';
import {IAssignmentTask} from './assignment-task.type';
import {ICommentThread} from './comment-thread.model';
import {IContent} from './content.model';
import {IProcedure} from './procedure.model';
import {IEntityActivity} from './entity-activity.model';
import {IAssignmentProgress} from './assignment-progress.type';
import {DomainEntityTypeName} from './domain-entity-type-name.types';


/**
 * TypeScript Data Transfer Object of eponymous GraphQL Type
 * Defined independently of eponymous TypeScript class because client can't import Typegoose models
 */
export interface IAssignment extends IDomainEntity {
	name?: string;
	description?: string;
	detail?: string;
	priority?: AssignmentPriority;
	dateTimeAssigned?: Date;
	dateTimeOpened?: Date;
	dateTimeClosed?: Date;
	dateTimeStart?: Date;
	dateTimeDue?: Date;
	tagList?: string[];
	assigneeAccount?: IAccount; // Managed by external resolver
	requestorAccount?: IAccount; // Managed by external resolver
	assignmentTaskStatus?: AssignmentTaskStatus;
	assignmentTaskList?: IAssignmentTask[];
	commentThreadList?: ICommentThread[]; // Managed by external resolver
	contentList?: IContent[]; // Managed by external resolver
	procedure?: IProcedure; // Managed by external resolver
	activityList?: IEntityActivity[]; // Managed by external resolver
	progress?: IAssignmentProgress; // Managed by `@client` resolver
	readonly __typename?: DomainEntityTypeName.Assignment;
}
