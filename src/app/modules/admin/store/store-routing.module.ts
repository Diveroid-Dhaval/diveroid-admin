import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'subscription-pricing',
    pathMatch: 'full',
  },
  {
    path:'subscription-pricing',
    component:SubscriptionPricingComponent
  },
  {
    path:'subscription-store-feature',
    component:SubscriptionStoreFeaturesComponent
  },
  {
    path:'feature-pricing',
    component:FeaturePricingComponent
  },
  {
    path:'member-subscription',
    component:MemberSubscriptionComponent
  },
  {
    path:'member-featured',
    component:MemberFeaturedComponent
  },
  {
    path:'payments',
    component:PaymentsComponent
  },
  {
    path:'refund-subscriptions',
    component:RefundSubscriptionComponent
  },
  {
    path:'cancel-subscription',
    component:CancelSubscriptionComponent
  },
  {
    path:'store-distributers',
    component:StoreDistributorsComponent
  },
  {
    path:'cancel-subscription-reasons',
    component:CancelSubscriptionReasonsComponent
  },
  {
    path:'gift-cards',
    component:GiftCardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
