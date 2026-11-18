const movies = [
  { id:"interstellar", title:"Interstellar", poster:"gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id:"grand-budapest", title:"The Grand Budapest Hotel", poster:"eWdyYQreja6JGCzqHWXpWHDrrPo.jpg" },
  { id:"parasite", title:"Parasite", poster:"7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
  { id:"past-lives", title:"Past Lives", poster:"k3waqVXSnvCZWfJYNtdamTgTtTA.jpg" },
  { id:"spider-verse", title:"Spider-Man: Into the Spider-Verse", poster:"iiZZdoQBEYBv6id8su7ImL0oCbD.jpg" },
  { id:"arrival", title:"Arrival", poster:"x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg" },
  { id:"whiplash", title:"Whiplash", poster:"7fn624j5lj3xTme2SgiLCeuedmO.jpg" },
  { id:"spirited-away", title:"Spirited Away", poster:"39wmItIWsg5sZMyRUHLkWBcuVCM.jpg" },
  { id:"knives-out", title:"Knives Out", poster:"pThyQovXQrw2m0s9x82twj48Jq4.jpg" },
  { id:"dune", title:"Dune", poster:"d5NXSklXo0qyIYkgV94XAgMIckC.jpg" },
  { id:"little-women", title:"Little Women", poster:"yn5ihODtZ7ofn8pDYfxCmxh8AXI.jpg" },
  { id:"inception", title:"Inception", poster:"oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" },
  { id:"dark-knight", title:"The Dark Knight", poster:"qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id:"matrix", title:"The Matrix", poster:"f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" },
  { id:"hamilton", title:"Hamilton", poster:"h1B7tW0t399VDjAcWJh8m87469b.jpg" },
  { id:"star-wars", title:"Star Wars", poster:"6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg" },
  { id:"back-to-the-future", title:"Back to the Future", poster:"fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg" },
  { id:"fellowship", title:"The Lord of the Rings: The Fellowship of the Ring", poster:"6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg" },
  { id:"pulp-fiction", title:"Pulp Fiction", poster:"d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg" },
  { id:"truman-show", title:"The Truman Show", poster:"vuza0WqY239yBXOadKlGwJsZJFE.jpg" }
];

const byId = id => document.getElementById(id);
const findMovie = id => movies.find(movie => movie.id === id);
const stage = byId("deck-stage");
const deckActions = document.querySelector(".deck-actions");
const remainingMeter = byId("remaining-meter");
const stripes = Array.from({ length: 20 }, () => document.createElement("span"));
byId("remaining-stripes").append(...stripes);
remainingMeter.setAttribute("aria-valuemax", String(movies.length));
const passButton = byId("pass");
const likeButton = byId("like");
const watchlistButton = byId("watchlist");
const watchlistDialog = byId("watchlist-dialog");
const watchlistContent = byId("watchlist-content");
const movieDialog = byId("movie-dialog");
const likesKey = "afterglow-watchlist";
const watchLaterKey = "afterglow-watch-later";
const passesKey = "afterglow-passes";

function readList(key) {
  try {
    const list = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(list)) return list;
  } catch {
    // Reactions can still be recorded for this session.
  }
  return [];
}

const liked = new Set(readList(likesKey).filter(findMovie));
const watchLater = new Set(readList(watchLaterKey).filter(findMovie));
const passed = new Set(readList(passesKey).filter(findMovie));
const reactions = {
  pass: { key: passesKey, titles: passed, message: "Passed on" },
  watchlist: { key: watchLaterKey, titles: watchLater, message: "Added to Watch List:" },
  like: { key: likesKey, titles: liked, message: "Liked" }
};
let activeMovie;
let drag;
let flight;
let detailsPress = false;

function persist({ key, titles }) {
  try {
    localStorage.setItem(key, JSON.stringify([...titles]));
  } catch {
    // Keep the reactions in memory when storage is unavailable.
  }
}

function render() {
  const remainingMovies = movies.filter(({ id }) => !liked.has(id) && !watchLater.has(id) && !passed.has(id));
  activeMovie = remainingMovies[0];
  const remaining = remainingMovies.length;
  remainingMeter.setAttribute("aria-valuenow", String(remaining));
  stripes.forEach((stripe, index) => stripe.classList.toggle("filled", index < remaining));
  stage.replaceChildren();
  if (activeMovie) {
    const card = document.createElement("button");
    const poster = document.createElement("img");
    card.className = "swipe-card";
    card.type = "button";
    card.setAttribute("aria-label", activeMovie.title + ". View movie details.");
    card.setAttribute("aria-haspopup", "dialog");
    card.addEventListener("click", event => {
      if (event.detail === 0) showMovieDetails();
    });
    poster.src = "posters/" + activeMovie.poster;
    poster.alt = activeMovie.title;
    poster.draggable = false;
    card.append(poster);
    stage.append(card);

    const nextMovie = remainingMovies[1];
    if (nextMovie) {
      const preview = document.createElement("img");
      preview.className = "next-poster";
      preview.src = "posters/" + nextMovie.poster;
      preview.alt = "";
      preview.draggable = false;
      stage.append(preview);
    }
  }
  passButton.disabled = !activeMovie;
  likeButton.disabled = !activeMovie;
  watchlistButton.setAttribute("aria-label", activeMovie ? "Watch List: save this movie" : "Watch List: view movies");
  if (activeMovie) watchlistButton.removeAttribute("aria-haspopup");
  else watchlistButton.setAttribute("aria-haspopup", "dialog");
}

function announce(message) {
  byId("announcement").textContent = message + (activeMovie ? " " + activeMovie.title + " is ready to swipe." : " No movies left.");
}

function showMovieDetails() {
  if (!activeMovie || flight || drag || movieDialog.open) return;
  const details = movieDetails[activeMovie.id];
  byId("movie-description").textContent = details.description;
  byId("movie-year").textContent = details.year;
  byId("movie-director").textContent = details.director;
  byId("movie-cast").textContent = details.cast.join(", ");
  byId("movie-imdb").textContent = details.imdb + "/10";
  byId("movie-rt").textContent = details.rt + "%";
  movieDialog.showModal();
}

function gestureChoice(x, y) {
  if (Math.abs(x) >= Math.abs(y) && x !== 0) return x < 0 ? "pass" : "like";
  return y > 0 ? "watchlist" : "";
}

function positionCard(card, x, y, choice) {
  card.style.transform = choice === "watchlist"
    ? `translateY(${y}px)`
    : choice ? `translateX(${x}px) rotate(${x / 17}deg)` : "";
  card.dataset.direction = choice;
  deckActions.dataset.gesture = choice;
}

function react(choice) {
  if (!activeMovie || flight || drag) return;
  const movie = activeMovie;
  const card = stage.firstElementChild;
  const reaction = reactions[choice];
  reaction.titles.add(movie.id);
  persist(reaction);
  deckActions.dataset.gesture = choice;

  function advance() {
    const focus = document.activeElement;
    flight = undefined;
    delete deckActions.dataset.gesture;
    render();
    if (focus === card) (stage.firstElementChild || watchlistButton).focus();
    if (!activeMovie && (focus === likeButton || focus === passButton)) watchlistButton.focus();
    announce(`${reaction.message} ${movie.title}.`);
  }

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    advance();
    return;
  }
  const direction = choice === "like" ? 1 : -1;
  const exitTransform = choice === "watchlist"
    ? `translateY(${card.offsetHeight + 50}px)`
    : `translateX(${direction * (card.offsetWidth + 100)}px) rotate(${direction * 24}deg)`;
  card.dataset.direction = choice;
  flight = card.animate([
    { transform: card.style.transform || "none", opacity: 1 },
    { transform: exitTransform, opacity: 0 }
  ], { duration: 210, easing: "ease-out", fill: "forwards" });
  flight.onfinish = advance;
}

function showWatchlist() {
  function movieList(titles) {
    return `<ul class="watchlist-movies">${[...titles].reverse().map(id => {
      const movie = findMovie(id);
      return `<li><img src="posters/${movie.poster}" alt="">${movie.title}</li>`;
    }).join("")}</ul>`;
  }

  watchlistContent.innerHTML = watchLater.size ? movieList(watchLater) : "<p>No movies saved for later.</p>";
  if (liked.size) watchlistContent.insertAdjacentHTML("beforeend", `<h3>Liked</h3>${movieList(liked)}`);

  if (!activeMovie && passed.size) {
    const review = document.createElement("button");
    review.className = "review";
    review.textContent = "Review passed movies";
    review.addEventListener("click", () => {
      flight?.cancel();
      flight = undefined;
      passed.clear();
      persist(reactions.pass);
      render();
      watchlistDialog.close();
    });
    watchlistContent.append(review);
  }
  watchlistDialog.showModal();
}

stage.addEventListener("pointerdown", event => {
  const card = event.target.closest(".swipe-card");
  if (!card || !event.isPrimary || event.button !== 0 || flight) return;
  drag = { card, pointerId: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
  card.setPointerCapture(event.pointerId);
  card.classList.add("dragging");
});

stage.addEventListener("pointermove", event => {
  if (!drag || drag.pointerId !== event.pointerId) return;
  const x = event.clientX - drag.x;
  const y = event.clientY - drag.y;
  if (Math.hypot(x, y) > 10) drag.moved = true;
  positionCard(drag.card, x, y, gestureChoice(x, y));
});

function endDrag(event) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  const { card, x, y, moved } = drag;
  drag = undefined;
  card.classList.remove("dragging");
  const deltaX = event.clientX - x;
  const deltaY = event.clientY - y;
  const choice = gestureChoice(deltaX, deltaY);
  const distance = choice === "watchlist" ? deltaY : Math.abs(deltaX);
  const threshold = Math.min(90, card.offsetWidth * .27);
  if (event.type === "pointerup" && choice && distance >= threshold) {
    react(choice);
  } else {
    positionCard(card, 0, 0, "");
    if (event.type === "pointerup" && !moved && Math.hypot(deltaX, deltaY) <= 10) showMovieDetails();
  }
}

for (const type of ["pointerup", "pointercancel", "lostpointercapture"]) stage.addEventListener(type, endDrag);
passButton.addEventListener("click", () => react("pass"));
likeButton.addEventListener("click", () => react("like"));
watchlistButton.addEventListener("click", () => {
  if (activeMovie) react("watchlist");
  else showWatchlist();
});
watchlistDialog.addEventListener("close", () => watchlistButton.focus());
// The tap that opens the dialog can still dispatch a click after it appears.
movieDialog.addEventListener("pointerdown", () => { detailsPress = true; });
movieDialog.addEventListener("pointercancel", () => { detailsPress = false; });
movieDialog.addEventListener("click", event => {
  if (detailsPress || event.detail === 0) movieDialog.close();
  detailsPress = false;
});
movieDialog.addEventListener("close", () => {
  detailsPress = false;
  stage.firstElementChild?.focus();
});
document.addEventListener("keydown", event => {
  if (watchlistDialog.open || movieDialog.open || !activeMovie || event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  event.preventDefault();
  react(event.key === "ArrowRight" ? "like" : "pass");
});
render();
