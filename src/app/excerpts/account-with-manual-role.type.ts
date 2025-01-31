import { Account, IAccount } from './account.model';
import { ManualRole } from './manual.types';
import { DomainEntityPropertyTypeName } from './domain-entity-type-name.types';
import { IAccountDocument } from './account-document.type';
import { IManualPermissionDocument } from './manual-permission-document.type';


export type IAccountWithManualRole = Partial<AccountWithManualRole>;

export class AccountWithManualRole {
	public _id: string;
	public account: IAccount;
	public manualRole: ManualRole;
	public __typename: DomainEntityPropertyTypeName.AccountWithManualRole = DomainEntityPropertyTypeName.AccountWithManualRole;

	public constructor(accountDocument: IAccountDocument, manualPermissionDocument: IManualPermissionDocument) {
		this._id = manualPermissionDocument._id;
		this.account = new Account(accountDocument);
		this.manualRole = manualPermissionDocument.manualRole;
	}
}
