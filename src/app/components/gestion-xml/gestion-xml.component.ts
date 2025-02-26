import { Component } from '@angular/core';
import { ConvertService } from '../../services/convert.service';

@Component({
  selector: 'app-gestion-xml',
  templateUrl: './gestion-xml.component.html',
  styleUrl: './gestion-xml.component.css'
})
export class GestionXmlComponent {
  selectedFiles: File[] = [];

  matchInfo = {
    matchDate: '2025-02-26',
    // equipeLocale: 'Equipe A',
    // equipeVisiteuse: 'Equipe B',
    // competition: 'Ligue 1',
    // journeeChampionnat: '12',
    // equipeSuivie: 'Equipe A',
    // listeJoueursEquipeLocale: ['Joueur 1', 'Joueur 2'],
    // listeJoueursEquipeVisiteuse: ['Joueur 3', 'Joueur 4'],
    // fichiersVideo: ['video1.mp4'],
    // coteTerrainPremierePeriode: 'Nord',
    // timecodesDebutPeriodes: ['00:00', '45:00']
  };
  
  constructor(private convertService: ConvertService) {}

  parsedContents: string[] = []; 


  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files); 
  }

  onUpload() {
    if (this.selectedFiles.length > 0) {
      this.convertService.uploadFiles(this.selectedFiles, this.matchInfo).subscribe(
        response => {
          console.log('Upload réussi', response);

          this.parsedContents = response.parsedContents || []; 
          console.log('Parsed Contents:', this.parsedContents);

        },
        error => {
          console.error('Erreur d\'upload', error);
        }
      );
    }
  }
  
}

