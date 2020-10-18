import { FilecoinNumber, Converter } from "@glif/filecoin-number";

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = (DAY * 365) / 12;
const YEAR = DAY * 365;

// NOTE(jsign): Each epoch is 30s, then divide by 60 for getting mins, by 60 to get hours, then by 24 to get days
export const getDaysFromEpoch = (epoch) => {
  const number = (epoch * 30) / DAY;
  const formatted = number.toFixed(2);
  return `${formatted} days`;
};

export const toDateSinceEpoch = (epoch) => {
  return toDate(new Date().getTime() - epoch);
};

export const toDate = (data) => {
  const date = new Date(data);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};

export const formatAsFilecoinConversion = (number) => {
  const filecoinNumber = new FilecoinNumber(`${number}`, "attofil");
  //const inAttoFil = filecoinNumber.toAttoFil();
  const inFil = filecoinNumber.toFil();
  return `${formatAsFilecoin(inFil)}`;
};

export const formatAsFilecoin = (number) => {
  return `${number} FIL`;
};

export const bytesToSize = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(dm)} ${sizes[i]}`;
};
