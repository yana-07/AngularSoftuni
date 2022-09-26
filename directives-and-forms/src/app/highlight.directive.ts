import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  exportAs: 'appHighlightExp' // за достъпване на самата директива в темплейта
})
export class HighlightDirective implements OnInit, OnChanges {
  private _color: string = 'black';

  @Input('appHighlight') backgroundColor: string = 'purple';
  //@Input() appHighlight!: string;  -> става и инпут, т.е. стойността може да бъде подадена в темплейта

  @Input() 
  @HostBinding('style.color')
  color: string = 'dark';
  // @Input() 
  // set color(value: string) {
  //   this._color = value;
  //   this.renderer.setStyle(this.el.nativeElement, 'color', value);
  // }

  @HostListener('mouseenter', ['$event']) // event.target can also be passed
  handleMouseEnter(event: MouseEvent): void {
    console.log(event);
    this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
    this.colorChange.emit('red');
  }

  @HostListener('mouseleave')
  handleMouseLeave(): void {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
    this.colorChange.emit('black');
  }

  @Output() colorChange: EventEmitter<string> = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // (this.el.nativeElement as HTMLElement).addEventListener('mouseenter', () => {
    //   this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
    // });

    // (this.el.nativeElement as HTMLElement).addEventListener('mouseleave', () => {
    //   this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
    // });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    //(this.el.nativeElement as HTMLElement).style.backgroundColor = this.backgroundColor;

    this.setBackgroundColor();
  }

  private setBackgroundColor() : void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      this.backgroundColor
    )
  }

}
