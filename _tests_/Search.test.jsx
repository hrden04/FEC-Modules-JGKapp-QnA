/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Search from '../client/src/components/Search.jsx';

describe('Search Component', () => {
  test('should render the search component on the screen', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper).toExist();
  });

  test('should allow text input', () => {
    const wrapper = shallow(<Search />);
    const testVal = 'test';
    wrapper.find('.search-input').simulate('change', { target: { value: testVal } });
    expect(wrapper.find('.search-input').prop('value')).toBe(testVal);
  });
});
