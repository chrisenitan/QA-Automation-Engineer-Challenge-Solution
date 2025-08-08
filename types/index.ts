//global types
export type Submission = { submitAfter?: boolean };

// valid numbers
type AllowedDigits = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

// Using this limited scope for now
type Year = `${19 | 20}${AllowedDigits}${AllowedDigits}`;

// Normal months no indexing
type ValidMonths = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';

// Normal days no indexing
type Days =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'
  | '31';

// Final date format: MM-DD-YYYY
type CheckIn = `${ValidMonths}-${Days}-${Year}`;
type CheckOut = `${ValidMonths}-${Days}-${Year}`;

//Valid dates allowed on stay search fields.
export type StayDates = {
  checkIn: CheckIn;
  checkOut: CheckOut;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;
export type UnknownObject = Record<string, unknown>;
export type appLanguagesT = 'en' | 'de';
export type Environments = 'staging' | 'prod' | 'local';
