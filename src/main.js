// --- VARS ---

const OPTIONS = {
  TITLE: "TITLE",
  URL: "URL",
  NOTION: "NOTION",
  WEBSITE_MUSIC_PAGE: "WEBSITE_MUSIC_PAGE",
  YOUTUBE_OR_SPOTIFY_ID: "YOUTUBE_OR_SPOTIFY_ID",
  WEBSITE_FILMS_PAGE: "WEBSITE_FILMS_PAGE",
  WEBSITE_BOOKS_PAGE: "WEBSITE_BOOKS_PAGE",
  WEBSITE_CONTACTS_PAGE: "WEBSITE_CONTACTS_PAGE",
  WEBSITE_READINGS_PAGE: "WEBSITE_READINGS_PAGE",

  // NOTE: ARLENE CODE
  // CLICK_UP_TASK: "CLICK_UP_TASK",
  // CLICK_UP_BRANCH: "CLICK_UP_BRANCH",
  // ARLENE_URL: "ARLENE_URL",
};
let errorTimeout = null;

// --- LISTENERS ---

document.addEventListener("DOMContentLoaded", () => {
  // --- BUTTONS SETUP ---
  const buttons = document.getElementsByTagName("button");
  const optionsKeys = Object.keys(OPTIONS);

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handleButtonClick(optionsKeys[i]));
  }

  // --- CHECKBOXES SETUP ---
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", onCheckboxChange);
    checkboxes[i].checked =
      stringToBoolean(window.localStorage.getItem(checkboxes[i].id)) || false;
  }
});

// --- HANDLERS ---

function handleButtonClick(config) {
  return async function handleButtonClick() {
    chrome.tabs.getSelected(null, async function (tab) {
      const withQueryStringsOption = document.getElementById(
        "checkbox-with-query-strings"
      ).checked;
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
          textToCopy = parseURL(url, {
            WITH_QUERY_STRINGS: withQueryStringsOption,
          });
        } else if (config === OPTIONS.YOUTUBE_OR_SPOTIFY_ID) {
          textToCopy = isYouTubeVideo
            ? url.searchParams.get("v")
            : url.pathname.replace("/track/", "");
        } else if (config === OPTIONS.WEBSITE_READINGS_PAGE) {
          textToCopy = JSON.stringify({
            title,
            url: parseURL(url),
            author: "",
            date: getCurrentDate(),
            starred: false,
          });
        } else if (config === OPTIONS.NOTION) {
          textToCopy = `**[${title} | [${getHostName(url)}]](${parseURL(url, {
            WITH_QUERY_STRINGS: withQueryStringsOption,
          })})**`;
        } else if (config === OPTIONS.WEBSITE_MUSIC_PAGE) {
          textToCopy = JSON.stringify({
            text: title,
            url: parseURL(url, {
              WITH_QUERY_STRINGS: withQueryStringsOption,
            }),
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
            url: parseURL(url, {
              WITH_QUERY_STRINGS: withQueryStringsOption,
            }),
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

        /*
        NOTE: ARLENE CODE
        else if (config === OPTIONS.CLICK_UP_TASK) {
          const taskId = url.pathname.split("/").reverse()[0];
          const taskTitle = title.split(" | ").reverse().slice(1).join(" | ");
          textToCopy = `- Click-up task: [${taskId}](${url.href}) | ${taskTitle}`;
        } else if (config === OPTIONS.CLICK_UP_BRANCH) {
          const taskId = url.pathname.split("/").reverse()[0];
          const taskTitle = generateSlug(
            title.split(" | ").reverse().slice(1).join(" | ")
          );
          textToCopy = `git checkout -b ${taskId}-${taskTitle}`;
        } else if (config === OPTIONS.ARLENE_URL) {
          textToCopy = generateArleneURL(url.href);
        }
        */

        await navigator.clipboard.writeText(textToCopy);
        console.log(textToCopy);

        $textNode.innerHTML = "copied";

        if (errorTimeout) {
          errorTimeout = clearTimeout(errorTimeout);
        }

        errorTimeout = setTimeout(() => {
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

function onCheckboxChange(event) {
  window.localStorage.setItem(event.target.id, event.target.checked);
}

// --- UTILS ---

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

function parseURL(url, options = { WITH_QUERY_STRINGS: false }) {
  if (options.WITH_QUERY_STRINGS) {
    return url.href;
  }

  const WHITELIST_PARAMS = ["v", "viewkey", "t"];
  const params = new URLSearchParams(url.search);
  const parsedParams = [];

  for (let [param, paramValue] of params) {
    if (WHITELIST_PARAMS.includes(param)) {
      parsedParams.push(
        `${encodeURIComponent(param)}=${encodeURIComponent(paramValue)}`
      );
    }
  }

  return `${url.origin}${url.pathname}${
    url.hash.includes(":~:text=") ? "" : url.hash
  }${parsedParams.length > 0 ? `?${parsedParams.join("&")}` : ""}`;
}

function getCurrentDate() {
  const addPadding = (number) => (number < 10 ? `0${number}` : number);
  const newDate = new Date();

  return `${newDate.getFullYear()}/${addPadding(
    newDate.getMonth() + 1
  )}/${addPadding(newDate.getDate())}`;
}

function generateArleneURL(href) {
  const arleneEditorsLocalhost = {
    ["3002"]: ["http://localhost:3002", "/360/"],
    ["3003"]: ["http://localhost:3003", "/"],
    ["3004"]: ["http://localhost:3004", "/vto/"],
    ["3005"]: ["http://localhost:3005", "/web-ar/"],
  };
  const arleneEditorsDev = {
    ["/360/"]: ["https://editor-dev.objct.io/360", "3002"],
    ["/vto/"]: ["https://editor-dev.objct.io/vto", "3004"],
    ["/web-ar/"]: ["https://editor-dev.objct.io/web-ar", "3005"],
    ["/"]: ["https://editor-dev.objct.io", "3003"],
  };
  const isLocalhostURL = href.includes("http://localhost:");

  if (isLocalhostURL) {
    for (const projectType in arleneEditorsLocalhost) {
      if (href.includes(projectType)) {
        const [localhostURL, devURLId] = arleneEditorsLocalhost[projectType];
        return href.replace(localhostURL, arleneEditorsDev[devURLId][0]);
      }
    }
  } else {
    for (const projectType in arleneEditorsDev) {
      if (href.includes(projectType)) {
        const [devURL, localhostURLId] = arleneEditorsDev[projectType];
        return href.replace(devURL, arleneEditorsLocalhost[localhostURLId][0]);
      }
    }
  }

  throw new Error("Invalid Arlene URL");
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

function stringToBoolean(input) {
  return input === "true" ? true : false;
}
