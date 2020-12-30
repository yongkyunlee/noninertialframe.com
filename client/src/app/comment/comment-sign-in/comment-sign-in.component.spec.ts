import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSignInComponent } from './comment-sign-in.component';

describe('CommentSignInComponent', () => {
  let component: CommentSignInComponent;
  let fixture: ComponentFixture<CommentSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
