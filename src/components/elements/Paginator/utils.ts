import { clamp } from "@utils/math";

/**
 * Generates an array of page numbers to display in a pagination component.
 * It intelligently handles different scenarios (few pages, current page at ends, current page in middle)
 * to provide a user-friendly and concise pagination interface.
 * Negative numbers in the returned array indicate an ellipsis (...).
 *
 * @param params - An object containing pagination parameters.
 * @param params.page - The current active page number.
 * @param params.pageCount - The total number of available pages.
 * @returns An array of numbers representing the pages to be displayed. Negative numbers denote ellipses.
 */
export const generatePages = (params: {
  page: number;
  pageCount: number;
}): number[] => {
  const { page, pageCount: n } = params;

  // Scenario 1: Total pages are 7 or less.
  // Display all pages as there's no need for ellipses.
  if (n <= 7) {
    return Array<number>(n)
      .fill(0)
      .map((_, idx) => idx + 1);
  }

  // Scenario 2: Current page is near the beginning (page 1, 2, or 3).
  // Display the first few pages, an ellipsis, and the last page.
  // Example: [1, 2, 3, 4, 5, ..., n]
  if (page - 2 <= 1) {
    return [1, 2, 3, 4, 5, -clamp(3 + 5, 1, n), n];
  }

  // Scenario 3: Current page is near the end (last page, second-to-last, or third-to-last).
  // Display the first page, an ellipsis, and the last few pages.
  // Example: [1, ..., n-4, n-3, n-2, n-1, n]
  else if (page + 2 >= n) {
    return [1, -clamp(n - 2 - 5, 1, n), n - 4, n - 3, n - 2, n - 1, n];
  }

  // Scenario 4: Current page is in the middle of the page range.
  // Display the first page, an ellipsis (if needed), pages around the current page,
  // another ellipsis (if needed), and the last page.
  // Example: [1, ..., page-2, page-1, page, page+1, page+2, ..., n]
  else {
    const result: number[] = [1];

    // Add a leading ellipsis if there's a significant gap between page 1 and (page - 2).
    // `page - 3 >= 2` checks if there are at least two pages between page 1 and `page - 2`
    // that would be skipped, justifying an ellipsis.
    if (page - 3 >= 2) {
      result.push(-clamp(page - 5, 1, n));
    }

    result.push(page - 2, page - 1, page, page + 1, page + 2);

    // Add a trailing ellipsis if there's a significant gap between (page + 2) and the last page.
    // `page + 3 <= n - 1` checks if there are at least two pages between `page + 2` and `n`
    // that would be skipped.
    if (page + 3 <= n - 1) {
      result.push(-clamp(page + 5, 1, n));
    }

    result.push(n);

    return result;
  }
};
