import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ParentComponent implements OnInit {
  user: {};
  title: string;

  constructor(private RouterNav: Router) {
    this.title = '';
  }

  ngOnInit(): void {
  }

  setTitle($event: any) {
    if ($event.title && $event.title instanceof Title) {
      this.title = ($event.title as Title).getTitle();
    }
  }
}
