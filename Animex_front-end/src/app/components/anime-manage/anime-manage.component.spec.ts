import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeManageComponent } from './anime-manage.component';

describe('AnimeManageComponent', () => {
  let component: AnimeManageComponent;
  let fixture: ComponentFixture<AnimeManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimeManageComponent]
    });
    fixture = TestBed.createComponent(AnimeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
