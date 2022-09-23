const OPTIONS = {
  TITLE: "TITLE",
  URL: "URL",
  YOUTUBE_OR_SPOTIFY_ID: "YOUTUBE_OR_SPOTIFY_ID",
  NOTION: "NOTION",
  NOTION_WITH_SEARCH_PARAMS: "NOTION_WITH_SEARCH_PARAMS",
  WEBSITE_MUSIC_PAGE: "WEBSITE_MUSIC_PAGE",
  WEBSITE_READINGS_PAGE: "WEBSITE_READINGS_PAGE",
  WEBSITE_FILMS_PAGE: "WEBSITE_FILMS_PAGE",
  WEBSITE_BOOKS_PAGE: "WEBSITE_BOOKS_PAGE",
  WEBSITE_CONTACTS_PAGE: "WEBSITE_CONTACTS_PAGE",
};

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.getElementsByTagName("button");

  buttons[0].addEventListener("click", handleButtonClick(OPTIONS.TITLE));
  buttons[1].addEventListener("click", handleButtonClick(OPTIONS.URL));
  buttons[2].addEventListener(
    "click",
    handleButtonClick(OPTIONS.YOUTUBE_OR_SPOTIFY_ID)
  );
  buttons[3].addEventListener("click", handleButtonClick(OPTIONS.NOTION));
  buttons[4].addEventListener(
    "click",
    handleButtonClick(OPTIONS.NOTION_WITH_SEARCH_PARAMS)
  );
  buttons[5].addEventListener(
    "click",
    handleButtonClick(OPTIONS.WEBSITE_MUSIC_PAGE)
  );
  buttons[6].addEventListener(
    "click",
    handleButtonClick(OPTIONS.WEBSITE_READINGS_PAGE)
  );
  buttons[7].addEventListener(
    "click",
    handleButtonClick(OPTIONS.WEBSITE_FILMS_PAGE)
  );
  buttons[8].addEventListener(
    "click",
    handleButtonClick(OPTIONS.WEBSITE_BOOKS_PAGE)
  );
  buttons[9].addEventListener(
    "click",
    handleButtonClick(OPTIONS.WEBSITE_CONTACTS_PAGE)
  );
});

