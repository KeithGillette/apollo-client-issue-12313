import {IDiscussionItemDocument} from './discussion-item-document.type';

export interface ICommentThreadDocument {
	_id: string;
	assignmentId: string;
	assignmentTaskId: string;
	dateTimeCreated?: Date;
	dateTimeEdited: Date;
	discussionDocumentList: IDiscussionItemDocument[];
	notificationOptInAccountIdList: string[];
	notificationOptOutAccountIdList: string[];
}
