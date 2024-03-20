import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderService } from './shared/service/loader.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(public loaderService: LoaderService)
    {
    }
}
