import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { FormsModule } from '@angular/forms';
import { SupplyService } from './services/supply.service';
import { DxDataGridModule, DxFormModule, DxSelectBoxModule } from 'devextreme-angular';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { UserService } from './services/user.service';
import { RequestService } from './services/request.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DxDataGridModule,
    DxFormModule,
    DxSelectBoxModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot()
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    RequestService,
    UserService,
    SupplyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
