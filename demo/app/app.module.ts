import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CategoryModule } from '../../src/app/app';
import { PermissionsModule } from 'meepo-permissions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PermissionsModule.forRoot({
      items: ['fans']
    }),
    CategoryModule.forRoot('./assets/category.json')
    // WorkerAppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

