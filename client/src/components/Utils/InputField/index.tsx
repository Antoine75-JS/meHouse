import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormInputs {
  email: string;
  password: string;
}

interface InputProps {
  label: string;
  inputType: string;
  required: boolean;
  placeholder: string;
  register: UseFormRegister<FormInputs>;
}

const InputField: React.FC<InputProps> = () => {
  return <div>InputField</div>;
};

export default InputField;
