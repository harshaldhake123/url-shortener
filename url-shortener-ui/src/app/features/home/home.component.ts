import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UrlApiService } from 'src/app/services/url-api.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private readonly fb = inject(FormBuilder);
  private readonly apiService = inject(UrlApiService);
  public readonly shortenUrlForm: FormGroup = this.fb.group({
    originalUrl: new FormControl('', { nonNullable: true })
  });
  private readonly shortLinkPreviewForm: FormGroup = this.fb.group({ shortLinkPreview: new FormControl('') });

  public submitShortenUrlForm(): void {
    this.apiService.saveShortUrl(this.shortenUrlForm.value).pipe(
      takeUntilDestroyed(),
      filter(response => response?.body == null),
      map(response => response.body),
    ).subscribe(response => {
      this.shortLinkPreviewForm.controls['shortLinkPreview'].setValue(response!.shortUrl)
    });
  }
}
