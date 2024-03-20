import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { SubscriptionPricingComponent } from './subscription-pricing/subscription-pricing.component';
import { SubscriptionStoreFeaturesComponent } from './subscription-store-features/subscription-store-features.component';
import { FeaturePricingComponent } from './feature-pricing/feature-pricing.component';
import { MemberSubscriptionComponent } from './member-subscription/member-subscription.component';
import { MemberFeaturedComponent } from './member-featured/member-featured.component';
import { PaymentsComponent } from './payments/payments.component';
import { RefundSubscriptionComponent } from './refund-subscription/refund-subscription.component';
import { CancelSubscriptionComponent } from './cancel-subscription/cancel-subscription.component';
import { CancelSubscriptionReasonsComponent } from './cancel-subscription-reasons/cancel-subscription-reasons.component';
import { GiftCardsComponent } from './gift-cards/gift-cards.component';
import { StoreDistributorsComponent } from './store-distributors/store-distributors.component';


@NgModule({
  declarations: [
    SubscriptionPricingComponent,
    SubscriptionStoreFeaturesComponent,
    FeaturePricingComponent,
    MemberSubscriptionComponent,
    MemberFeaturedComponent,
    PaymentsComponent,
    RefundSubscriptionComponent,
    CancelSubscriptionComponent,
    CancelSubscriptionReasonsComponent,
    GiftCardsComponent,
    StoreDistributorsComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule
  ]
})
export class StoreModule { }
