import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRestartComponent } from './dialog-restart.component';

describe('DialogRestartComponent', () => {
  let component: DialogRestartComponent;
  let fixture: ComponentFixture<DialogRestartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogRestartComponent]
    });
    fixture = TestBed.createComponent(DialogRestartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
