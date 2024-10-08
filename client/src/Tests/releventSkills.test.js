import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import RelevantSkills from '../components/Matching/RelevantSkills';

describe('RelevantSkills component', () => {
  test('updates skills when input changes', () => {
    render(<RelevantSkills />);

    // Find the input field by its placeholder text
    const inputField = screen.getByPlaceholderText(
      'e.g., JavaScript, React, Node.js',
    );

    // Simulate typing into the input field
    fireEvent.change(inputField, {
      target: {value: 'JavaScript, React, Node.js'},
    });

    // Check if the input value is updated correctly
    expect(inputField.value).toBe('JavaScript, React, Node.js');
  });
});
