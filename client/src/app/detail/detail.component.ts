import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { shareReplay, pluck } from "rxjs/operators";

export const GET_STUDENT_QUERY = gql`
  query Student($id: ID!) {
    student(id: $id) {
      first
      last
      email
      grades {
        grade
        classroom {
          name
        }
      }
    }
  }
`;

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})
export class DetailComponent implements OnInit {
  loading$: Observable<boolean>;
  error$: Observable<any>;
  student$: Observable<any>;
  userId: string;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    const source$ = this.getStudent();

    this.loading$ = source$.pipe(pluck('loading'));
    this.error$ = source$.pipe(pluck('errors'));
    this.student$ = source$.pipe(pluck('data', 'student'));
  }
  gradeAvg(grades) {
    const gradeValues = grades.map(x => x.grade);
    return (gradeValues.reduce((a, b) => a + b) / gradeValues.length).toFixed(
      2
    );
  }
  getStudent() {
    return this.apollo
      .watchQuery({
        query: GET_STUDENT_QUERY,
        variables: {
          id: this.route.snapshot.paramMap.get("id")
        }
        
      })
      .valueChanges.pipe(shareReplay(1));
  }
}
