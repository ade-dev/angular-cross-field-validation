import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router, RouterLink, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { appConfig } from './app.config';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule(Object.assign({}, appConfig, {
      imports: [AppComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([{ path: '**', component: AppComponent }])
      ]
    }))
      .compileComponents()
      .then(async () => {
        harness = await RouterTestingHarness.create();
        appComponent = await harness.navigateByUrl('/', AppComponent);
        harness.detectChanges();
      });
  });

  it('should create an instance of the app', () => {
    expect(appComponent).toBeInstanceOf(AppComponent);
  });

  it('should get RouterLinks from template', () => {
    const linkItems = harness.routeNativeElement?.querySelectorAll('a') as unknown as HTMLAnchorElement[];
    expect(linkItems.length).toBe(2);
    expect(linkItems[0].getAttribute('routerLink')).toBe('/reactive-form');
    expect(linkItems[1].getAttribute('routerLink')).toBe('/template-driven-form');
  });

  it('should activate RouterLinks', async () => {
    const linkElms = harness.routeDebugElement?.queryAll(By.directive(RouterLink));
    await linkElms![0].triggerEventHandler('click', { button: 0, });
    expect(TestBed.inject(Router).url).toEqual('/reactive-form');

    await linkElms![1].triggerEventHandler('click', { button: 0, });
    expect(TestBed.inject(Router).url).toEqual('/template-driven-form');
  });
});