import React from 'react';

type MaskType = 'cnpj' | 'cpf' | 'cep' | 'phone';

const format = (value: string, mask: MaskType) => {
  const digits = value.replace(/\D/g, '');
  switch (mask) {
    case 'cnpj':
      return digits
        .slice(0, 14)
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    case 'cpf':
      return digits
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2');
    case 'cep':
        return digits
          .slice(0, 8)
          .replace(/(\d{5})(\d)/, '$1-$2');
    case 'phone':
        if (digits.length <= 10) {
            return digits
              .slice(0, 10)
              .replace(/(\d{2})(\d)/, '($1) $2')
              .replace(/(\d{4})(\d)/, '$1-$2');
        }
        return digits
          .slice(0, 11)
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2');
    default:
      return value;
  }
};

interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: MaskType;
}

const InputMask: React.FC<InputMaskProps> = ({ mask, value, onChange, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = format(e.target.value, mask);
    e.target.value = formattedValue;
    if (onChange) {
      onChange(e);
    }
  };

  const displayValue = typeof value === 'string' ? format(value, mask) : '';

  return <input {...props} value={displayValue} onChange={handleChange} />;
};

export default InputMask;
