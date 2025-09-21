import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, of, switchMap } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UrlApiService } from 'src/app/services/url-api.service';

@UntilDestroy()
@Component({
	selector: 'app-home',
	imports: [
		ClipboardModule,
		MatButtonModule,
		MatCardModule,
		MatDividerModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatTooltipModule,
		ReactiveFormsModule,
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	@ViewChild('urlInput', { static: false }) public urlInputTooltip?: MatTooltip;
	private readonly apiService = inject(UrlApiService);
	private readonly clipboard = inject(Clipboard);
	private readonly fb = inject(FormBuilder);
	private readonly snackbarService = inject(SnackbarService);
	public readonly shortLinkPreviewForm: FormGroup = this.fb.group({ shortLinkPreview: new FormControl('') });
	public readonly shortenUrlForm: FormGroup = this.fb.group({ originalUrl: new FormControl('', { nonNullable: true }) });
	public tooltipMessage = 'Please enter a URL to continue';

	public submitShortenUrlForm(): void {
		const formControl = this.shortenUrlForm.get('originalUrl')!;
		if (formControl.invalid || formControl.value.trim() === '') {
			this.urlInputTooltip?.show();
			return;
		}
		this.apiService.saveShortUrl(this.shortenUrlForm.value).pipe(
			untilDestroyed(this),
			switchMap(response => of(response.body)),
			filter(response => response != null),
		).subscribe(response => {
			this.shortLinkPreviewForm.controls['shortLinkPreview'].setValue(response!.shortUrl)
		});
	}

	public onCopySuccess(): void {
		this.snackbarService.show('Short URL copied to clipboard');
	}
}