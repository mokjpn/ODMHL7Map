import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileDropModule } from 'ngx-file-drop';
import { TreeModule } from 'angular-tree-component';


import { AppComponent } from './app.component';
import { OdmviewComponent } from './odmview/odmview.component';
import { Hl7TableComponent } from './hl7-table/hl7-table.component';
import { SsmixtreeComponent } from './ssmixtree/ssmixtree.component';
import { SsmixviewComponent } from './ssmixview/ssmixview.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    OdmviewComponent,
    Hl7TableComponent,
    SsmixtreeComponent,
    SsmixviewComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FileDropModule,
    TreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
