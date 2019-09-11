import moment from 'moment';

export default [
  {
    text: '오늘',
    start: moment(),
    end: moment()
  },
  {
    text: '어제',
    start: moment().add(-1, 'day'),
    end: moment().add(-1, 'day')
  },
  {
    text: '이번달',
    start: moment().startOf('month'),
    end: moment().endOf('month')
  },
  {
    text: '전월',
    start: moment()
      .add(-1, 'month')
      .startOf('month'),
    end: moment()
      .add(-1, 'month')
      .endOf('month')
  },
  {
    text: '전전월',
    start: moment()
      .add(-2, 'month')
      .startOf('month'),
    end: moment()
      .add(-2, 'month')
      .endOf('month')
  },
  {
    text: '최근 7일',
    start: moment().add(-7, 'day'),
    end: moment().add(-1, 'day')
  },
  {
    text: '최근 30일',
    start: moment().add(-30, 'day'),
    end: moment().add(-1, 'day')
  },
  {
    text: '최근 90일',
    start: moment().add(-90, 'day'),
    end: moment().add(-1, 'day')
  },
  {
    text: '최근 180일',
    start: moment().add(-180, 'day'),
    end: moment().add(-1, 'day')
  }
];
