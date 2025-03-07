import { Component } from '@angular/core';
import { ConvertService } from '../../services/convert.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MatchInfo {
  matchDate: Date | string;
  homeTeam: string;
  awayTeam: string;
  parsedContents: string[];
}
@Component({
  selector: 'app-gestion-xml',
  templateUrl: './gestion-xml.component.html',
  styleUrl: './gestion-xml.component.css'
})
export class GestionXmlComponent {
  selectedFiles: File[] = [];
  matchInfo: any = {
    parsedContents: [],
    matchDate: '',
    homeTeam: '',
    awayTeam: '',
    matchFileContent: ''
  };

  constructor(private convertService: ConvertService) {}

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onUpload(): void {
    if (this.selectedFiles.length === 0) return;

    this.convertService.uploadFiles(this.selectedFiles)
      .subscribe({
        next: (response: any) => {
          this.matchInfo = this.convertService.processResponse(response);
        },
        error: (error) => {
          console.error('Upload error:', error);
        }
      });
  }
}