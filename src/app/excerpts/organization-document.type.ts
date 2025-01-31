import { IOrganizationConstraints } from './organization-constraints.type';
import { BillingPaymentStatus } from './billing-payment-status.type';
import { IBillingPaymentMethod } from './billing-payment-method.type';
import { BillingPaymentProcessor } from './billing-payment-processor.type';


export interface IOrganizationDocument {
	name: string;
	description: string;
	dateTimeCreated?: Date;
	sectorList: string[];
	activeAccountsCount: number;
	constraints: IOrganizationConstraints;
	billingInfo: {
		customerId?: string;
		planId: string;
		subscriptionId?: string;
		subscriptionStartDate: Date;
		paymentStatus?: BillingPaymentStatus;
		paymentMethod?: IBillingPaymentMethod;
		paymentProcessor?: BillingPaymentProcessor;
		paymentStatusDateTime?: Date;
		paymentStatusExternalId?: string;
		referralLeadId?: number;
	};
}
