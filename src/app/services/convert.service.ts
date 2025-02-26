import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MatchInfo {
  matchDate: string;
  // equipeLocale: string;
  // equipeVisiteuse: string;
  // competition: string;
  // journeeChampionnat: string;
  // equipeSuivie: string;
  // listeJoueursEquipeLocale: string[];
  // listeJoueursEquipeVisiteuse: string[];
  // fichiersVideo: string[];
  // coteTerrainPremierePeriode: string;
  // timecodesDebutPeriodes: string[];
}
@Injectable({
  providedIn: 'root',
})
export class ConvertService {


  private apiUrl = 'http://localhost:5221/api/xml-import/upload';

  constructor(private http: HttpClient) {}

  uploadFiles(files: File[], matchInfo: MatchInfo): Observable<any> {
    const formData = new FormData();
  
    files.forEach(file => formData.append('files', file)); // Ajouter plusieurs fichiers
    formData.append('matchInfo', new Blob([JSON.stringify(matchInfo)], { type: 'application/json' }));
  
    return this.http.post<any>(this.apiUrl, formData);
  }
}
