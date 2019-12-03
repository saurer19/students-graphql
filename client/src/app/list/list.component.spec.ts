import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';
import { ListComponent } from './list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoadingComponent } from '../loading/loading.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let controller: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent, SearchBarComponent, LoadingComponent ],
      imports: [ApolloTestingModule, RouterModule, FormsModule]
    })
    .compileComponents();
    controller = TestBed.get(ApolloTestingController);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    controller.verify();
  });
});
