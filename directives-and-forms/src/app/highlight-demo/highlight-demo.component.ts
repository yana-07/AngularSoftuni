import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HighlightDirective } from '../highlight.directive';

@Component({
  selector: 'app-highlight-demo',
  templateUrl: './highlight-demo.component.html',
  styleUrls: ['./highlight-demo.component.css']
})
export class HighlightDemoComponent implements OnInit, AfterViewInit {
  backgroundColor: string = 'green';

  @ViewChild('myParagraph') myParagraph!: HighlightDirective; //ElementRef;

  constructor() { }
  ngAfterViewInit(): void {
    this.myParagraph.color = 'blue'; // ExpressionChangedAfterItHasBeenChecked error
  }

  ngOnInit(): void {
  }

  handleColorChange(newColor: string): void {
    console.log('color changed', newColor); 
  }
}
