/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App.jsx';

describe('Main App Component', () => {
  jest.mock('axios', () => {
    const results = {
      message: 'successfully retrieved images',
      images: [
        {
          image_id: 30,
          image_url: 'https://picsum.photos/600/400?random=386',
          product_id: 1001,
        },
        {
          image_id: 31,
          image_url: 'https://picsum.photos/600/400?random=386',
          product_id: 1001,
        },
        {
          image_id: 32,
          image_url: 'https://picsum.photos/600/400?random=386',
          product_id: 1001,
        },
        {
          image_id: 33,
          image_url: 'https://picsum.photos/600/400?random=386',
          product_id: 1001,
        },
        {
          image_id: 34,
          image_url: 'https://picsum.photos/600/400?random=386',
          product_id: 1001,
        },
        {
          image_id: 35,
          image_url: 'https://picsum.photos/600/400?random=386',
          product_id: 1001,
        },
      ],
    };

    return {
      get: jest.fn(() => Promise.resolve({ data: results })),
    };
  });

  test('should render the app component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });

  test('should invoke getImagesById on componentDidMount', () => {
    const wrapper = shallow(<App />);
    const mock = jest.fn();
    wrapper.instance().getImagesById = mock;
    wrapper.instance().forceUpdate();
    wrapper.instance().componentDidMount();
    expect(mock).toHaveBeenCalled();
  });

  test('should render MainImage and ImageList Components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('ImageList')).toHaveLength(1);
    expect(wrapper.find('MainImage')).toHaveLength(1);
  });
});
