// Imports
import { Point, Circle } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';

// Point creator
function makePoint(coords, name) {

    // Create a point
    const point = new Circle(fromLonLat(coords), 60);

    // Create the feature for the circle
    const feature = new Feature({
        "geometry": point,
        "label": name
    });

    // Create a style 
    const style = new Style({
        text: new Text({
            text: feature.get('label'), // get the label from the feature
            font: '12px Arial',
            fill: new Fill({ color: 'black' }),
            stroke: new Stroke({ color: 'white', width: 3 }),
            offsetX: 0,
            offsetY: -15,
        }),
        stroke: new Stroke({
            color: 'black',
            width: 1,
        }),
        fill: new Fill({
            color: 'rgba(0, 255, 0, 1.0)',
        }),
    });

    // Set the style for the feature
    feature.setStyle(style);

    // Return the feature
    return feature;

}

export default makePoint;