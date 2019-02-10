import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialDesignFrameworkModule } from 'angular6-json-schema-form';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatRadioModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsService } from './Questions.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,

    BrowserAnimationsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,

    MaterialDesignFrameworkModule,
    AppRoutingModule
  ],
  providers: [QuestionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
