/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../client/src/components/Header.jsx';


describe('Header Component', () => {
  test('should render the header component on the screen', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toExist();
  });
});
