import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/user'
    { path: '', pathMatch: 'full', redirectTo: 'master/languages' },
    // Redirect signed in user to the '/user'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'master/languages',
    },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
            // { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/page-not-found/error-404.module').then(m => m.Error404Module) },
            // { path: '**', redirectTo: '404-not-found' }
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'master',
                loadChildren: () =>
                    import('./modules/admin/master/master.module').then(
                        (m) => m.MasterModule
                    ),
            },
            {
                path: 'members',
                loadChildren: () =>
                    import('./modules/admin/members/members.module').then(
                        (m) => m.MembersModule
                    ),
            },
            {
                path: 'devices',
                loadChildren: () =>
                    import('./modules/admin/devices/devices.module').then(
                        (m) => m.DevicesModule
                    ),
            },
            {
                path: 'my-info',
                loadChildren: () =>
                    import('./modules/admin/my-info/my-info.module').then(
                        (m) => m.MyInfoModule
                    ),
            },
            {
                path: 'device-settings',
                loadChildren: () =>
                    import(
                        './modules/admin/device-setting/device-setting.module'
                    ).then((m) => m.DeviceSettingModule),
            },
            {
                path: 'faq',
                loadChildren: () =>
                    import('./modules/admin/faq/faq.module').then(
                        (m) => m.FaqModule
                    ),
            },
            {
                path: 'notice',
                loadChildren: () =>
                    import('./modules/admin/notice/notice.module').then(
                        (m) => m.NoticeModule
                    ),
            },
            {
                path: 'third-party-cameras',
                loadChildren: () =>
                    import(
                        './modules/admin/third-party-cameras/third-party-cameras.module'
                    ).then((m) => m.ThirdPartyCamerasModule),
            },
            {
                path:'delete-accounts',
                loadChildren:()=>import('./modules/admin/delete-accounts/delete-accounts.module').then(m=>m.DeleteAccountsModule)
            },
            {
                path:'app-info',
                loadChildren:()=>import('./modules/admin/app-info/app-info.module').then(m=>m.AppInfoModule)
            },
            {
                path:'products',
                loadChildren:()=>import('./modules/admin/products/products.module').then(m=>m.ProductsModule)
            },
            {
                path:'suggestions',
                loadChildren:()=>import('./modules/admin/suggestions/suggestions.module').then(m=>m.SuggestionsModule)
            },
            {
                path:'store',
                loadChildren:()=>import('./modules/admin/store/store.module').then(m=>m.StoreModule)
            },
            // 404 & Catch all
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () =>
                    import('app/modules/page-not-found/error-404.module').then(
                        (m) => m.Error404Module
                    ),
            },
            { path: '**', redirectTo: '404-not-found' },
        ],
    },
];
