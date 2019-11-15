import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { Container, TitleBar, HorizontalInputs } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Insert a valid e-mail')
    .required('E-mail is required'),
  weight: Yup.number()
    .typeError('Insert a valid number')
    .required('Age is required')
    .positive('This number should be a positive'),
  height: Yup.number()
    .typeError('Insert a valid number')
    .required('Age is required')
    .positive('This number should be a positive'),
  age: Yup.number()
    .typeError('Insert a valid number')
    .required('Age is required')
    .positive('This number should be a positive')
    .integer(),
});

export default function FormStudent({ match }) {
  const [mode, setMode] = useState('New');

  useEffect(() => {
    const { studentID } = match.params;

    if (studentID) {
      setMode('Edit');
      // Get student and fill the form
    }
  }, [match]);

  return (
    <Container>
      <TitleBar>
        {mode === 'New' ? <h2>Student Registration</h2> : <h2>Student Name</h2>}

        <Link to="/students/">
          <button type="button">BACK</button>
        </Link>
      </TitleBar>

      <Form schema={schema}>
        <div>
          <strong>FULL NAME</strong>
          <Input name="name" type="text" placeholder="Bruce Wayne" />
        </div>

        <div>
          <strong>E-MAIL</strong>
          <Input name="email" type="email" placeholder="bruce@wayne.com" />
        </div>

        <HorizontalInputs>
          <div>
            <strong>AGE</strong>
            <Input name="age" type="number" placeholder="35" />
          </div>
          <div>
            <strong>WEIGHT (Kg)</strong>
            <Input name="weight" step="0.01" type="number" placeholder="95,5" />
          </div>
          <div>
            <strong>HEIGHT</strong>
            <Input name="height" step="0.01" type="number" placeholder="1,88" />
          </div>
        </HorizontalInputs>

        <button type="submit">
          {mode === 'New' ? 'CREATE STUDENT' : 'UPDATE STUDENT'}
        </button>
      </Form>
    </Container>
  );
}