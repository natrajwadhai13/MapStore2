/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react/addons');
var Group = require('../Group');

var expect = require('expect');

describe('test Group module component', () => {

    afterEach((done) => {
        React.unmountComponentAtNode(document.body);
        document.body.innerHTML = '';
        setTimeout(done);
    });

    it('test Group creation', () => {
        const layers = [{
            name: 'layer01',
            title: 'Layer 1',
            visibility: true,
            storeIndex: 0,
            type: 'wms',
            group: 'grp'
        }, {
            name: 'layer02',
            title: 'Layer 2',
            visibility: true,
            storeIndex: 1,
            type: 'wms',
            group: ''
        }];

        const group = {
            name: 'grp',
            title: 'Group',
            nodes: layers
        };
        const comp = React.render(<Group node={group}><div/></Group>, document.body);
        expect(comp).toExist();

        const domNode = React.findDOMNode(comp);
        expect(domNode).toExist();

        const children = domNode.children;
        expect(children.length).toBe(2);

        const container = children.item(1);
        expect(container.children.length).toBe(2);
    });

    it('test Group creation with filter', () => {
        const layers = [{
            name: 'layer01',
            title: 'Layer 1',
            visibility: true,
            storeIndex: 0,
            type: 'wms',
            group: 'grp'
        }, {
            name: 'layer02',
            title: 'Layer 2',
            visibility: true,
            storeIndex: 1,
            type: 'wms',
            group: ''
        }];

        const group = {
            name: 'grp',
            title: 'Group',
            nodes: layers
        };
        const comp = React.render(<Group node={group} filter={(layer, node) => layer.group === node.name}><div/></Group>, document.body);
        expect(comp).toExist();

        const domNode = React.findDOMNode(comp);
        expect(domNode).toExist();

        const children = domNode.children;
        expect(children.length).toBe(2);

        const container = children.item(1);
        expect(container.children.length).toBe(1);
    });
});
