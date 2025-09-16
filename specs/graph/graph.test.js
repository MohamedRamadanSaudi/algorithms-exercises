// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count the initial id's own job title in the total

/*
  parameters:
  myId                - number    - the id of the user who is the root node
  
  degreesOfSeparation - number   - how many degrees of separation away to look on the graph
*/

/*
  getUser  - function - a function that returns a user's object given an ID

  example
  getUser(308) returns:
  {
    id: 308,
    name: "Beatrisa Lalor",
    company: "Youtags",
    title: "Office Assistant II",
    connections: [687, 997, 437]
  }
*/
const { getUser } = require("./jobs");

const findMostCommonTitle = (myId, degreesOfSeparation) => {
  const queue = [{ id: myId, degree: 0 }];
  const visited = new Set();
  const titleCount = {};
  let mostCommonTitle = "";
  let maxCount = 0;
  while (queue.length > 0) {
    const { id, degree } = queue.shift();
    if (visited.has(id) || degree > degreesOfSeparation) continue;
    visited.add(id);
    const user = getUser(id);
    const title = user.title;
    titleCount[title] = (titleCount[title] || 0) + 1;
    if (titleCount[title] > maxCount) {
      maxCount = titleCount[title];
      mostCommonTitle = title;
    }
    for (const connection of user.connections) {
      if (!visited.has(connection)) {
        queue.push({ id: connection, degree: degree + 1 });
      }
    }
  }
  return mostCommonTitle;
};

// unit tests
// do not modify the below code
describe("findMostCommonTitle", function () {
  test("user 30 with 2 degrees of separation", () => {
    expect(findMostCommonTitle(30, 2)).toBe("Librarian");
  });

  test("user 11 with 3 degrees of separation", () => {
    expect(findMostCommonTitle(11, 3)).toBe("Graphic Designer");
  });

  test("user 307 with 4 degrees of separation", () => {
    // if you're failing here with "Clinical Specialist, you're probably not filtering users who
    // appear more than once in people's connections
    expect(findMostCommonTitle(306, 4)).toBe("Pharmacist");
  });
});

describe("extra credit", function () {
  test("user 1 with 7 degrees of separation – this will traverse every user that's followed by someone else. five users are unfollowed", () => {
    expect(findMostCommonTitle(1, 7)).toBe("Geological Engineer");
  });
});
