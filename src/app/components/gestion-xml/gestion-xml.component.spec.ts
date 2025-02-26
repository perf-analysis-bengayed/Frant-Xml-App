import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionXmlComponent } from './gestion-xml.component';

describe('GestionXmlComponent', () => {
  let component: GestionXmlComponent;
  let fixture: ComponentFixture<GestionXmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionXmlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
