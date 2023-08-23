import { PHONE_NUMBER_FORMATS } from '../config/phone-number-formats';
import { Country, PhoneNumber } from '../types';

const LINKING_SYMBOL = '-';
const SPACE = ' ';

interface Params {
  value: PhoneNumber;
  country: Country;
}

export const formatPhoneNumber = ({ value, country }: Params) => {
  const template = PHONE_NUMBER_FORMATS[country];
  const input = ('' + value).replace(/\D/g, '');

  let output = '';

  let templateIndex = 0;
  let inputIndex = 0;

  while (inputIndex < input.length) {
    if (template[templateIndex] === LINKING_SYMBOL || template[templateIndex] === SPACE) {
      output += template.charAt(templateIndex);
    } else {
      output += input.charAt(inputIndex);
      ++inputIndex;
    }
    ++templateIndex;
  }

  return output.substring(0, template.length);
};
