import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  search = "";
  students: any[];
  loading = true;
  error: any;
  constructor(private apollo: Apollo) {}

  ngOnInit() {}
  updateSearch(event) {
    console.log(event);

    this.apollo
      .watchQuery({
        variables: {
          searchString: event
        },
        query: gql`
          query StudentFilter($searchString: String!) {
            StudentFilter(searchString: $searchString) {
              first
              last
              id
              grades {
                grade
              }
            }
          }
        `
      })
      .valueChanges.subscribe(result => {
        console.log(result);
        this.students = result.data && result.data["StudentFilter"];
        this.loading = result.loading;
        this.error = result.errors;
      });
  }
  gradeAvg(grades) {
    const gradeValues = grades.map(x => x.grade);
    return (gradeValues.reduce((a, b) => a + b) / gradeValues.length).toFixed(2)
  }
}
