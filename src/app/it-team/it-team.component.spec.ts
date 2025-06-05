import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItTeamComponent } from './it-team.component';

describe('ItTeamComponent', () => {
  let component: ItTeamComponent;
  let fixture: ComponentFixture<ItTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
