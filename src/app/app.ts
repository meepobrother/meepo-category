import { NgModule, ModuleWithProviders } from '@angular/core';
import { EventModule } from 'meepo-event';
import { MeepoCoreServiceModule } from 'meepo-core';
import { PermissionsModule } from 'meepo-permissions';
import { IconsModule } from 'meepo-icons';
import { CommonModule } from '@angular/common';
import { StoreModule } from 'meepo-store';
import { CategoryComponent, CATEGORY_TOKEN } from './category/category';
import { AxiosModule } from 'meepo-axios';

@NgModule({
    imports: [
        EventModule.forRoot(),
        PermissionsModule.forRoot({
            items: ['admin']
        }),
        IconsModule,
        CommonModule,
        StoreModule,
        AxiosModule
    ],
    exports: [
        CategoryComponent,
    ],
    declarations: [
        CategoryComponent,
    ],
    providers: [
    ],
})
export class CategoryModule {
    public static forRoot(url: string): ModuleWithProviders {
        return {
            ngModule: CategoryModule,
            providers: [{
                provide: CATEGORY_TOKEN,
                useValue: url
            }]
        }
    }
}

