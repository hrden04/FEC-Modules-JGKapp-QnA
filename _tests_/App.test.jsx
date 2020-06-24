/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import App from '../client/src/components/App.jsx';

const results = {
  message: 'Successfully retrieved questions for product id: 1001',
  questions: [
    {
      question_id: 6,
      question_text: 'Et quisquam voluptas unde illo iure.',
      product_id: 1001,
      created_at: '2020-03-10T06:00:00.000Z',
      user_id: 44,
      question_votes: 7,
    },
    {
      question_id: 11,
      question_text: 'Eos assumenda molestiae odio fugiat enim maiores itaque.',
      product_id: 1001,
      created_at: '2019-11-28T07:00:00.000Z',
      user_id: 23,
      question_votes: 3,
    },
    {
      question_id: 15,
      question_text: 'Voluptatum temporibus mollitia veniam quas molestiae ut nostrum et.',
      product_id: 1001,
      created_at: '2019-08-14T06:00:00.000Z',
      user_id: 19,
      question_votes: 3,
    },
    {
      question_id: 8,
      question_text: 'Vitae quibusdam est hic dolorem ratione distinctio consequuntur.',
      product_id: 1001,
      created_at: '2020-01-21T07:00:00.000Z',
      user_id: 16,
      question_votes: 1,
    },
    {
      question_id: 9,
      question_text: 'Neque odit voluptatum.',
      product_id: 1001,
      created_at: '2019-07-08T06:00:00.000Z',
      user_id: 27,
      question_votes: 0,
    },
    {
      question_id: 17,
      question_text: 'Qui sint voluptate molestiae et eveniet provident quasi quia debitis.',
      product_id: 1001,
      created_at: '2020-02-15T07:00:00.000Z',
      user_id: 11,
      question_votes: 0,
    },
    {
      question_id: 10,
      question_text: 'Voluptas quibusdam repudiandae vel ipsam aperiam eum sed.',
      product_id: 1001,
      created_at: '2019-06-06T06:00:00.000Z',
      user_id: 1,
      question_votes: 0,
    },
    {
      question_id: 5,
      question_text: 'Dolor reprehenderit eligendi doloremque ut.',
      product_id: 1001,
      created_at: '2019-11-11T07:00:00.000Z',
      user_id: 6,
      question_votes: 0,
    },
    {
      question_id: 14,
      question_text: 'Impedit occaecati vel.',
      product_id: 1001,
      created_at: '2019-12-29T07:00:00.000Z',
      user_id: 25,
      question_votes: 0,
    },
    {
      question_id: 12,
      question_text: 'Occaecati est recusandae molestias temporibus consequuntur.',
      product_id: 1001,
      created_at: '2020-04-05T06:00:00.000Z',
      user_id: 44,
      question_votes: 0,
    },
    {
      question_id: 7,
      question_text: 'Ut rerum ipsam neque excepturi laudantium nemo.',
      product_id: 1001,
      created_at: '2019-07-16T06:00:00.000Z',
      user_id: 15,
      question_votes: 0,
    },
    {
      question_id: 13,
      question_text: 'Alias et modi dicta velit sit.',
      product_id: 1001,
      created_at: '2019-09-07T06:00:00.000Z',
      user_id: 28,
      question_votes: 0,
    },
    {
      question_id: 16,
      question_text: 'Laboriosam nesciunt itaque aut aut a.',
      product_id: 1001,
      created_at: '2019-12-08T07:00:00.000Z',
      user_id: 1,
      question_votes: 0,
    },
  ],
};

describe('Main App Component', () => {
  beforeEach(() => {
    axios.get = jest.fn();
    axios.get.mockResolvedValue({ data: results });
    axios.patch = jest.fn();
    axios.patch.mockResolvedValue({ message: 'successfully updated' });
  });

  test('should render the app component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });

  test('should invoke getQuestionsByProductId on componentDidMount', () => {
    const wrapper = shallow(<App />);
    const mock = jest.fn();
    wrapper.instance().getQuestionsByProductId = mock;
    wrapper.instance().forceUpdate();
    wrapper.instance().componentDidMount();
    expect(mock).toHaveBeenCalled();
  });

  test('should render Search and Header Component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Search')).toHaveLength(1);
    expect(wrapper.find('Header')).toHaveLength(1);
  });

  test('should render at least 3 Questions when more than 3 exist', (done) => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    Promise.resolve({})
      .then(instance.componentDidMount.bind(instance))
      .then(() => {
        expect(wrapper.find('Question').length).toBeGreaterThanOrEqual(3);
        done();
      });
  });

  test('should render more or collapse questions when asked', (done) => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    Promise.resolve({})
      .then(instance.componentDidMount.bind(instance))
      .then(() => {
        const originalCount = wrapper.find('Question').length;
        wrapper.find('#show-more-questions').simulate('click');
        const nextCount = wrapper.find('Question').length;
        expect(nextCount).toBeGreaterThan(originalCount);
        wrapper.find('#show-more-questions').simulate('click');
        const lastCount = wrapper.find('Question').length;
        expect(lastCount).toBeGreaterThan(nextCount);
        wrapper.find('#collapse-questions').simulate('click');
        expect(wrapper.find('Question').length).toBe(originalCount);
        done();
      });
  });
});
