import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  pageHeading = 'Angular - Form input value cross validator';
  routeSubscription!: Subscription;

  setTitle() {
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute;
      while (route && route.firstChild) {
        route = route.firstChild;
      }
      if (route?.snapshot.data['title']) {
        this.pageHeading = route.snapshot.data['title'];
      }
    });
  }

  ngOnInit(): void {
    this.setTitle();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
