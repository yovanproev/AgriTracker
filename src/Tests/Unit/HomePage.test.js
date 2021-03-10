import React from 'react';

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import HomePage from "../../Pages/HomePage/HomePage";

configure({adapter: new Adapter()});

describe('<HomePage />', () => {
    it('should redner home page', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find(HomePage)).toHaveLength(0)
  })
})