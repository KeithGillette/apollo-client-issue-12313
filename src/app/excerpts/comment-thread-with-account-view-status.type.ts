import { AccountViewStatus } from './account-view-status.type';
import { ICommentThread } from './comment-thread.model';
import { DomainEntityPropertyTypeName } from './domain-entity-type-name.types';

export interface ICommentThreadWithAccountViewStatus {
	/** Only needed for automatic Apollo cache updates so linked to `commentThread._id` */
	_id?: string;
	/** Managed by external resolver */
	commentThread?: ICommentThread;
	viewStatus?: AccountViewStatus;
	unreadChildIdList?: string[];
	__typename?: DomainEntityPropertyTypeName.CommentThreadWithAccountViewStatus;
}
