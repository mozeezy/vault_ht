const canadianAreaCodes: string[] = [
  "204",
  "226",
  "236",
  "249",
  "250",
  "289",
  "306",
  "343",
  "365",
  "403",
  "416",
  "418",
  "431",
  "438",
  "450",
  "506",
  "514",
  "519",
  "548",
  "579",
  "581",
  "587",
  "604",
  "613",
  "639",
  "647",
  "672",
  "705",
  "709",
  "778",
  "780",
  "819",
  "825",
  "867",
  "873",
  "902",
  "905",
];
export function isCanadianNumber(phoneNumber: string) {
  const canadianPhoneRegex =
    /^(\+?1?[ -]?(?:\([2-9]\d{2}\)[ -]?|[2-9]\d{2}[ -]?)\d{3}[ -]?\d{4})$/;
  const areaCode = phoneNumber.substring(0, 3);
  if (canadianAreaCodes.includes(areaCode))
    return canadianPhoneRegex.test(phoneNumber);
  else {
    return false;
  }
}
