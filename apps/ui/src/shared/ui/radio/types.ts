import { type IconName } from '@app/shared/types';

export interface Props<O extends RadioOptions> {
  options: O;
  onChange: (value: AvailableOptions<O>) => void;
  defaultChecked?: AvailableOptions<O>;
  className?: string;
}

export type RadioOptions = Array<OptionObject>;

type OptionObject = { value: OptionValue; icon: IconName; iconSection: string };

export type OptionValue = string;

export type AvailableOptions<T> = T extends { value: infer V; icon: IconName }[] ? V : never;
