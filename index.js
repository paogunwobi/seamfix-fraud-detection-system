function countNotifications(n, d, expenditures) {
  let notifications = 0;
  const count = Array.from({ length: 201 }, () => 0);

  // Calculate the initial count of expenditures for the first d days
  for (let i = 0; i < d; i++) {
    count[expenditures[i]]++;
  }

  // Iterate over the remaining days and check for notifications
  for (let i = d; i < n; i++) {
    // Check if the expenditure is greater than or equal to 2x the median
    const median = getMedian(count, d);
    if (expenditures[i] >= 2 * median) {
      notifications++;
    }

    // Update the count by removing the oldest expenditure and adding the new one
    count[expenditures[i - d]]--;
    count[expenditures[i]]++;
  }

  return notifications;
}

function getMedian(count, d) {
  let medianCount = Math.floor(d / 2) + 1;
  let countSoFar = 0;
  let median;
  for (let i = 0; i < count.length; i++) {
    countSoFar += count[i];
    if (countSoFar >= medianCount) {
      median = i;
      if (d % 2 === 1 || countSoFar - count[i] >= medianCount - 1) break;
    }
  }
  return d % 2 === 0 ? (median + findNextNonZeroIndex(count, median)) / 2 : median;
}

function findNextNonZeroIndex(count, index) {
  while (count[index] === 0) index++;
  return index;
}


// Example
var n = 9;
var d = 5;
var expenditures = [2, 3, 4, 2, 3, 6, 8, 4, 5];
console.log('Output: ', countNotifications(n, d, expenditures)); // expected output is 2.
