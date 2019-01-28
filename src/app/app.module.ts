import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//lipraries
import { StarRatingModule } from 'angular-star-rating';
import { NgSelectModule } from '@ng-select/ng-select';




//components
import { AppComponent } from './app.component';
import { HotelsComponent } from './hotels/hotels.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StarRatingModule.forRoot(),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
