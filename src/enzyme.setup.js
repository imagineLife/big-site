import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

//mock fetch in jest tests
global.fetch = require('jest-fetch-mock');

Enzyme.configure({
  adapter: new Adapter(),
});