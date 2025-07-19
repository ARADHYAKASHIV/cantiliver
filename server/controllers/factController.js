let currentDailyFacts = [
  {
    title: "Fact of the Day 1",
    value: "Loading...",
    description: ""
  },
  {
    title: "Fact of the Day 2",
    value: "Loading...",
    description: ""
  }
];

let lastFactUpdate = Date.now();

const facts = [

  {
    title: "Daily Statistic",
    value: "1.5 Billion", 
    description: "people worldwide use social media daily."
  },
  {
    title: "Historical Fact",
    value: "1969",
    description: "was the year the internet's precursor, ARPANET, was first connected."
  },
  {
    title: "Science Fact",
    value: "8 Minutes",
    description: "is roughly how long it takes for light from the Sun to reach Earth."
  },
  {
    title: "Animal Fact",
    value: "40 mph",
    description: "is the top speed at which a giraffe can run."
  },
  {
    title: "Geography Fact",
    value: "5,500°C",
    description: "is the estimated temperature at Earth's core."
  },
  {
    title: "Technology Fact",
    value: "500 Hours",
    description: "of video content is uploaded to YouTube every minute."
  },
  {
    title: "Space Fact",
    value: "1.3 Million",
    description: "Earths could fit inside the Sun."
  },
  {
    title: "Human Body Fact",
    value: "100,000",
    description: "heartbeats occur in the average human body each day."
  },
  {
    title: "Ocean Fact",
    value: "36,200 ft",
    description: "is the depth of the deepest known point on Earth, the Challenger Deep."
  },
  {
    title: "Population Fact",
    value: "8 Billion",
    description: "people now inhabit Earth as of 2023."
  },
  {
    title: "Sports Fact",
    value: "2,954",
    description: "home runs were hit by Hank Aaron during his MLB career."
  },
  {
    title: "Environmental Fact",
    value: "8 Million Tons",
    description: "of plastic enters our oceans every year."
  },
  {
    title: "Medical Fact",
    value: "206",
    description: "bones are in the adult human body."
  },
  {
    title: "Music Fact",
    value: "1.6 Billion",
    description: "streams made 'Shape of You' by Ed Sheeran the most streamed song on Spotify."
  },
  {
    title: "Food Fact",
    value: "1,000 Years",
    description: "is how long honey can last without spoiling."
  },
  {
    title: "Architecture Fact",
    value: "2,717 ft",
    description: "is the height of the Burj Khalifa, the world's tallest building."
  },
  {
    title: "Weather Fact",
    value: "407.4 km/h",
    description: "was the highest wind speed ever recorded on Earth."
  },
  {
    title: "Literature Fact",
    value: "126 Million",
    description: "copies of Don Quixote have been sold, making it the best-selling fiction book of all time."
  },
  {
    title: "Aviation Fact",
    value: "51 Miles",
    description: "is the length of the world's longest commercial flight route between Singapore and New York."
  },
  {
    title: "Chemistry Fact",
    value: "-273.15°C",
    description: "is absolute zero, the lowest possible temperature in the universe."
  },
  {
    title: "Plant Fact",
    value: "5,000 Years",
    description: "is the age of the oldest known living tree, a Great Basin Bristlecone Pine."
  },
  {
    title: "Economic Fact",
    value: "$31.8 Trillion",
    description: "was the estimated global GDP in 2023."
  },
  {
    title: "Language Fact",
    value: "7,151",
    description: "languages are currently spoken around the world."
  }
];

const updateFact = () => {
  const selectedFacts = [];
  const availableFacts = [...facts];

  for (let i = 0; i < 2; i++) {
    if (availableFacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableFacts.length);
      selectedFacts.push(availableFacts.splice(randomIndex, 1)[0]);
    }
  }
  currentDailyFacts = selectedFacts;
  lastFactUpdate = Date.now();
};

// Initial fact update when the server starts
updateFact();

const getDailyFact = (req, res) => {
  const twelveHours = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
  if (Date.now() - lastFactUpdate > twelveHours) {
    updateFact();
  }
  res.json(currentDailyFacts);
};

module.exports = { getDailyFact };