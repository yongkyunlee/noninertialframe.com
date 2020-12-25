import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBlogPostComponent } from './manage-blog-post.component';

describe('ManageBlogPostComponent', () => {
  let component: ManageBlogPostComponent;
  let fixture: ComponentFixture<ManageBlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBlogPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
