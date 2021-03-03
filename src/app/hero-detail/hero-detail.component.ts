import { Component, OnInit, Input } from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../hero.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;

  constructor(private activeRoute: ActivatedRoute,
              private heroService: HeroService,
              private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // tslint:disable-next-line:no-non-null-assertion
    const id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

}
