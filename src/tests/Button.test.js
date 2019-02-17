import React from 'react';
import {shallow} from 'enzyme';
import Button from '../components/Button';

describe('test button component',()=>{
    it('should be defined', () => {
        expect(Button).toBeDefined();
    });

    it('should render correctly', () => {
        const tree = shallow(
            <Button name='Set Location' />
        );
        expect(tree).toMatchSnapshot();
    });

    it('should test the click event',()=>{
        const mockCallBack = jest.fn();
        const tree = shallow(<Button onClick={mockCallBack} name='Set Location'/>);
        tree.find('input').simulate('click');
        expect(mockCallBack).toHaveBeenCalled();
    });

    it('should have the button value',()=>{
        const tree = shallow(<Button name="Test"/>);
        expect(typeof(tree.find('input').props().value)).toBe('string');
        expect(tree.find('input').props().value).toBe('Test');
    });
});