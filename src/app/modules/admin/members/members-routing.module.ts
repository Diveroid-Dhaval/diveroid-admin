import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestMemberComponent } from './guest-member/guest-member.component';
import { LoginLogComponent } from './login-log/login-log.component';
import { BlacklistedTokensComponent } from './blacklisted-tokens/blacklisted-tokens.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'users', 
        pathMatch: 'full',
    },
    {
        path: 'users',
        component: GuestMemberComponent,
    },
    {
        path: 'guest',
        component: GuestMemberComponent,
    },
    {
        path: 'log-in-logs',
        component: LoginLogComponent,
    },
    {
        path: 'black-listed-tokens',
        component: BlacklistedTokensComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MembersRoutingModule {}
