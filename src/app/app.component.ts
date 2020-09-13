import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular - Form input value cross validator';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.subscribe(event => {
      // Setting page heading
      if (event instanceof NavigationEnd) {
        let child: ActivatedRoute | null = this.activatedRoute.firstChild;
        while (child && child.firstChild) {
          child = child.firstChild;
        }
        if (child?.snapshot.data['title']) {
          this.title = child.snapshot.data['title'];
        }
      }
    });
  }
}
