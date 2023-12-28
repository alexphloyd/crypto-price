declare type IconName = string;

declare type RoutePath = string;

declare type PhoneNumber = string;

declare type ErrorMessage = string | undefined;

declare type ElementsPerPage = string;

declare type PageNumber = string;

declare type DateTimeString = string;

declare type ImageSrcUrl = string;

declare type EffectStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

declare type InstanceKey = string;

declare type EffectState = {
  status: EffectStatus;
  error: ErrorMessage;
};
