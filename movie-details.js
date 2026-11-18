// Ratings recorded from IMDb and Rotten Tomatoes on November 18, 2026.
const movieDetails = {
  "interstellar": {
    year: 2014,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey","Anne Hathaway","Jessica Chastain"],
    imdbId: "tt0816692", imdb: "8.7",
    rtSlug: "interstellar_2014", rt: 73,
    description: "With Earth failing, a former pilot joins a mission through a wormhole to find a new home for humanity."
  },
  "grand-budapest": {
    year: 2014,
    director: "Wes Anderson",
    cast: ["Ralph Fiennes","Tony Revolori","Saoirse Ronan"],
    imdbId: "tt2278388", imdb: "8.1",
    rtSlug: "the_grand_budapest_hotel", rt: 92,
    description: "A hotel concierge and his young protégé become entangled in a stolen painting, a contested inheritance, and a murder investigation."
  },
  "parasite": {
    year: 2019,
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho","Lee Sun-kyun","Cho Yeo-jeong"],
    imdbId: "tt6751668", imdb: "8.5",
    rtSlug: "parasite_2019", rt: 99,
    description: "A struggling family schemes its way into working for a wealthy household, setting off a chain of discoveries neither family can control."
  },
  "past-lives": {
    year: 2023,
    director: "Celine Song",
    cast: ["Greta Lee","Teo Yoo","John Magaro"],
    imdbId: "tt13238346", imdb: "7.8",
    rtSlug: "past_lives", rt: 95,
    description: "Childhood friends from Seoul reunite in New York and reckon with the choices that led them to different lives."
  },
  "spider-verse": {
    year: 2018,
    director: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    cast: ["Shameik Moore","Jake Johnson","Hailee Steinfeld"],
    imdbId: "tt4633694", imdb: "8.4",
    rtSlug: "spider_man_into_the_spider_verse", rt: 97,
    description: "Brooklyn teenager Miles Morales discovers his powers and joins Spider-People from other dimensions to save his city."
  },
  "arrival": {
    year: 2016,
    director: "Denis Villeneuve",
    cast: ["Amy Adams","Jeremy Renner","Forest Whitaker"],
    imdbId: "tt2543164", imdb: "7.9",
    rtSlug: "arrival_2016", rt: 94,
    description: "A linguist tries to communicate with mysterious visitors before rising tensions turn first contact into a global conflict."
  },
  "whiplash": {
    year: 2014,
    director: "Damien Chazelle",
    cast: ["Miles Teller","J.K. Simmons","Paul Reiser"],
    imdbId: "tt2582802", imdb: "8.5",
    rtSlug: "whiplash_2014", rt: 94,
    description: "An ambitious jazz drummer pushes himself to the breaking point under a brilliant, ruthless instructor."
  },
  "spirited-away": {
    year: 2001,
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi","Miyu Irino","Mari Natsuki"],
    imdbId: "tt0245429", imdb: "8.6",
    rtSlug: "spirited_away", rt: 96,
    description: "A young girl takes a job at a bathhouse for spirits while searching for a way to free her transformed parents."
  },
  "knives-out": {
    year: 2019,
    director: "Rian Johnson",
    cast: ["Daniel Craig","Ana de Armas","Chris Evans"],
    imdbId: "tt8946378", imdb: "7.9",
    rtSlug: "knives_out", rt: 97,
    description: "A private detective investigates a mystery writer’s death and finds a family full of motives and competing stories."
  },
  "dune": {
    year: 2021,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet","Rebecca Ferguson","Oscar Isaac"],
    imdbId: "tt1160419", imdb: "8.0",
    rtSlug: "dune_2021", rt: 83,
    description: "A young heir travels to a desert planet at the center of an empire’s struggle over its most valuable resource."
  },
  "little-women": {
    year: 2019,
    director: "Greta Gerwig",
    cast: ["Saoirse Ronan","Emma Watson","Florence Pugh","Eliza Scanlen"],
    imdbId: "tt3281548", imdb: "7.7",
    rtSlug: "little_women_2019", rt: 95,
    description: "The four March sisters come of age in Civil War-era Massachusetts, pursuing different futures while holding on to their bond."
  },
  "inception": {
    year: 2010,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio","Joseph Gordon-Levitt","Elliot Page"],
    imdbId: "tt1375666", imdb: "8.8",
    rtSlug: "inception", rt: 86,
    description: "A thief who steals secrets through shared dreams takes on a job in reverse: plant an idea in someone else’s mind."
  },
  "dark-knight": {
    year: 2008,
    director: "Christopher Nolan",
    cast: ["Christian Bale","Heath Ledger","Aaron Eckhart"],
    imdbId: "tt0468569", imdb: "9.1",
    rtSlug: "the_dark_knight", rt: 94,
    description: "Batman and his allies try to stop the Joker, whose attacks force Gotham to confront what it is willing to sacrifice."
  },
  "matrix": {
    year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves","Laurence Fishburne","Carrie-Anne Moss"],
    imdbId: "tt0133093", imdb: "8.7",
    rtSlug: "matrix", rt: 83,
    description: "A hacker discovers his world is a simulation and joins a resistance fighting the machines that control it."
  },
  "hamilton": {
    year: 2020,
    director: "Thomas Kail",
    cast: ["Lin-Manuel Miranda","Leslie Odom Jr.","Phillipa Soo"],
    imdbId: "tt8503618", imdb: "8.3",
    rtSlug: "hamilton_2020", rt: 98,
    description: "A filmed Broadway performance follows Alexander Hamilton’s rise and rivalries through a score rooted in hip-hop and musical theater."
  },
  "star-wars": {
    year: 1977,
    director: "George Lucas",
    cast: ["Mark Hamill","Harrison Ford","Carrie Fisher"],
    imdbId: "tt0076759", imdb: "8.6",
    rtSlug: "star_wars_episode_iv_a_new_hope", rt: 93,
    description: "A farm boy joins a rebellion and helps rescue a princess carrying the plans to an empire’s most dangerous weapon."
  },
  "back-to-the-future": {
    year: 1985,
    director: "Robert Zemeckis",
    cast: ["Michael J. Fox","Christopher Lloyd","Lea Thompson"],
    imdbId: "tt0088763", imdb: "8.5",
    rtSlug: "back_to_the_future", rt: 93,
    description: "A teenager accidentally travels to 1955 and must bring his parents together before he can return to his own time."
  },
  "fellowship": {
    year: 2001,
    director: "Peter Jackson",
    cast: ["Elijah Wood","Ian McKellen","Viggo Mortensen"],
    imdbId: "tt0120737", imdb: "8.9",
    rtSlug: "the_lord_of_the_rings_the_fellowship_of_the_ring", rt: 91,
    description: "A young hobbit and a fellowship of allies set out to destroy a ring before it falls back into the hands of its creator."
  },
  "pulp-fiction": {
    year: 1994,
    director: "Quentin Tarantino",
    cast: ["John Travolta","Samuel L. Jackson","Uma Thurman"],
    imdbId: "tt0110912", imdb: "8.8",
    rtSlug: "pulp_fiction", rt: 92,
    description: "The lives of two hitmen, a boxer, and a gangster’s wife intersect in a series of offbeat Los Angeles crime stories."
  },
  "truman-show": {
    year: 1998,
    director: "Peter Weir",
    cast: ["Jim Carrey","Laura Linney","Ed Harris"],
    imdbId: "tt0120382", imdb: "8.2",
    rtSlug: "truman_show", rt: 94,
    description: "A cheerful insurance salesman begins to suspect that his picture-perfect hometown and everyone in it are part of a television show."
  },
};
