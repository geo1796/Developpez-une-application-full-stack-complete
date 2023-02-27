import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAddedComponent } from './post-added.component';

describe('PostAddedComponent', () => {
  let component: PostAddedComponent;
  let fixture: ComponentFixture<PostAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAddedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
