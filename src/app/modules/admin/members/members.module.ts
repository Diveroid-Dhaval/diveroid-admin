import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { GuestMemberComponent } from './guest-member/guest-member.component';
import { SharedModule } from 'app/shared/shared.module';
import { LoginLogComponent } from './login-log/login-log.component';
import { BlacklistedTokensComponent } from './blacklisted-tokens/blacklisted-tokens.component';

@NgModule({
    declarations: [GuestMemberComponent, LoginLogComponent, BlacklistedTokensComponent],
    imports: [CommonModule, MembersRoutingModule,SharedModule],
})
export class MembersModule {}
