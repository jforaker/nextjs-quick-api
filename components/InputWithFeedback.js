import React from 'react';
import { Box, Text } from 'rebass';
import styled from '@emotion/styled';
import { Label, Textarea } from '@rebass/forms';
import { useField } from 'formik';

import Emoji from './Emoji';

const TextareaStyled = styled(Textarea)`
  border-radius: var(--border-radius);
  max-width: 100%;
  min-height: 75px;
  resize: none;
  overflow: hidden;
  border: ${({ showFeedback, error }) =>
    showFeedback
      ? error
        ? 'var(--border-solid) var(--green-comp-red)'
        : 'var(--border-solid) var(--green-tint)'
      : 'var(--border-solid) var(--green-transparent)'};
`;

const autoGrow = (el) => (el.style.height = el.scrollHeight + 'px');

const InputWithFeedback = ({ label, helpText, ...props }) => {
  const [field, meta] = useField(props);

  // Show inline feedback if EITHER the input is focused AND value is longer than 1 character
  // - or, the has been visited (touched === true)
  const ref = React.useRef(null);
  const [didFocus, setDidFocus] = React.useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    (!!didFocus && field.value && field.value.trim().length > 0) ||
    meta.touched;

  React.useEffect(() => {
    ref.current && autoGrow(ref.current);
  }, [field]);

  return (
    <Box>
      <Label htmlFor={props.name} my="20px">
        {label}
      </Label>
      <TextareaStyled
        {...props}
        {...field}
        ref={ref}
        aria-describedby={`${props.name}-feedback ${props.name}-help`}
        onFocus={handleFocus}
        showFeedback={showFeedback}
        error={Boolean(meta.error)}
      />
      <Box
        mt={'20px'}
        minHeight={'46px'}
        id={`${props.name}-feedback`}
        aria-live="polite"
      >
        {showFeedback && (
          <Text fontSize={2}>
            {meta.error ? (
              <>
                <Emoji symbol="🙅" label="Person Gesturing No" /> {meta.error}{' '}
                <Emoji symbol="☝🏻" label="Index Pointing Up" />
              </>
            ) : (
              <Emoji symbol="👌" label="Okay" />
            )}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default InputWithFeedback;
