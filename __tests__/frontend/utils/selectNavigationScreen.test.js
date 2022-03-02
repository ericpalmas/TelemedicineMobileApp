import {selectNavigationScreen} from '../../../frontend/utils/selectNavigationScreen';

describe('test selectNavigationScreen', () => {
  it('check function selectNavigationScreen is working', () => {
    const questions = [
      {
        answers: [],
        question: {
          slider: false,
          trueFalse: false,
          incrementDecrement: false,
          insertTime: true,
          radio: false,
          check: false,
          open: false,
          _id: '60dd80237649b543c0b02e39',
          text: 'a che ora sei andato a letto?',
          survey: {
            _id: '60afc8ca1193ee3f00223c58',
            name: 'ciaooo mondo',
            description: 'vvvvvvvvv',
            createdAt: '2021-05-27T16:28:58.835Z',
            updatedAt: '2021-05-27T16:28:58.835Z',
            __v: 0,
          },
          createdAt: '2021-07-01T08:43:15.690Z',
          updatedAt: '2021-09-29T08:13:20.213Z',
          __v: 0,
        },
      },
      {
        answers: [],
        question: {
          __v: 0,
          _id: '60dd7fc47649b543c0b02e2b',
          check: false,
          incrementDecrement: false,
          insertTime: false,
          open: true,
          radio: false,
          slider: false,
          trueFalse: false,
          text: 'Come ti chiami?',
          createdAt: '2021-07-01T08:41:40.029Z',
          updatedAt: '2021-09-29T08:11:10.124Z',
        },
      },
      {
        answers: [
          {
            _id: '6154200e024eab54a84503c5',
            text: '',
            question: '60dd80197649b543c0b02e36',
            image: -1,
            selected: false,
            __v: 0,
          },
          {
            _id: '6154200e024eab54a84503c7',
            text: '',
            question: '60dd80197649b543c0b02e36',
            image: -1,
            selected: false,
            __v: 0,
          },
        ],
        question: {
          slider: false,
          trueFalse: true,
          incrementDecrement: false,
          insertTime: false,
          radio: false,
          check: false,
          open: false,
          _id: '60dd80197649b543c0b02e36',
          text: 'ti sei svegliato durante la notte?',
          survey: {
            _id: '60afc8ca1193ee3f00223c58',
            name: 'ciaooo mondo',
            description: 'vvvvvvvvv',
            createdAt: '2021-05-27T16:28:58.835Z',
            updatedAt: '2021-05-27T16:28:58.835Z',
            __v: 0,
          },
          createdAt: '2021-07-01T08:43:05.281Z',
          updatedAt: '2021-09-29T08:13:02.303Z',
          __v: 0,
        },
      },
      {
        answers: [
          {
            _id: '61541ff3024eab54a84503af',
            text: '1',
            question: '60dd80057649b543c0b02e33',
            image: 5,
            selected: false,
            __v: 0,
          },
          {
            _id: '61541ff3024eab54a84503b1',
            text: '10',
            question: '60dd80057649b543c0b02e33',
            image: 5,
            selected: false,
            __v: 0,
          },
        ],
        question: {
          slider: true,
          trueFalse: false,
          incrementDecrement: false,
          insertTime: false,
          radio: false,
          check: false,
          open: false,
          _id: '60dd80057649b543c0b02e33',
          text: 'alcolici assunti in settimana',
          survey: {
            _id: '60afc8ca1193ee3f00223c58',
            name: 'ciaooo mondo',
            description: 'vvvvvvvvv',
            createdAt: '2021-05-27T16:28:58.835Z',
            updatedAt: '2021-05-27T16:28:58.835Z',
            __v: 0,
          },
          createdAt: '2021-07-01T08:42:45.098Z',
          updatedAt: '2021-09-29T08:12:35.808Z',
          __v: 0,
        },
      },
      {
        answers: [
          {
            _id: '61541fbc024eab54a8450383',
            text: 'si',
            question: '60dd7fd77649b543c0b02e2d',
            image: 1,
            selected: false,
            __v: 0,
          },
          {
            _id: '61541fbc024eab54a8450385',
            text: 'no',
            question: '60dd7fd77649b543c0b02e2d',
            image: 4,
            selected: false,
            __v: 0,
          },
        ],
        question: {
          slider: false,
          trueFalse: false,
          incrementDecrement: false,
          insertTime: false,
          radio: true,
          check: false,
          open: false,
          _id: '60dd7fd77649b543c0b02e2d',
          text: 'Hai dormito bene?',
          survey: {
            _id: '60afc8ca1193ee3f00223c58',
            name: 'ciaooo mondo',
            description: 'vvvvvvvvv',
            createdAt: '2021-05-27T16:28:58.835Z',
            updatedAt: '2021-05-27T16:28:58.835Z',
            __v: 0,
          },
          createdAt: '2021-07-01T08:41:59.966Z',
          updatedAt: '2021-09-29T08:11:40.402Z',
          __v: 0,
        },
      },
      {
        answers: [
          {
            _id: '61541fe2024eab54a8450399',
            text: 'alcol',
            question: '60dd7fe87649b543c0b02e30',
            image: 5,
            selected: false,
            __v: 0,
          },
          {
            _id: '61541fe2024eab54a845039b',
            text: 'sigarette',
            question: '60dd7fe87649b543c0b02e30',
            image: 9,
            selected: false,
            __v: 0,
          },
        ],
        question: {
          slider: false,
          trueFalse: false,
          incrementDecrement: false,
          insertTime: false,
          radio: false,
          check: true,
          open: false,
          _id: '60dd7fe87649b543c0b02e30',
          text: 'Ho effettuato qualche sgarro?',
          survey: {
            _id: '60afc8ca1193ee3f00223c58',
            name: 'ciaooo mondo',
            description: 'vvvvvvvvv',
            createdAt: '2021-05-27T16:28:58.835Z',
            updatedAt: '2021-05-27T16:28:58.835Z',
            __v: 0,
          },
          createdAt: '2021-07-01T08:42:16.554Z',
          updatedAt: '2021-09-29T08:12:18.027Z',
          __v: 0,
        },
      },
      {
        answers: [],
        question: {
          __v: 0,
          _id: '60dd7fc47649b543c0b02e2b',
          check: false,
          incrementDecrement: false,
          insertTime: false,
          open: true,
          radio: false,
          slider: false,
          trueFalse: false,
          text: 'Come ti chiami?',
          createdAt: '2021-07-01T08:41:40.029Z',
          updatedAt: '2021-09-29T08:11:10.124Z',
        },
      },
    ];

    const survey = {
      doctorID: '60ac01c8c458a814c89b16de',
      patientID: '60ac01c8c458a814c89b16d5',
      survey: '60afc8ca1193ee3f00223c58',
      questions: questions,
    };

    expect(selectNavigationScreen(1, survey, 'PREV')).toBe('InsertTime');
    expect(selectNavigationScreen(1, survey, 'NEXT')).toBe('TrueFalse');
    expect(selectNavigationScreen(2, survey, 'PREV')).toBe('Open');
    expect(selectNavigationScreen(2, survey, 'NEXT')).toBe('Slider');
    expect(selectNavigationScreen(3, survey, 'NEXT')).toBe('Radio');
    expect(selectNavigationScreen(4, survey, 'NEXT')).toBe('Check');
    expect(selectNavigationScreen(5, survey, 'NEXT')).toBe('Open');
    expect(selectNavigationScreen(6, survey, 'PREV')).toBe('Check');
    expect(selectNavigationScreen(3, survey, 'PREV')).toBe('TrueFalse');
    expect(selectNavigationScreen(4, survey, 'PREV')).toBe('Slider');
  });
});
