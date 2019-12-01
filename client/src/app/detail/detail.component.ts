import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})
export class DetailComponent implements OnInit {
  student: any;
  loading = true;
  error: any;
  userId:string

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("id")
    console.log(this.userId)
    this.apollo
      .watchQuery({
        variables: {
          id: this.userId
        },
        query: gql`
          query Student($id: ID!) {
            student(id: $id) {
              first
              last
              email
              grades{
                grade
                classroom{
                  name
                }
              }
            }
          }
        `
      })
      .valueChanges.subscribe(result => {
        console.log(result);
        this.student = result.data && result.data["student"];
        this.loading = result.loading;
        this.error = result.errors;
      });
  }
  gradeAvg(grades) {
    const gradeValues = grades.map(x => x.grade);
    return (gradeValues.reduce((a, b) => a + b) / gradeValues.length).toFixed(2)
  }
}
