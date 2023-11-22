import { TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { Router, RouterLink, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { appConfig } from './app.config';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let harness: RouterTestingHarness;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(Object.assign({}, appConfig, {
      imports: [AppComponent],
      providers: [
        provideRouter([{ path: '**', component: AppComponent }])
      ]
    }))
      .compileComponents()
      .then(async () => {
        harness = await RouterTestingHarness.create();
        appComponent = await harness.navigateByUrl('/', AppComponent);
        harness.detectChanges();
      });
  }));

  it('should create an instance of the app', () => {
    expect(appComponent).toBeInstanceOf(AppComponent);
  });

  it('should get RouterLinks from template', () => {
    const linkItems = harness.routeNativeElement?.querySelectorAll('a') as unknown as HTMLAnchorElement[];
    expect(linkItems.length).toBe(2);
    expect(linkItems[0].getAttribute('routerLink')).toBe('/reactive-form');
    expect(linkItems[1].getAttribute('routerLink')).toBe('/template-driven-form');
  });

  it('should activate RouterLinks', fakeAsync(() => {
    const linkElms = harness.routeDebugElement?.queryAll(By.directive(RouterLink));
    linkElms![0].triggerEventHandler('click', { button: 0, });
    tick();
    expect(TestBed.inject(Router).url).toEqual('/reactive-form');

    linkElms![1].triggerEventHandler('click', { button: 0, });
    tick();
    expect(TestBed.inject(Router).url).toEqual('/template-driven-form');
  }));

  it('should render correct page heading', () => {
    appComponent.pageHeading = 'Angular - Reactive form input value cross-validation';
    harness.detectChanges();
    const heading = harness.routeNativeElement?.querySelector('h1');
    expect(heading?.textContent).toContain('Angular - Reactive form input value cross-validation');
  });
});