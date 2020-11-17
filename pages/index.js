import React from 'react';
import Head from 'next/head';
import { Box, Text } from 'rebass';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HelpIcon from '@material-ui/icons/Help';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import FormShell from '../components/FormShell';
import theme from '../styles/theme';

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

export default function Home() {
  const [isOpen, setisOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const handleDialog = () => setisOpen(!isOpen);

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const one = (
    <Title margin="1em 0">
      quick api{' '}
      <HelpIcon className="mui-pink" color="secondary" onClick={handleDialog} />
    </Title>
  );

  const two = <FormShell />;

  return (
    <HomeContainer>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dialog
        open={isOpen}
        onClose={handleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'react-quick-api'}</DialogTitle>
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

      <ThemeProvider theme={theme}>
        <Box sx={{ maxWidth: '80%', mx: 'auto', px: 3 }}>
          <TransitionGroup component={null}>
            {isMounted &&
              [one, two].map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={2000}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        </Box>
      </ThemeProvider>
    </HomeContainer>
  );
}
