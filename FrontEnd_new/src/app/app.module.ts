import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AuthService  } from 'src/services/auth.service';
import { AuthGuard } from './auth.guard';
import { TokeninterceptorService } from 'src/services/tokeninterceptor.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StrategyComponent } from './strategy/strategy.component';
import { AddstrategyComponent } from './addstrategy/addstrategy.component';
import { SinglestrategyComponent } from './singlestrategy/singlestrategy.component';
import { EditstrategyComponent } from './editstrategy/editstrategy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import {StratpnlComponent} from './stratpnl/stratpnl.component';
import { SocialLoginModule,SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { AdduserComponent } from './adduser/adduser.component';
import { SubscriptstrategyComponent } from './subscriptstrategy/subscriptstrategy.component'
import { EdituserComponent } from './edituser/edituser.component';
import { SingleuserComponent } from './singleuser/singleuser.component';
import { UsersComponent } from './users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    StrategyComponent,
    AddstrategyComponent,
    SinglestrategyComponent,
    EditstrategyComponent,
    StratpnlComponent,
    AdduserComponent,
    SubscriptstrategyComponent,
    EdituserComponent,
    SingleuserComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    SocialLoginModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot({
			validation: true,
		})
  ],
  providers: [AuthService, AuthGuard, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokeninterceptorService,
    multi: true
  },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.client_id
          )
        }
        
      ],
      onError: (err:any) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
