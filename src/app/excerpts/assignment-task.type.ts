import {AssignmentTaskStatus} from './assignment-task-status.types';
import {DomainEntityTypeName} from './domain-entity-type-name.types';
import {ICommentThread} from './comment-thread.model';
import {IProcedureStep} from './procedure-step.model';
import {IContent} from './content.model';
import {IAccount} from './account.model';
import {IAssignment} from './assignment.type';
import {IEntityActivity} from './entity-activity.model';
import {IDomainEntity} from './domain-entity-base.model';


/**
 * TypeScript Data Transfer Object of eponymous GraphQL Type
 * Defined independently of eponymous TypeScript class because client can't import Typegoose models
 */
export interface IAssignmentTask extends IDomainEntity {
	name?: string;
	detail?: string;
	assignmentTaskStatus?: AssignmentTaskStatus;
	dateTimeStart?: Date;
	dateTimeDue?: Date;
	dateTimeOpened?: Date;
	dateTimeClosed?: Date;
	assigneeAccount?: IAccount; // Managed by external resolver
	contentList?: IContent[]; // Managed by external resolver
	assignmentTaskList?: IAssignmentTask[];
	commentThread?: ICommentThread; // Managed by external resolver
	procedureStep?: IProcedureStep; // Managed by external resolver
	assignment?: IAssignment; // Managed by external resolver
	activityList?: IEntityActivity[]; // Managed by external resolver
	readonly __typename?: DomainEntityTypeName.AssignmentTask;
}
