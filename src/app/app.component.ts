import { Component, signal } from '@angular/core';
import {MapComponent} from '@maplibre/ngx-maplibre-gl';
import {AnimationOptions} from 'maplibre-gl';

@Component({
  selector: 'app-root',
  imports: [
    MapComponent
  ],
  template: `
    <mgl-map
      [style]="'maputnik_layout_tim.json'"
      [zoom]="[7.56]"
      [center]="[5.522, 52.187]"
    ></mgl-map>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
        position: relative;
      }

      mgl-map {
        flex: 1;
      }
    `
  ]
})
export class AppComponent {
  constructor() {
  }
}
