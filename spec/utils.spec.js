const { expect } = require("chai");

const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("Should return an array of objects", () => {
    expect(
      formatDates([
        {
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: 1542284514171,
          votes: 100
        }
      ])
    ).to.be.an("array");
  });
  it("(One object) The objects created_at timestamp should be converted into a JS date object, and no other information is changed", () => {
    expect(
      formatDates([
        {
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: 1542284514171,
          votes: 100
        }
      ])
    ).to.eql([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "Thu, 15 Nov 2018 12:21:54 GMT",
        votes: 100
      }
    ]);
  });
  it("Does not mutate the original array", () => {
    let input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    formatDates(input);
    expect(input).to.eql([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ]);
  });
  it("Returns a new array", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    expect(formatDates(input)).not.to.eql(input);
  });
  it("(Multiple objects) Each objects created_at timestamp should be converted into a JS date object, and no other information is changed", () => {
    const input = [
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171
      },
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    expect(formatDates(input)).to.eql([
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: "Sun, 16 Nov 2014 12:21:54 GMT"
      },
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "Thu, 15 Nov 2018 12:21:54 GMT",
        votes: 100
      }
    ]);
  });
});

describe("makeRefObj", () => {
  it("Given an array, returns an object", () => {
    expect(makeRefObj([{}])).to.be.an("object");
  });
  it("(One item) should return a key of the items' title with a value of the items' article id", () => {
    expect(
      makeRefObj([
        {
          article_id: 11,
          title: "Am I a cat?",
          topic: "mitch",
          author: "icellusedkars",
          body:
            "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
          created_at: "1978-11-25T12:21:54.000Z",
          votes: 0
        }
      ])
    ).to.eql({ "Am I a cat?": 11 });
  });
  it("(Multiple items) should return a key of the items' title with a value of the items' article id for each object in the array", () => {
    const input = [
      {
        article_id: 3,
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: "2010-11-17T12:21:54.000Z",
        votes: 0
      },
      {
        article_id: 5,
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: "2002-11-19T12:21:54.000Z",
        votes: 0
      },
      {
        article_id: 6,
        title: "A",
        topic: "mitch",
        author: "icellusedkars",
        body: "Delicious tin of cat food",
        created_at: "1998-11-20T12:21:54.000Z",
        votes: 0
      }
    ];
    expect(makeRefObj(input)).to.eql({
      "Eight pug gifs that remind me of mitch": 3,
      "UNCOVERED: catspiracy to bring down democracy": 5,
      A: 6
    });
  });
  it("Does not mutate the original array", () => {
    let input = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2018-11-15T12:21:54.000Z",
        votes: 100
      }
    ];
    makeRefObj(input);
    expect(input).to.eql([
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2018-11-15T12:21:54.000Z",
        votes: 100
      }
    ]);
  });
  it("Returns a new object", () => {
    const input = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2018-11-15T12:21:54.000Z",
        votes: 100
      }
    ];
    expect(makeRefObj(input)).not.to.eql(input);
  });
});

describe("formatComments", () => {
  it("Returns an array", () => {
    expect(formatComments([], [])).to.be.an("array");
  });
  it("(One item)Renames 'created_by' property to 'author' and 'belongs_to' to 'article_id', without affecting any other keys or properties", () => {
    expect(
      formatComments(
        [
          {
            body: "Superficially charming",
            belongs_to: "Living in the shadow of a great man",
            created_by: "icellusedkars",
            votes: 0,
            created_at: "Tue, 24 Nov 2009 12:36:03 GMT"
          }
        ],
        { "Living in the shadow of a great man": 1 }
      )
    ).to.eql([
      {
        body: "Superficially charming",
        article_id: 1,
        author: "icellusedkars",
        votes: 0,
        created_at: "Tue, 24 Nov 2009 12:36:03 GMT"
      }
    ]);
  });
  it("The value of the new article_id key should correspond to the original title value provided", () => {
    expect(
      formatComments(
        [
          {
            body: "Superficially charming",
            belongs_to: "Living in the shadow of a great man",
            created_by: "icellusedkars",
            votes: 0,
            created_at: "Tue, 24 Nov 2009 12:36:03 GMT"
          }
        ],
        { "Living in the shadow of a great man": 1 }
      )
    ).to.eql([
      {
        body: "Superficially charming",
        article_id: 1,
        author: "icellusedkars",
        votes: 0,
        created_at: "Tue, 24 Nov 2009 12:36:03 GMT"
      }
    ]);
  });
  it("(Multiple items) Correctly functions with an array with multiple objects", () => {
    const comData = [
      {
        body: "The owls are not what they seem.",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "icellusedkars",
        votes: 20,
        created_at: "Mon, 26 Nov 2001 12:36:03 GMT"
      },
      {
        body: "This morning, I showered for nine minutes.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 16,
        created_at: "Sun, 26 Nov 2000 12:36:03 GMT"
      }
    ];
    const refObj = {
      "Living in the shadow of a great man": 1,
      "They're not exactly dogs, are they?": 2
    };
    expect(formatComments(comData, refObj)).to.eql([
      {
        body: "The owls are not what they seem.",
        article_id: 2,
        author: "icellusedkars",
        votes: 20,
        created_at: "Mon, 26 Nov 2001 12:36:03 GMT"
      },
      {
        body: "This morning, I showered for nine minutes.",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: "Sun, 26 Nov 2000 12:36:03 GMT"
      }
    ]);
  });
  it("Does not mutate the original array", () => {
    let input = [
      {
        body: "The owls are not what they seem.",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "icellusedkars",
        votes: 20,
        created_at: "Mon, 26 Nov 2001 12:36:03 GMT"
      }
    ];
    let refObj = {
      "Living in the shadow of a great man": 1,
      "They're not exactly dogs, are they?": 2
    };
    formatComments(input, refObj);
    expect(input).to.eql([
      {
        body: "The owls are not what they seem.",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "icellusedkars",
        votes: 20,
        created_at: "Mon, 26 Nov 2001 12:36:03 GMT"
      }
    ]);
  });
  it("Returns a new array", () => {
    let input = [
      {
        body: "The owls are not what they seem.",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "icellusedkars",
        votes: 20,
        created_at: "Mon, 26 Nov 2001 12:36:03 GMT"
      }
    ];
    let refObj = {
      "Living in the shadow of a great man": 1,
      "They're not exactly dogs, are they?": 2
    };
    expect(formatComments(input, refObj)).not.to.eql(input);
  });
  //   xIts `created_by` property renamed to an `author` key
  // - xIts `belongs_to` property renamed to an `article_id` key
  // - The value of the new `article_id` key must be the id corresponding to the original title value provided
  // - Its `created_at` value converted into a javascript date object
  // - The rest of the comment's properties must be maintained
});
