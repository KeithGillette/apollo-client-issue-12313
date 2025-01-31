import { Prop } from '@typegoose/typegoose';
import {CollectionEntityBase} from './collection-entity-base.model';
import {IBillingPlanDocument} from './billing-plan-document.type';
import {BillingPlanName} from './billing-plan-name.type';
import {BillingPaymentFrequency} from './billing-payment-frequency.type';



export class BillingPlanDocument extends CollectionEntityBase implements IBillingPlanDocument {
	@Prop({enum: BillingPlanName, type: String}) public name: BillingPlanName;
	@Prop({ type: () => [String] }) public featureList: string[];
	@Prop() public unitPrice: number;
	@Prop({enum: BillingPaymentFrequency, type: String}) public paymentFrequency: BillingPaymentFrequency;
	@Prop() public trialDays: number;
	@Prop({index: true}) public externalId: string;
	@Prop() public externalProductId: string;
	@Prop({index: true}) public key: string;
	@Prop() public isActive: boolean;
}
