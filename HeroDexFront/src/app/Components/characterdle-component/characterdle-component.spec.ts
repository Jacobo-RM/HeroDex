import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterdleComponent } from './characterdle-component';

describe('CharacterdleComponent', () => {
  let component: CharacterdleComponent;
  let fixture: ComponentFixture<CharacterdleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterdleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterdleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
