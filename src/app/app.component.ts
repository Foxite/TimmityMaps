import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {GeoJSONSourceComponent, LayerComponent, MapComponent} from '@maplibre/ngx-maplibre-gl';

type GeoJSONPoint = [number, number];
type GeoJSONPoly = GeoJSONPoint[];

@Component({
  selector: 'app-root',
  imports: [
    MapComponent,
    LayerComponent,
    GeoJSONSourceComponent
  ],
  styleUrl: "app.component.scss",
  templateUrl: "app.component.html",
})
export class AppComponent implements AfterViewInit {
  @ViewChild("map") map: MapComponent;

  private polygons: GeoJSONPoly[] = [
    [
      [
        4.773313152747079,
        52.17415752180844
      ],
      [
        5.99892798556624,
        52.17415752180844
      ],
      [
        5.99892798556624,
        52.57198095428873
      ],
      [
        5.773313152747079,
        52.67198095428873
      ],
      [
        4.773313152747079,
        52.57198095428873
      ],
      [
        4.773313152747079,
        52.17415752180844
      ]
    ],
    [
      [
        5.588614383359101,
        52.054674643054
      ],
      [
        5.789826055721136,
        52.09884477892396
      ],
      [
        5.6487116347194615,
        52.11618360391003
      ],
      [
        5.549938746937926,
        52.16094724576777
      ],
      [
        5.470408095975074,
        52.15090274343086
      ],
      [
        5.350053572716689,
        52.12058549899234
      ],
      [
        4.969884495202393,
        52.083597915308786
      ],
      [
        4.967531877151998,
        51.99242563642747
      ],
      [
        5.219260901970927,
        51.79642988366544
      ],
      [
        5.633319858683194,
        51.79642988366544
      ],
      [
        5.8097425336798665,
        51.97359404155557
      ],
      [
        5.588614383359101,
        52.054674643054
      ]
    ]
  ]

  protected geojsonData: any = {
    type: "FeatureCollection",
    features: []
  }

  protected readonly geojsonPaint = {
    "fill-color": "#ed333b",
    "fill-opacity": 0.5
  }

  constructor() {
  }

  ngAfterViewInit() {
    this.geojsonData.features = this.polygons.map((polygon, idx) => ({
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [polygon],
          "type": "Polygon"
        },
        "id": idx
    }));
  }
}
