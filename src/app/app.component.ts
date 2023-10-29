import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private activatedRoute: ActivatedRoute | null) {

  }

  title = 'Angular - Form input value cross validator';
  routeSubscription!: Subscription;

  setTitle() {

    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute;
      while (route && route.firstChild) {
        route = route.firstChild;
      }
      route?.snapshot.data['title'] ? this.title = route.snapshot.data['title'] : '';
    });
  }

  ngOnInit(): void {
    this.setTitle();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
