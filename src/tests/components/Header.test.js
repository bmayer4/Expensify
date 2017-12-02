//we have shallow rendering (only renders given component) and full dom rendering (renders child components)
//import ReactShallowRenderer from 'react-test-renderer/shallow';  //from commnand line, yarn add react-test-renderer
import React from 'react';
import Header from '../../components/Header';  //yarn add enzyme, yarn add enzyme-adapter-react-16, yarn add raf
import { shallow } from 'enzyme';
 //yarn add enzyme-to-json, used this in jest.config.json


// test('should render Header correctly', () => {
//     const renderer = new ReactShallowRenderer();
//     renderer.render(<Header />);
//     expect(renderer.getRenderOutput()).toMatchSnapshot();

//     console.log(renderer.getRenderOutput());
// });

//not using above since using enzyme now. good for components


//after snapshot, if anything inside the component changes, test will fail (unless we accept)
test('should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    // expect(wrapper.find('h1').text()).toBe('Expensify');
    expect(wrapper).toMatchSnapshot();     
});


