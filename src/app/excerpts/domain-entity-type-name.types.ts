import {GQLSchemaRootName} from './domain-operation-name.types';


/** Names of [GraphQL Object Types](http://graphql.org/learn/schema/#object-types-and-fields) corresponding to TypeScript domain entities */
export enum DomainEntityTypeName {
	User = 'User',
	Account = 'Account',
	Organization = 'Organization',
	Manual = 'Manual',
	Procedure = 'Procedure',
	ProcedureStep = 'ProcedureStep',
	Content = 'Content',
	Assignment = 'Assignment',
	AssignmentTask = 'AssignmentTask',
	CommentThread = 'CommentThread',
	FeedbackThread = 'FeedbackThread',
	DiscussionItem = 'DiscussionItem',
	DiscussionItemAttachment = 'DiscussionItemAttachment',
	LinkMetadata = 'LinkMetadata',
	BillingPlan = 'BillingPlan',
	OrganizationBillingInfo = 'OrganizationBillingInfo',
	Article = 'Article',
	Exchange = 'Exchange',
}

/** Names of [GraphQL Object Types](http://graphql.org/learn/schema/#object-types-and-fields) corresponding to properties on TypeScript domain entities */
export enum DomainEntityPropertyTypeName {
	DateTime = 'DateTime',
	OrganizationRole = 'OrganizationRole',
	OrganizationConstraints = 'OrganizationConstraints',
	ManualRole = 'ManualRole',
	ManualStatus = 'ManualStatus',
	ContentType = 'ContentType',
	AssignmentTaskStatus = 'AssignmentTaskStatus',
	AssignmentProgress = 'AssignmentProgress',
	AccountWithManualRole = 'AccountWithManualRole',
	AccountViewStatus = 'AccountViewStatus',
	AssignmentWithAccountViewStatus = 'AssignmentWithAccountViewStatus',
	AssignmentSummary = 'AssignmentSummary',
	CommentThreadWithAccountViewStatus = 'CommentThreadWithAccountViewStatus',
	FeedbackThreadWithAccountViewStatus = 'FeedbackThreadWithAccountViewStatus',
	EntityActivity = 'EntityActivity'
}

/** Names of [GraphQL Input Types](https://graphql.org/learn/schema/#union-types) */
export enum GQLInputTypeName {
	AssignmentTaskOverrideInput = 'AssignmentTaskOverrideInput',
	DiscussionItemInput = 'DiscussionItemInput',
	DiscussionItemAttachmentInput = 'DiscussionItemAttachmentInput',
	Pagination = 'Pagination'
}

/** Names of [GraphQL Types](https://graphql.org/learn/schema/) used only operation results */
export enum GQLResultTypeName {
	UserSignInResult = 'UserSignInResult',
	OrganizationUpdatedResult = 'OrganizationUpdatedResult',
	AccountUpdatedResult = 'AccountUpdatedResult',
	ManualUpdatedResult = 'ManualUpdatedResult',
	ManualUpdatedAccessListResult = 'ManualUpdatedAccessListResult',
	ManualUpdatedProcedureListResult = 'ManualUpdatedProcedureListResult',
	ProcedureUpdatedResult = 'ProcedureUpdatedResult',
	ProcedureUpdatedProcedureStepListResult = 'ProcedureUpdatedProcedureStepListResult',
	ProcedureUpdatedContentListResult = 'ProcedureUpdatedContentListResult',
	ProcedureStepUpdatedResult = 'ProcedureStepUpdatedResult',
	ProcedureStepUpdatedContentListResult = 'ProcedureStepUpdatedContentListResult',
	AssignmentUpdatedResult = 'AssignmentUpdatedResult',
	CommentThreadUpdatedResult = 'CommentThreadUpdatedResult',
	DeletedObjectResult = 'DeletedObjectResult'
}

/** Union type for typing GraphQL object `__typename` properties */
export type GraphQLObjectTypeName = GQLSchemaRootName | DomainEntityTypeName | DomainEntityPropertyTypeName | GQLInputTypeName | GQLResultTypeName;


/** Names of property for primary domain entity parent > child relationships */
export enum DomainEntityChildListPropertyName {
	Manual = 'procedureList',
	Procedure = 'procedureStepList',
	Assignment = 'assignmentTaskList',
	CommentThread = 'discussionList',
}
