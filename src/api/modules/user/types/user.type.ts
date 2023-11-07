export enum GENDERS {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum HOROSCOPES {
  ARIES = 'ARIES',
  TAURUS = 'TAURUS',
  GEMINI = 'GEMINI',
  CANCER = 'CANCER',
  LEO = 'LEO',
  VIRGO = 'VIRGO',
  LIBRA = 'LIBRA',
  SCORPIUS = 'SCORPIUS',
  SAGITTARIUS = 'SAGITTARIUS',
  CAPRICORNUS = 'CAPRICORNUS',
  AQUARIUS = 'AQUARIUS',
  PISCES = 'PISCES',
}

export enum ZODIACS {
  ARIES = 'RAM',
  TAURUS = 'BULL',
  GEMINI = 'TWINS',
  CANCER = 'CRAB',
  LEO = 'LION',
  VIRGO = 'VIRGIN',
  LIBRA = 'BALANCE',
  SCORPIUS = 'SCORPION',
  SAGITTARIUS = 'ARCHER',
  CAPRICORNUS = 'GOAT',
  AQUARIUS = 'WATER_BEARER',
  PISCES = 'FISH',
}

export enum HEIGHT_UNIT {
  CM = 'CENTIMETERS',
  INCH = 'INCHES',
}

export interface UserHeight {
  value: number;
  unit: HEIGHT_UNIT;
}

export enum WEIGHT_UNIT {
  KG = 'KILOGRAMS',
}

export interface UserWeight {
  value: number;
  unit: WEIGHT_UNIT;
}
