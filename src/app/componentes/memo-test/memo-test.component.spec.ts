import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoTestComponent } from './memo-test.component';

describe('MemoTestComponent', () => {
  let component: MemoTestComponent;
  let fixture: ComponentFixture<MemoTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
