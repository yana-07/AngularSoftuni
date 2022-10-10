import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { decrement, increment, reset } from "src/app/+store";
import { MyCounterComponent } from "./my-counter.component";

fdescribe('MyCounterComponent', () => {
  let component: MyCounterComponent;
  let fixture: ComponentFixture<MyCounterComponent>; // тестова среда

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCounterComponent],
      providers: [
        {
          provide: Store,
          useValue: {
            select: () => of(0),
            dispatch: () => {}
          }
        }
      ]
    })

    fixture = TestBed.createComponent(MyCounterComponent); // ще извика конструктора, но не и ngOnInit(), както и няма да инициализира темплейта
    component = fixture.componentInstance;
  });

  it('should show zero as initial state', () => {
    // Initial change detection run
    // First detectChanges call will trigger ngOnInit() and initialize the template
    fixture.detectChanges(); // ще тригерира ngOnInit() ще мине през всички пропъртита и ще се опита да ги попюлейтне в темплейта
    
    const countContent = fixture.debugElement.query(By.css('div'));
    expect(countContent).toBeTruthy();
    expect(countContent.nativeElement.textContent.trim()).toEqual('Current Count: 0');
  });

  it('should trigger action upon clicking increment', () => {
    const store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();

    const incrementButton = fixture.debugElement.query(By.css('[data-id="increment-btn"]'));
    incrementButton.triggerEventHandler('click', {})
    expect(store.dispatch).toHaveBeenCalledWith(increment());
  });

  it('should trigger action upon clicking decrement', () => {
    const store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();

    const decrementButton = fixture.debugElement.query(By.css('[data-id="decrement-btn"]'));
    decrementButton.triggerEventHandler('click', {});
    expect(store.dispatch).toHaveBeenCalledWith(decrement());
  });
  
  it('should trigger action upon clicking reset', () => {
    const store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();

    const resetButton = fixture.debugElement.query(By.css('[data-id="reset-btn"]'));
    resetButton.triggerEventHandler('click', {});
    expect(store.dispatch).toHaveBeenCalledOnceWith(reset());
  });
})