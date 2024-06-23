import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatseitePage } from './chatseite.page';

describe('ChatseitePage', () => {
  let component: ChatseitePage;
  let fixture: ComponentFixture<ChatseitePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatseitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
