import {DomainEntityBase} from './domain-entity-base.model';
import {IAccount} from './account.model';
import {IDiscussionItemDocument} from './discussion-item-document.type';
import {DomainEntityTypeName} from './domain-entity-type-name.types';
import {populate} from './populate.method';
import {IDiscussionItemAttachment} from './discussion-item-attachment.type';
import {DiscussionType} from './discussion-type.type';
import {OmitMethodKeys} from "./utility.methods";

/** Data Transfer Object of `DiscussionItem`
 *  Methods removed & properties marked optional to create accurate GraphQL DTO of Domain Entity
 */
export interface IDiscussionItem extends Partial<OmitMethodKeys<DiscussionItem>> {
}

/** domain model class: An individual post in a comment or feedback thread, which may have child replies */
export class DiscussionItem extends DomainEntityBase {
	public authorAccount: IAccount;
	public dateTimeCreated: Date;
	public dateTimeEdited: Date;
	public payload: string;
	public attachment: IDiscussionItemAttachment;
	public type: DiscussionType;
	public discussionList: IDiscussionItem[] = [];
	public override readonly __typename: DomainEntityTypeName.DiscussionItem = DomainEntityTypeName.DiscussionItem;

	public constructor(initialValues?: IDiscussionItemDocument) {
		super();
		if (initialValues) {
			populate<IDiscussionItem>(this, initialValues);
			this.authorAccount = { _id: initialValues.authorAccountId };
			this.discussionList = initialValues.discussionDocumentList.map((childDocument: IDiscussionItemDocument) => {
				return new DiscussionItem((childDocument));
			});
		}
	}
}
