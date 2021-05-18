import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkDirectiveStub } from '../tests/router-link-directive-stub';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('AppComponent', () => {
  let route: ActivatedRoute;
  let appComponent: AppComponent;
  let app: ComponentFixture<AppComponent>;
  let linkElms;
  let routerLinks: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers:
        [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: { data: { title: 'Angular - Reactive form input value cross-validation' } }
            }
          }
        ]
    }).compileComponents();

    route = TestBed.inject(ActivatedRoute);

  }));

  beforeEach(() => {
    app = TestBed.createComponent(AppComponent);
    appComponent = app.componentInstance;
    appComponent.title = route.snapshot.data.title;
    app.detectChanges();

    // Find DebugElements with an attached RouterLinkStubDirective
    linkElms = app.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));

    // Using each DebugElement's injector
    routerLinks = linkElms.map(el => el.injector.get(RouterLinkDirectiveStub));
  });

  it('Should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(2, 'should have 2 routerLinks');
    expect(routerLinks[0].linkParams).toBe('/reactive-form');
    expect(routerLinks[1].linkParams).toBe('/template-driven-form');
  });

  it("Should have 'route.snapshot.data.title' as title", () => {
    expect(appComponent.title).toEqual('Angular - Reactive form input value cross-validation');
  });

  it('Should render title', () => {
    const compiled = app.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Angular - Reactive form input value cross-validation');
  });
});
