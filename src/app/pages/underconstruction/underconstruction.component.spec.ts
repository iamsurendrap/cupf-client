import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderconstructionComponent } from './underconstruction.component';

describe('UnderconstructionComponent', () => {
  let component: UnderconstructionComponent;
  let fixture: ComponentFixture<UnderconstructionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UnderconstructionComponent]
    });
    fixture = TestBed.createComponent(UnderconstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
