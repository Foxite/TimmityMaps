import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
  EventData,
  FeatureComponent,
  GeoJSONSourceComponent,
  LayerComponent,
  MapComponent
} from '@maplibre/ngx-maplibre-gl';
import {MapMouseEvent} from 'maplibre-gl';

type GeoJSONPoint = [lng: number, lat: number];
type GeoJSONPoly = GeoJSONPoint[];

@Component({
  selector: 'app-root',
  imports: [
    MapComponent,
    LayerComponent,
    GeoJSONSourceComponent,
    FeatureComponent
  ],
  styleUrl: "app.component.scss",
  templateUrl: "app.component.html",
})
export class AppComponent implements AfterViewInit {
  @ViewChild("map") map: MapComponent;
  @ViewChild("polygonSource") polygonSource: GeoJSONSourceComponent;
  @ViewChild("pointSource") pointSource: GeoJSONSourceComponent;

  protected polygons: GeoJSONPoly[] = [];

  protected polygonData: any = { type: "FeatureCollection", features: [] };
  protected pointData: any = { type: "FeatureCollection", features: [] };

  protected polygonPaint = {
    "fill-color": "#ed333b",
    "fill-opacity": 0.5
  };

  protected pointPaint = {
    "circle-color": '#3887be',
    "circle-radius": 10,
  };

  constructor() {
  }

  ngAfterViewInit() {
    this.updatePolygons();
  }

  updatePolygons() {
    this.polygonData = {
      type: "FeatureCollection",
      features: this.polygons.map((polygon, idx) => ({
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [polygon],
          "type": "Polygon"
        },
        "id": idx,
      })),
    };

    this.pointData = {
      type: "FeatureCollection",
      features: this.polygons.flatMap(poly => poly).map((point, idx) => ({
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": point,
          "type": "Point"
        },
        "id": idx,
      })),
    }

    console.log(this.polygons);
    console.log(this.polygonData.features);
    console.log(this.pointData.features);
    console.log("scuh");
  }

  onMapClick(evt: MapMouseEvent & EventData) {
    if (this.polygons.length > 0 && this.polygons[this.polygons.length - 1].length < 4) {
      this.polygons[this.polygons.length - 1].push([evt.lngLat.lng, evt.lngLat.lat]);
    } else {
      this.polygons.push([[evt.lngLat.lng, evt.lngLat.lat]]);
    }

    this.updatePolygons();
  }
}
