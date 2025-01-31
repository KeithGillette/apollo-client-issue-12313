import { DomainEntityBase } from './domain-entity-base.model';
import { BillingPaymentFrequency } from './billing-payment-frequency.type';
import { DomainEntityTypeName } from './domain-entity-type-name.types';
import { populate } from './populate.method';
import { IBillingPlanDocument } from './billing-plan-document.type';

import {OmitMethodKeys} from './utility.methods';


/** Data Transfer Object of `BillingPlan`
 *  Methods removed & properties marked optional to create accurate GraphQL DTO of Domain Entity
 */
export interface IBillingPlan extends Partial<OmitMethodKeys<BillingPlan>> {
}

/** domain model class: A definition of billing used for an Organization's subscription */
export class BillingPlan extends DomainEntityBase {
	public name: string;
	public featureList: string[];
	public unitPrice: number = 0;
	public paymentFrequency: BillingPaymentFrequency = BillingPaymentFrequency.Year;
	public trialDays: number = 14;
	public key: string;
	public isActive: boolean;
	public override readonly __typename: DomainEntityTypeName.BillingPlan = DomainEntityTypeName.BillingPlan;

	public constructor(billingPlanDocument?: IBillingPlanDocument) {
		super();
		if (billingPlanDocument) {
			populate<IBillingPlan>(this, billingPlanDocument);
		}
	}
}
