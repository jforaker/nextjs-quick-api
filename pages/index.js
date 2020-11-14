import Head from 'next/head';
import { Box, Card, Image, Heading, Text } from 'rebass';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import HelpIcon from '@material-ui/icons/Help';

import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

import preset from '@rebass/preset';

import styles from '../styles/Home.module.css';
import Search from '../components/Search';

const ACCENT = '#64ffda';
const DARK_BG = '#020c1b';
const BG = '#0a192f';

const theme = {
  colors: {
    darkNavy: DARK_BG,
    navy: BG,
    lightNavy: '#172a45',
    lightestNavy: '#303C55',
    slate: '#8892b0',
    lightSlate: '#a8b2d1',
    lightestSlate: '#ccd6f6',
    white: '#e6f1ff',
    green: ACCENT,
    greenTint: 'rgba(100, 255, 218, 0.07)',
    greenTransparent: '#64ffd5ad',
    pink: '#b61aae',
    // transGreen: hex2rgba(ACCENT, 0.07),
    // shadowNavy: hex2rgba(DARK_BG, 0.7),
  },

  fonts: {
    Calibre:
      'Calibre, San Francisco, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Roboto, Helvetica Neue, Segoe UI, Arial, sans-serif',
    SFMono:
      'SF Mono, Fira Code, Fira Mono, Roboto Mono, Lucida Console, Monaco, monospace',
  },

  fontSizes: [14, 16, 18, 20, 24],

  bp: {
    mobileS: `max-width: 330px`,
    mobileM: `max-width: 400px`,
    mobileL: `max-width: 480px`,
    tabletS: `max-width: 600px`,
    tabletL: `max-width: 768px`,
    desktopXS: `max-width: 900px`,
    desktopS: `max-width: 1080px`,
    desktopM: `max-width: 1200px`,
    desktopL: `max-width: 1400px`,
  },

  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',

  borderRadius: '4px',
  navHeight: '100px',
  navScrollHeight: '70px',
  margin: '20px',

  tabHeight: 42,
  tabWidth: '120px',
  radius: 4,

  hamburgerWidth: '30px',
  hamBefore: `top 0.1s ease-in 0.25s, opacity 0.1s ease-in`,
  hamBeforeActive: `top 0.1s ease-out, opacity 0.1s ease-out 0.12s`,
  hamAfter: `bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
  hamAfterActive: `bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s`,

  // mixins,
};

const HomeContainer = styled.main`
  min-height: 100vh;
  padding: 0 0.5rem;
  font-family: inherit;
`;

const Title = styled(Text)`
  color: var(--green);
  margin: 1em 0;
  font-size: 2em;
`;

let SomeComp = styled.div({
  color: 'hotpink',
});

let AnotherComp = styled.div`
  color: ${(props) => {
    return props.color;
  }};
`;

export default function Home() {
  return (
    <HomeContainer>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <Box sx={{ maxWidth: '80%', mx: 'auto', px: 3 }}>
          <Dialog
            open={false}
            // onClose={this.handleRequestClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'react-quick-api'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                paste in a sample response to generate a quick JSON api (must be
                valid JSON!)
              </DialogContentText>
              <DialogContentText id="alert-dialog-ex">
                For example:
                <br />
                {'{"foo": "bar"}'}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Title>
            quick api{' '}
            <HelpIcon
              className="help"
              color="secondary"
              // onClick={this.handleTouchTap}
            />
          </Title>
          <Search />
        </Box>
      </ThemeProvider>
    </HomeContainer>
  );
}
