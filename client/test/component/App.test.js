import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import App from '../../components/App';
import NavigationBar from '../../components/shared/NavigationBar';
import FooterPage from '../../components/shared/FooterPage';

describe('Component: App', () => {
  it('should render without crashing', () => {
    shallow(<App />);
  });

  it('should render Component: NavigationBar', () => {
    const wrapper = shallow(<App />);
    const navbar = <NavigationBar />;
    expect(wrapper.contains(navbar)).toEqual(true);
  });

  it('should render Component: FooterPage', () => {
    const mainApp = shallow(<App />);
    const footer = <FooterPage />;
    expect(mainApp.contains(footer)).toEqual(true);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <App>
        <NavigationBar />
        <FooterPage />
      </App>
    );
    expect(wrapper.contains(<NavigationBar />)).toEqual(true);
    expect(wrapper.contains(<FooterPage />)).toEqual(true);
  });
});
