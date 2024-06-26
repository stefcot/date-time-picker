import moment from "moment";

/**
 * Determines the format of a given date string by checking against different formats.
 * You can add more formats as needed
 *
 * @param {string} dateString - The date string to determine the format for.
 *
 * @returns {string} - The format of the given date string, or "Unknown format" if no format matches.
 */
export const getDateFormat = (dateString: string): string => {
  const formats = [
    "dddd, MMMM Do YYYY",
    "dddd, MMMM D YYYY",
    "YYYY-MM-DD",
    "MM-DD-YYYY",
  ];

  for (const format of formats) {
    if (moment(dateString, format, true).isValid()) {
      return format;
    }
  }

  return "Unknown format";
};
