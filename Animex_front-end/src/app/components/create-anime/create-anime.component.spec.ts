import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnimeComponent } from './create-anime.component';

describe('CreateAnimeComponent', () => {
  let component: CreateAnimeComponent;
  let fixture: ComponentFixture<CreateAnimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAnimeComponent]
    });
    fixture = TestBed.createComponent(CreateAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
