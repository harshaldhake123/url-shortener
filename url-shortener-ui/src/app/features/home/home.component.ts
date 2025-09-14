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

  public readonly shortenUrlForm: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly apiService = inject(UrlApiService);

  constructor() {
    this.shortenUrlForm = this.fb.group({
      originalUrl: new FormControl('', { nonNullable: true })
    });
  }

  public submitShortenUrlForm(): void {
    this.apiService.saveShortUrl(this.shortenUrlForm.value);
    // this.shortenUrlForm.value.
  }
}
