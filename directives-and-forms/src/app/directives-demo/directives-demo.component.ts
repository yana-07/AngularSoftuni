import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives-demo',
  templateUrl: './directives-demo.component.html',
  styleUrls: ['./directives-demo.component.css']
})
export class DirectivesDemoComponent implements OnInit {
  shouldFontBeBig: boolean = false;
  shouldShowText: boolean = false;
  styles = {'background-color': 'yellow', 'color': 'blue'};

  constructor() { }

  ngOnInit(): void {
  }

}
