import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';
import { DetailComponent, GET_STUDENT_QUERY } from './detail.component';
import { LoadingComponent } from '../loading/loading.component';
import { RouterModule } from '@angular/router';

describe('DetailComponent', () => {
  let controller: ApolloTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailComponent, LoadingComponent ],
      imports: [ApolloTestingModule, RouterModule.forRoot([]),]
    })
    .compileComponents();
    controller = TestBed.get(ApolloTestingController);
  })
  it('should create', () => {
    const fixture=TestBed.createComponent(DetailComponent);
    const component = fixture.componentInstance;
    component.getStudent().subscribe(({data}) => {
      //Make some assertion about the result;
      expect(data['student']['last']).toEqual('Cortez');
      expect(data['student']['first']).toEqual('Tyler');
    });
    const op = controller.expectOne(GET_STUDENT_QUERY);
    op.flush({
      data: {
        student: {
          first: 'Tyler',
          last: 'Cortez',
          email:"tyler_cortez@mailinator.com",
          grades: [
            {
              grade: 3.5,
              classroom: {
                name: "English 101"
              }
            }
          ]
        },
      },
    });
  });
  afterEach(() => {
    controller.verify();
  });
});