function handleButtonClick(config) {
  return async function handleButtonClick() {
    chrome.tabs.getSelected(null, async function (tab) {
      const $textNode = document.getElementsByTagName("p")[0];
      $textNode.innerHTML = "";
      $textNode.classList.remove("error");

      try {
        const isYouTubeVideo = tab.url.includes("youtube.com");
        const url = new URL(tab.url);
        const title = cleanTitle(tab.title, url.href);
        let textToCopy = "";

        if (config === OPTIONS.TITLE) {
          textToCopy = title;
        } else if (config === OPTIONS.URL) {
          textToCopy = isYouTubeVideo
            ? createYouTubeURL(url)
            : getURlWithoutSearchParams(url);
        } else if (config === OPTIONS.YOUTUBE_OR_SPOTIFY_ID) {
          textToCopy = isYouTubeVideo
            ? url.searchParams.get("v")
            : url.pathname.replace("/track/", "");
        } else if (config === OPTIONS.WEBSITE_READINGS_PAGE) {
          textToCopy = JSON.stringify({
            title,
            author: "",
            url: getURlWithoutSearchParams(url),
            date: getCurrentDate(),
            done: false,
            starred: false,
          });
        } else if (config.includes("NOTION")) {
          textToCopy = `**[${title} | [${getHostName(url)}]](${
            config === OPTIONS.NOTION_WITH_SEARCH_PARAMS
              ? url.href
              : isYouTubeVideo
              ? createYouTubeURL(url)
              : getURlWithoutSearchParams(url)
          })**`;
        } else if (config === OPTIONS.WEBSITE_MUSIC_PAGE) {
          textToCopy = JSON.stringify({
            order: 0,
            text: title,
            url: isYouTubeVideo
              ? createYouTubeURL(url)
              : getURlWithoutSearchParams(url),
            source: isYouTubeVideo
              ? "youtube"
              : url.href.includes("lacuerda")
              ? "lacuerda"
              : url.href.includes("instagram")
              ? "instagram"
              : "url",
          });
        } else if (config === OPTIONS.WEBSITE_FILMS_PAGE) {
          const isNetflixFilm = url.href.includes("netflix.com");
          const id = (
            isNetflixFilm
              ? url.searchParams.get("jbv")
              : isYouTubeVideo
              ? url.searchParams.get("v")
              : ""
          ).toLowerCase();

          textToCopy = JSON.stringify({
            id,
            title,
            type: "",
            source: isNetflixFilm ? "Netflix" : "YouTube",
            calification: 3,
            categories: [],
            added_date: getCurrentDate(),
            is_public: false,
            cover: `{{url}}/pages/personal/[page]/films/assets/${id}.jpg`,
          });
        } else if (config === OPTIONS.WEBSITE_BOOKS_PAGE) {
          const id = generateSlug(title);

          textToCopy = JSON.stringify({
            id,
            title,
            author: "",
            year: 2000,
            calification: 3,
            added_date: getCurrentDate(),
            url: getURlWithoutSearchParams(url),
            is_public: false,
            cover: `{{url}}/pages/personal/[page]/books/assets/${id}.jpg`,
          });
        } else if (config === OPTIONS.WEBSITE_CONTACTS_PAGE) {
          textToCopy = JSON.stringify({
            id: generateSlug(title),
            name: title,
            phone: "",
            instagram: replaceAll(url.pathname, "/", ""),
            maps: "",
            menu: "",
          });
        }

        await navigator.clipboard.writeText(textToCopy);
        console.log(textToCopy);

        $textNode.innerHTML = "copied";
        setTimeout(() => {
          $textNode.innerHTML = "";
        }, 2000);
      } catch (error) {
        console.error(error);
        $textNode.innerHTML = error.message;
        $textNode.classList.add("error");
      }
    });
  };
}

// --- Utils ---

function getHostName(url) {
  if (url.href.includes("google.com/maps")) {
    return "maps.google.com";
  }

  return url.host.replace("www.", "");
}

function cleanTitle(title, href) {
  if (title.includes("Fotos y videos de Instagram")) {
    return title.substring(0, title.lastIndexOf(")")) + ")";
  }

  if (href.includes("twitter.com")) {
    return (
      title
        .split(" ")
        .filter((item) => item.includes("https") === false)
        .join(" ")
        .replace(" / Twitter", '"')
        .replace('""', '"')
        .split("en Twitter:")[1] || ""
    ).trim();
  }

  return title
    .replace(" - Netflix", "")
    .replace(" - YouTube", "")
    .replace(" - Google Maps", "");
}

function createYouTubeURL(url) {
  return `https://youtu.be/${url.searchParams.get("v")}${
    url.searchParams.get("t") ? `?t=${url.searchParams.get("t")}` : ""
  }`;
}

function getCurrentDate() {
  const addPadding = (number) => (number < 10 ? `0${number}` : number);
  const newDate = new Date();

  return `${newDate.getFullYear()}/${addPadding(
    newDate.getMonth() + 1
  )}/${addPadding(newDate.getDate())}`;
}

function getURlWithoutSearchParams(url) {
  return `${url.origin}${url.pathname}`;
}

function generateSlug(str) {
  let result = str.replace(/^\s+|\s+$/g, "").toLowerCase();

  // remove accents, swap ñ for n, etc
  const FROM = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const TO = "aaaaeeeeiiiioooouuuunc------";

  createArray(FROM.length).forEach((i) => {
    result = replaceAll(result, FROM.charAt(i), TO.charAt(i));
  });

  result = result
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return result;
}

function createArray(length, start) {
  return Array.from(Array(length).keys()).map(
    (value) => value + (start === undefined ? 1 : start)
  );
}

function replaceAll(str, toReplace, replacement = "") {
  return str.replace(new RegExp(escapeRegExp(toReplace), "g"), replacement);
}

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
