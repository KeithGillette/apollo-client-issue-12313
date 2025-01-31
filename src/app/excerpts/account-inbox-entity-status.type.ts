import { AccountViewStatus } from './account-view-status.type';

export interface IAccountInboxEntityStatus {
	parentId: string;
	viewStatus: AccountViewStatus;
	unreadChildIdList: string[];
}
