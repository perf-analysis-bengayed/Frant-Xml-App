import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MatchInfo {
  matchDate: string;
  homeTeam: string;
  awayTeam: string;
  parsedContents: string[];
  matchFileContent: string;
}

@Injectable({
  providedIn: 'root' // Le service sera disponible dans toute l'application
})
export class ConvertService {
  private apiUrl = 'http://localhost:5221/api/xml-import/upload'; // URL de l'API

  constructor(private http: HttpClient) {}

  // Méthode pour uploader les fichiers et retourner un Observable
  uploadFiles(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name);
    });
    return this.http.post(this.apiUrl, formData);
  }

  // Méthode pour extraire un champ spécifique du contenu du fichier
  extractField(content: string, field: string): string {
    const lines = content.split('\n');
    const line = lines.find(l => l.startsWith(field));
    return line ? line.split(': ')[1] : '';
  }

  // Méthode pour extraire la date du match
  extractMatchDate(content: string): string {
    const lines = content.split('\n');
    const line = lines.find(l => l.startsWith('Match Date'));
    return line ? line.split(': ')[1] : '';
  }

  // Méthode pour formater la date
  formatDate(date: string): string {
    return date ? new Date(date).toLocaleDateString('fr-FR') : '';
  }

  // Méthode pour transformer la réponse brute en objet MatchInfo
  processResponse(response: any): MatchInfo {
    return {
      parsedContents: response.parsedContents,
      matchDate: response.matchFileContent.includes('Match Date') 
        ? this.extractMatchDate(response.matchFileContent)
        : '',
      homeTeam: response.matchFileContent.includes('Home Team') 
        ? this.extractField(response.matchFileContent, 'Home Team')
        : '',
      awayTeam: response.matchFileContent.includes('Away Team') 
        ? this.extractField(response.matchFileContent, 'Away Team')
        : '',
      matchFileContent: response.matchFileContent
    };
  }
}