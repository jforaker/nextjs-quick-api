import React from 'react';
import { Box, Flex } from 'rebass';
import styled from '@emotion/styled';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';

import InputWithFeedback from './InputWithFeedback';
import styles from '../styles/Btn.module.css';

const BtnBase = styled.button`
  color: ${({ theme }) => theme.colors.slate};
`;

const Submit = styled(BtnBase)`
  border: var(--border-solid) var(--green);
`;

const Reset = styled(Submit)`
  border: none:
`;

const Spinner = () => <CircularProgress className="mui-pink" size="1em" />;

const FormikWrapper = (props) => {
  return (
    <Formik
      initialValues={{ sample: '' }}
      validationSchema={Yup.object({
        sample: Yup.string()
          .min(1, 'Must b1 at least 1 character')
          .max(50000, 'Must be less than 50,000 characters')
          .required('Required')
          .test('isJSON', 'Must be valid JSON', (str) => {
            try {
              JSON.parse(str);
            } catch (e) {
              return false;
            }
            return true;
          }),
      })}
      onSubmit={async ({ sample }) => {
        try {
          const response = await fetch('/api/objects', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sample),
          });

          if (!response.ok) {
            throw response;
          } else {
            const { id } = await response.json();
            props.setResponse(id);
          }
        } catch (err) {
          if (err.text) {
            err.text().then((message) => {
              alert(message);
            });
          } else {
            const message = typeof err === 'string' ? err : 'Error'; // 413 Body exceeded limit
            alert(message);
          }
        }
      }}
    >
      {({ values, errors, isSubmitting }) => (
        <Form>
          <InputWithFeedback
            name="sample"
            label="paste or type your JSON blob here"
          />
          <Flex
            alignItems="center"
            justifyContent="space-between"
            width={[1, 1 / 2, 1 / 3]}
          >
            <Submit
              className={styles.btn}
              type="submit"
              disabled={
                values.sample === '' || Boolean(errors.sample) || isSubmitting
              }
            >
              Submit
            </Submit>
            <Box>{isSubmitting && <Spinner />}</Box>
            <Box>
              {values.sample !== '' && (
                <Reset type="reset" className={styles.btn}>
                  Reset
                </Reset>
              )}
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default FormikWrapper;
