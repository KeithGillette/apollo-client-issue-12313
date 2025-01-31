import { Prop } from '@typegoose/typegoose';


import { BillingPlanDocument } from './billing-plan-document.model';
import {IOrganizationConstraints} from './organization-constraints.type';
import {IBillingPaymentMethod} from './billing-payment-method.type';
import {BillingPaymentStatus} from './billing-payment-status.type';
import {BillingPaymentProcessor} from './billing-payment-processor.type';
import {CollectionEntityBase} from './collection-entity-base.model';
import {IOrganizationDocument} from './organization-document.type';
import {populate} from './populate.method';


class OrganizationConstraints implements IOrganizationConstraints {
	@Prop() public manualPrivacyAllowed: boolean;
	@Prop() public discussionAttachmentSizeMax: number;
	@Prop() public openAssignmentCountMax: number;
	@Prop() public openAssignmentCountCurrent: number;
}

class BillingPaymentMethod implements IBillingPaymentMethod {
	@Prop() public lastDigits: string;
	@Prop() public expirationYear: number;
	@Prop() public expirationMonth: number;
	@Prop() public type: string;
	@Prop() public externalCardId: string;
}

class OrganizationDocumentBillingInfo {
	@Prop() public customerId?: string;
	@Prop({ref: () => BillingPlanDocument}) public planId: string;
	@Prop() public subscriptionId?: string;
	@Prop() public subscriptionStartDate: Date;
	@Prop({enum: BillingPaymentStatus, type: String}) public paymentStatus?: BillingPaymentStatus;
	@Prop({_id: false}) public paymentMethod?: BillingPaymentMethod;
	@Prop({enum: BillingPaymentProcessor, type: String}) public paymentProcessor?: BillingPaymentProcessor;
	@Prop() public paymentStatusDateTime?: Date;
	@Prop() public paymentStatusExternalId?: string;
	@Prop() public referralLeadId?: number;
}

export class OrganizationDocument extends CollectionEntityBase implements IOrganizationDocument {
	@Prop() public name: string;
	@Prop() public description: string;
	@Prop({type: String}) public sectorList: string[] = [];
	@Prop() public activeAccountsCount: number = 1;
	@Prop({_id: false}) public constraints: OrganizationConstraints = {
		manualPrivacyAllowed: undefined,
		discussionAttachmentSizeMax: undefined,
		openAssignmentCountMax: undefined,
		openAssignmentCountCurrent: 0,
	};
	@Prop({_id: false}) public billingInfo: OrganizationDocumentBillingInfo = {
		subscriptionStartDate: new Date(),
		planId: undefined,
		customerId: undefined,
		subscriptionId: undefined,
		paymentStatus: undefined,
		paymentMethod: undefined,
		paymentProcessor: BillingPaymentProcessor.Stripe,
		paymentStatusExternalId: undefined,
		paymentStatusDateTime: undefined,
		referralLeadId: undefined,
	};

	public constructor(initialValues?: Partial<OrganizationDocument>) {
		super();
		populate(this, initialValues);
	}
}
