import type { IDiscussionItemAttachment } from './discussion-item-attachment.type';
import { DiscussionType } from './discussion-type.type';

export interface IDiscussionItemDocument {
	_id: string;
	authorAccountId: string;
	dateTimeCreated: Date;
	dateTimeEdited: Date;
	payload: string;
	attachment: IDiscussionItemAttachment;
	discussionDocumentList: IDiscussionItemDocument[];
	type: DiscussionType;
}
