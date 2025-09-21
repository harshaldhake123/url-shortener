import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
	selector: 'app-main-toolbar',
	imports: [
		MatIconModule,
		MatButtonModule,
		MatToolbarModule

	],
	templateUrl: './main-toolbar.component.html',
	styleUrl: './main-toolbar.component.scss'
})
export class MainToolbarComponent {

}
