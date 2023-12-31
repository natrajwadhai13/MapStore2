/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';

import BaseMap from '../BaseMap';
import mapType from '../enhancers/mapType';
const TestMap = mapType(BaseMap);

const LAYER_OSM = {
    "id": "mapnik__1",
    "group": "background",
    "source": "osm",
    "name": "mapnik",
    "title": "Open Street Map",
    "type": "osm",
    "visibility": true,
    "singleTile": false,
    "dimensions": [],
    "hideLoading": false,
    "handleClickOnLayer": false
};
const VECTOR_SAMPLE = {
    "id": "annotations",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "title": "Pino",
                "id": "25cbbbb0-1625-11e8-a091-639e3ca0149f"
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                -9.272079296695848,
                                25.633162709158384
                            ],
                            [
                                0.17443093439845475,
                                38.01066790632649
                            ],
                            [
                                11.823370741927429,
                                17.650189135909482
                            ],
                            [
                                -9.272079296695848,
                                25.633162709158384
                            ]
                        ]
                    ]
                ]
            },
            "style": {
                "type": "MultiPolygon",
                "MultiPolygon": {
                    "color": "#ffcc33",
                    "opacity": 1,
                    "weight": 3,
                    "fillColor": "#ffffff",
                    "fillOpacity": 0.2,
                    "editing": {
                        "fill": 1
                    }
                },
                "Polygon": {
                    "color": "#ffcc33",
                    "opacity": 1,
                    "weight": 3,
                    "fillColor": "#ffffff",
                    "fillOpacity": 0.2,
                    "editing": {
                        "fill": 1
                    }
                },
                "highlight": false
            }
        }
    ],
    "name": "Annotations",
    "style": {
        "type": "MultiPolygon",
        "MultiPolygon": {
            "color": "#ffcc33",
            "opacity": 1,
            "weight": 3,
            "fillColor": "#ffffff",
            "fillOpacity": 0.2,
            "editing": {
                "fill": 1
            }
        },
        "Polygon": {
            "color": "#ffcc33",
            "opacity": 1,
            "weight": 3,
            "fillColor": "#ffffff",
            "fillOpacity": 0.2,
            "editing": {
                "fill": 1
            }
        }
    },
    "type": "vector",
    "visibility": true,
    "singleTile": false,
    "dimensions": [

    ],
    "hideLoading": true,
    "handleClickOnLayer": true
};
const SAMPLE_LAYERS_1 = [LAYER_OSM, VECTOR_SAMPLE];

describe('BaseMap', () => {

    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('test openlayers map', (done) => {
        const map = ReactDOM.render(<TestMap
            mapType="openlayers"
            id="myMap"
            layers={SAMPLE_LAYERS_1}
            onMapTypeLoaded={() => {
                expect(map).toBeTruthy();
                const el = ReactDOM.findDOMNode(map);
                expect(el).toBeTruthy();
                expect(el.id).toBe("myMap");
                expect(el.querySelector('.ol-viewport')).toBeTruthy();
                done();
            }}
        />, document.getElementById("container"));
    });
    it('test leaflet map', (done) => {
        const map = ReactDOM.render(<TestMap
            mapType="leaflet"
            id="myMap"
            layers={SAMPLE_LAYERS_1}
            onMapTypeLoaded={() => {
                expect(map).toBeTruthy();
                const el = ReactDOM.findDOMNode(map);
                expect(el).toBeTruthy();
                expect(el.id).toBe("myMap");
                expect(el.querySelector('div')).toBeTruthy();
                done();
            }}
        />, document.getElementById("container"));
    });
    it('test cesium map', (done) => {
        const map = ReactDOM.render(<TestMap
            mapType="cesium"
            id="myMap"
            layers={SAMPLE_LAYERS_1}
            onMapTypeLoaded={() => {
                expect(map).toBeTruthy();
                const el = ReactDOM.findDOMNode(map);
                expect(el).toBeTruthy();
                expect(el.id).toBe("myMap");
                expect(el.querySelector('canvas')).toBeTruthy();
                done();
            }}
        />, document.getElementById("container"));
    });
    it('should allow children as tools', (done) => {
        function MapTool({ map }) {
            return map ? <div id="map-tool"></div> : null;
        }
        ReactDOM.render(
            <TestMap
                mapType="leaflet"
                id="myMap"
                layers={SAMPLE_LAYERS_1}
                onMapTypeLoaded={() => {
                    const mapToolNode = document.querySelector('#map-tool');
                    expect(mapToolNode).toBeTruthy();
                    done();
                }}
            >
                <MapTool />
            </TestMap>, document.getElementById("container"));
    });
});
