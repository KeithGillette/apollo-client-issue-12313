import { BillingPaymentStatus } from './billing-payment-status.type';
import { IBillingPlan } from './billing-plan.model';
import { IBillingPaymentMethod } from './billing-payment-method.type';
import { BillingPaymentProcessor } from './billing-payment-processor.type';

export interface IOrganizationBillingInfo {
	plan?: IBillingPlan;
	subscriptionStartDate?: Date;
	paymentStatus?: BillingPaymentStatus;
	paymentMethod?: IBillingPaymentMethod;
	paymentProcessor?: BillingPaymentProcessor;
	paymentStatusDateTime?: Date;
}
