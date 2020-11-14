import React, { Component } from 'react';
// import TextField from "@material-ui/core/TextField";
import { Box, Card, Button, Flex, Heading, Text } from 'rebass';
import styled from '@emotion/styled';
import * as Yup from 'yup';

// import Button from '@material-ui/core/Button';
import {
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

// import Paper from '@material-ui/core/Paper';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Generated from './Generated';
// import { post, get } from './Client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormikProvider, Formik, useFormik, Field, Form, ErrorMessage, useField } from 'formik';
import { TextField } from 'formik-material-ui';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const FooField = styled(TextField)`
  textarea {
    color: white;
  }
  label {
    color: ${({ theme }) => theme.colors.lightSlate};
  }
  & label.Mui-focused {
    color: ${({ theme }) => theme.colors.lightestSlate};
  }

  & .MuiInput-underline:after {
    border-bottom-color: ${({ theme }) => theme.colors.green};
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${({ theme }) => theme.colors.green};
    }
    &:hover fieldset {
      border-color: ${({ theme }) => theme.colors.greenTransparent};
    }
    &.Mui-focused fieldset {
      border-color: ${({ theme }) => '#b61aae'};
    }
  }
`;

const Spinner = () => (
  <div style={{ marginLeft: 30 }}>
    <CircularProgress />
  </div>
);

const FormBoxOuter = styled(Box)`
  background-color: ${({ theme }) => theme.colors.lightNavy};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Submit = styled(Button)`
  color: ${({ theme }) => theme.colors.slate};
  background-color: transparent;
  border: var(--border-solid) var(--green);
  border-radius: var(--border-radius);
  padding: 1.25rem 1.75rem;
  font-size: var(--fz-sm);
  font-family: var(--font-mono);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  &:hover,
  &:focus,
  &:active {
    background-color: var(--green-tint);
  }
  &:after {
    display: none !important;
  }
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
  &:disabled:hover {
    border: var(--border-solid) var(--green-transparent);
    border-radius: var(--border-radius);
    font-style: italic;
  }
`;

//#172a45

const TextInputLiveFeedback = ({ label, helpText, ...props }) => {
  const [field, meta] = useField(props);

  // Show inline feedback if EITHER
  // - the input is focused AND value is longer than 2 characters
  // - or, the has been visited (touched === true)
  const [didFocus, setDidFocus] = React.useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    (!!didFocus && field.value && field.value.trim().length > 2) || meta.touched;

  return (
    <div
      className={`form-control ${
        showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
      }`}
    >
      <div className="flex items-center space-between">
        <label htmlFor={props.id}>{label}</label>{' '}
        {showFeedback ? (
          <div
            id={`${props.id}-feedback`}
            aria-live="polite"
            className="feedback text-sm"
          >
            {meta.error ? meta.error : '✓'}
          </div>
        ) : null}
      </div>
      <input
        {...props}
        {...field}
        aria-describedby={`${props.id}-feedback ${props.id}-help`}
        onFocus={handleFocus}
      />
      <div className="text-xs" id={`${props.id}-help`} tabIndex="-1">
        {helpText}
      </div>
    </div>
  );
};
///

function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

const Example = () => {
  const formik = useFormik({
    initialValues: {
      sample: '',
    },
    onSubmit: async (values) => {
      await sleep(500);
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
      sample: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .max(20000, 'Must be less than 20,000 characters')
        .required('required')
        .test('isJSON','is not isJsonString',
          isJsonString,
          
        ),
    }),
    // validate: (values) => {
    //   console.log('values', values)
    //   const errors = {};
    //   if (!values.sample) {
    //     errors.sample = 'Required!';
    //   } else {
    //     try {
    //       JSON.parse(values.sample);
    //     } catch (err) {
    //       errors.sample = 'Invalid JSON!';
    //     }
    //   }
    //   return errors;
    // }
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <TextInputLiveFeedback
          label="sample"
          id="sample"
          name="sample"
          helpText="Must be 8-20 characters and cannot contain special characters."
          type="text"
        />
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </Form>
    </FormikProvider>
  );
};

const EM = () => {
  return (
    <Box minHeight="42px" sx={{ display: 'flex', alignItems: 'center' }}>
      <Text fontSize={2}>EM Invalid!</Text>
    </Box>
  );
};

export default function Search() {
  return (
    <FormBoxOuter width={1} p={['5px', '10px', '15px']}>

<Example />

      {/* <Formik
        initialValues={{
          sample: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.sample) {
            errors.sample = 'Required!';
          } else {
            try {
              JSON.parse(values.sample);
            } catch (err) {
              errors.sample = 'Invalid JSON!';
            }
          }
          return errors;
        }}
        // validationSchema={Yup.object().shape({
        //   sample: Yup.string().min(2, 'Too Short!')
        //   .max(15000, 'Too Long!')
        //   .required('Required'),
          
        // })}
        onSubmit={async (values) => {
          await sleep(500);
          alert(JSON.stringify(values, null, 2));
        }}
        validateOnChange
        validateOnBlur
      >
        {({ touched, values, errors, isSubmitting }) => (
          <Form>
             <Field
              component={FooField}
              name="sample"
              variant="outlined"
              multiline
              style={{ width: '100%', color: 'white' }}
              label='Paste your sample response. For example: {"foo": "bar""}'
            /> 

<TextInputLiveFeedback
          label="Username"
          id="username"
          name="username"
          helpText="Must be 8-20 characters and cannot contain special characters."
          type="text"
        />


            <Box
              minHeight="42px"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {Boolean(errors.sample) && touched.sample && <Text fontSize={2}>Invalid!</Text>}
            </Box>

            <Flex>
              <Submit
                type="submit"
                disabled={
                  values.sample === '' || Boolean(errors.sample) || isSubmitting
                }
              >
                Submit
              </Submit>
              {isSubmitting && <Spinner />}
            </Flex>
          </Form>
        )}
      </Formik> */}

      <Box>
        {/* {this.state.generatedUrl && (
              <Generated
                generatedUrl={this.state.generatedUrl}
                reset={this.reset}
              />
            )} */}
      </Box>
    </FormBoxOuter>
  );
}

// class Search2 extends Component {
//   state = {
//     json: null,
//     searchValue: '',
//     errorText: null,
//     generatedUrl: null,
//     loading: false,
//   };

//   reset = () => this.setState({ generatedUrl: null });

//   handleSearchChange = (e) => {
//     const value = e.target.value;
//     this.validate(value);
//   };

//   handleSubmit = () => {
//     this.validate(this.state.searchValue);
//     this.setState({ loading: true }, () => {
//       post(this.state.searchValue)
//         .then((val) => {
//           if (val === 'invalid json') return;
//           return get(val.id);
//         })
//         .then(({ data, generatedUrl }) => {
//           this.setState({
//             data,
//             generatedUrl,
//             loading: false,
//           });
//         })
//         .catch((err) => {
//           this.setState({ loading: false });
//           return alert('error:', err);
//         });
//     });
//   };

//   validate = (json) => {
//     this.setState({ searchValue: json });
//     try {
//       JSON.parse(json);
//       this.setState({ errorText: null });
//     } catch (err) {
//       this.setState({ errorText: 'invalid JSON!' });
//     }
//   };

//   render() {
//     return (
//       <Paper elevation={5}>
//         <div>
//           <Card variant="outlined" color="primary">
//             <CardContent>
//               <TextField
//                 error={!!this.state.errorText}
//                 id="outlined-error-helper-text"
//                 label='Paste your sample response. For example: {"foo": "bar""}'
//                 helperText={this.state.errorText ? 'Invalid JSON!' : null}
//                 variant="outlined"
//                 multiline
//                 value={this.state.searchValue}
//                 onChange={this.handleSearchChange}
//                 style={{ width: '75%' }}
//               />
//               <div className="btn-container">
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={this.handleSubmit}
//                   disabled={
//                     !!this.state.errorText || this.state.searchValue === ''
//                   }
//                 >
//                   Submit
//                 </Button>
//                 {this.state.loading && <CircularProgressExampleSimple />}
//               </div>
//             </CardContent>
//           </Card>
//           <div className="res">
//             {/* {this.state.generatedUrl && (
//               <Generated
//                 generatedUrl={this.state.generatedUrl}
//                 reset={this.reset}
//               />
//             )} */}
//           </div>
//         </div>
//       </Paper>
//     );
//   }
// }

// export default Search;
