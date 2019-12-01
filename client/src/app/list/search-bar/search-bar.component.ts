import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent implements OnInit {
  @Input() search: string;
  @Output() searchEmitter = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}
  onSearchChange(value: string) {
    this.searchEmitter.emit(value);
  }
}
