import {DomainEntityBase} from './domain-entity-base.model';
import {IAssignment} from './assignment.type';
import {IAssignmentTask} from './assignment-task.type';
import {IAccount} from './account.model';
import {DomainEntityTypeName} from './domain-entity-type-name.types';
import {populate} from './populate.method';
import {DiscussionItem, IDiscussionItem} from './discussion-item.model';
import {ICommentThreadDocument} from './comment-thread-document.type';
import {OmitMethodKeys} from "./utility.methods";


/** Data Transfer Object of `CommentThread`
 *  Methods removed & properties marked optional to create accurate GraphQL DTO of Domain Entity
 */
export interface ICommentThread extends Partial<OmitMethodKeys<CommentThread>> {
}

/** domain model class: A threaded array of DiscussionItems related to an Assignment or Task */
export class CommentThread extends DomainEntityBase {
	public assignment: IAssignment;
	public assignmentTask: IAssignmentTask;
	public discussionList: IDiscussionItem[] = [];
	public followerList: IAccount[] = []; // Managed by external resolver
	public dateTimeCreated: Date;
	public dateTimeEdited: Date;
	public override readonly __typename: DomainEntityTypeName.CommentThread = DomainEntityTypeName.CommentThread;

	public constructor(initialValues?: ICommentThreadDocument) {
		super();
		if (initialValues) {
			populate<ICommentThread>(this, initialValues);
			this.assignment = { _id: initialValues.assignmentId };
			this.assignmentTask = initialValues.assignmentTaskId ? { _id: initialValues.assignmentTaskId } : undefined;
			this.discussionList = initialValues.discussionDocumentList.map((childDocument) => {
				return new DiscussionItem((childDocument));
			});
		}
	}
}
