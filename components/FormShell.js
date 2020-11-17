import React from 'react';
import { Box, Link } from 'rebass';
import styled from '@emotion/styled';

import FormikWrapper from '../components/FormikWrapper';

const FormBoxOuter = styled(Box)`
  background-color: ${({ theme }) => theme.colors.lightNavy};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  text-decoration-skip-ink: auto;
  position: relative;
  transition: var(--transition);
  cursor: pointer;
  color: var(--green);
`;

export default function FormShell() {
  const [id, setResponse] = React.useState(null);

  return (
    <FormBoxOuter width={1} p={['5px', '10px', '15px']}>
      <FormikWrapper setResponse={setResponse} />
      <Box my="40px">
        {id && (
          <>
            Your API is live at{' '}
            <StyledLink
              href={`${window.location.href}api/objects?id=${id}`}
              target="_blank"
            >
              {window.location.href}api/objects?id=${id}
            </StyledLink>
          </>
        )}
      </Box>
    </FormBoxOuter>
  );
}
