import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileDropModule } from 'ngx-file-drop';
import { TreeModule } from 'angular-tree-component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { MatDialogModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { OdmviewComponent, MappingDialog } from './odmview/odmview.component';
import { Hl7TableComponent } from './hl7-table/hl7-table.component';
import { SsmixtreeComponent } from './ssmixtree/ssmixtree.component';
import { SsmixviewComponent } from './ssmixview/ssmixview.component';
import { HeaderComponent, MapViewDialog } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DraggableDirective } from './draggable.directive';
import { DroppableDirective } from './droppable.directive';
import { ClipboardModule } from 'ngx-clipboard';

import { MappingDataService } from './mapping-data.service';

@NgModule({
  declarations: [
    AppComponent,
    OdmviewComponent,
    Hl7TableComponent,
    SsmixtreeComponent,
    SsmixviewComponent,
    HeaderComponent,
    FooterComponent,
    DraggableDirective,
    DroppableDirective,
    MappingDialog,
    MapViewDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FileDropModule,
    TreeModule.forRoot(),
    NgxDnDModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    ClipboardModule
  ],
  providers: [MappingDataService],
  bootstrap: [AppComponent],
  entryComponents: [ MappingDialog, MapViewDialog ]
})
export class AppModule { }
