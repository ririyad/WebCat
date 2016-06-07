import { Component } from '@angular/core';
import { ANGULAR2_GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

@Component({
    selector: 'track-order',
    templateUrl : 'app/trackOrder/trackOrder.component.html',
    styleUrls : ['app/trackOrder/trackOrder.component.css'],
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES]
})

export class TrackOrderComponent{
    lat: number = 51.678418;
    lng: number = 7.809007;
}