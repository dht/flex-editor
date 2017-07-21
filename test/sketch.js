import expect from 'expect'
import {identify_sketch, transform_sketch} from '../src/_utils/sketch'
import {mock_sketch_1, mock_non_sketch_1} from './mocks/sketch'

describe('sketch transformation', function () {

    it('should properly identify a sketch clipboard', function () {
        const result = identify_sketch(mock_sketch_1);

        expect(result).toEqual(true);
    })

    it('should properly identify a non sketch clipboard', function () {
        const result = identify_sketch(mock_non_sketch_1);

        expect(result).toEqual(false);
    })

    it('should properly transform a sketch clipboard to state', function () {
        const result = transform_sketch(mock_sketch_1)

        expect(result).toEqual({
            fontFamily: 'Museo Sans',
            fontWeight: 300,
            fontSize: '28px',
            color: '#6D6D6D',
            lineHeight: '42px'
        });
    })

    it('should properly transform a non sketch clipboard to false', function () {
        const result = transform_sketch(mock_non_sketch_1);

        expect(result).toEqual(false);
    })

});