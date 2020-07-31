import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('MENU');
  }

  ngOnInit(): void {
  }
}
