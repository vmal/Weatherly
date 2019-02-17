import React from 'react';
import {shallow} from 'enzyme';
import Text from '../components/Text';

const wrapper = shallow(<Text/>);
describe('test Text Component',()=>{
    it('should be defined',()=>{
        expect(Text).toBeDefined();
    });

    it('test setTemperatureDetails function',()=>{
        wrapper.instance().setTemperatureDetails(30,1,'nyc');
        expect(wrapper.state().currentTemp).toBe(30);
        expect(wrapper.state().currentHumidity).toBe(1);
        expect(wrapper.state().cityName).toBe('nyc');
    });

    it('test getCache function',()=>{
        wrapper.instance().setCache(30,1,'nyc');
        expect(typeof (wrapper.instance().getCache())).toBe('string');
        expect(wrapper.instance().getCache()).toBe("{\"currentTemp\":30,\"currentHumidity\":1,\"cityName\":\"nyc\"}")
    });

    it('should test setCache function',()=>{
        wrapper.instance().setCache(30,1,'nyc');
        expect(wrapper.instance().getCache()).toBe("{\"currentTemp\":30,\"currentHumidity\":1,\"cityName\":\"nyc\"}")
    });

    it('should test the getWeatherInformation API',async ()=>{
        const res = await wrapper.instance().getWeatherInformation('Los Angeles')
        expect(typeof (res)).toBe('object');
        expect(res.data.name).toBe('Los Angeles');
    });

    it('should test setInitial function when cache is set',()=>{
        wrapper.instance().setCache(30,1,'nyc');
        wrapper.instance().setInitialState();
        expect(wrapper.state().currentTemp).toBe(30);
        expect(wrapper.state().currentHumidity).toBe(1);
        expect(wrapper.state().cityName).toBe('nyc');
    });

    it('should test setInitial function when cache is not set',()=>{
        wrapper.instance().clearCache();
        wrapper.instance().setInitialState();
        expect(wrapper.state().currentTemp).not.toBe(30);
        expect(wrapper.state().currentHumidity).not.toBe(1);
        expect(wrapper.state().cityName).not.toBe('nyc');
        expect(wrapper.state().currentTemp).toBe(0);
        expect(wrapper.state().currentHumidity).toBe(null);
        expect(wrapper.state().cityName).toBe('');
    });

    it('should test handleInput function',()=>{
        wrapper.find('input').simulate("change", { target: { value: "foo" }})
        expect(wrapper.state().inputName).toBe('foo');
    })

});