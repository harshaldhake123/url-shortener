import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainToolbarComponent } from "./features/main-toolbar/main-toolbar.component";
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiUrlInterceptor } from './interceptors/api-url.interceptor';
import { errorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { ConsoleLoggerService, LoggerService } from './logger.service';
import { SnackbarService } from './services/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MainToolbarComponent,
		MatSnackBarModule,
	],
	providers: [
		provideHttpClient(withInterceptors([apiUrlInterceptor, errorHandlingInterceptor])),
		{ provide: LoggerService, useClass: ConsoleLoggerService },
		SnackbarService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
