import { BillingPaymentFrequency } from './billing-payment-frequency.type';
import { BillingPlanName } from './billing-plan-name.type';

export interface IBillingPlanDocument {
	name: BillingPlanName;
	featureList: string[];
	unitPrice: number;
	paymentFrequency: BillingPaymentFrequency;
	trialDays: number;
	externalId: string;
	externalProductId: string;
	key: string;
	isActive: boolean;
}
