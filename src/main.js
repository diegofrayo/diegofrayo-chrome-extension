// --- IMPORTS ---

import { BetsService } from "./lib/bets.js";

// --- VARS ---

const OPTIONS = {
	NOTION: "NOTION",
	TITLE: "TITLE",
	URL: "URL",
	WEBSITE_MUSIC_PAGE: "WEBSITE_MUSIC_PAGE",
	WEBSITE_CONTACTS_PAGE: "WEBSITE_CONTACTS_PAGE",
	WEBSITE_FILMS_PAGE: "WEBSITE_FILMS_PAGE",
	WEBSITE_BOOKS_PAGE: "WEBSITE_BOOKS_PAGE",
	YOUTUBE_OR_SPOTIFY_ID: "YOUTUBE_OR_SPOTIFY_ID",
	BETS: "BETS",
};
let errorTimeout = null;

// --- LISTENERS ---

document.addEventListener("DOMContentLoaded", () => {
	// --- INPUTS SETUP ---
	document.querySelector("input[type='date']").value =
		window.localStorage.getItem("LAST_DATE") || "";
	document.querySelector("input[type='number']").value =
		window.localStorage.getItem("LAST_ID") || 0;

	const inputs = document.querySelectorAll(".bets input");

	for (let i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener("change", onInputChange);
	}

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
		checkboxes[i].checked = stringToBoolean(window.localStorage.getItem(checkboxes[i].id)) || false;
	}
});

// --- HANDLERS ---

function handleButtonClick(config) {
	return async function handleButtonClick() {
		const $textNode = document.getElementsByTagName("p")[0];
		$textNode.innerHTML = "";
		$textNode.classList.remove("error");

		try {
			const browser = getBrowser();
			const [tab] = await browser.tabs.query({ currentWindow: true, active: true });

			const withQueryStringsOption = document.getElementById("checkbox-with-query-strings").checked;

			const isYouTubePage = tab.url.includes("youtube.com");
			const url = new URL(tab.url);
			const title = cleanTitle(tab.title, url.href);
			let textToCopy = "";

			if (config === OPTIONS.TITLE) {
				textToCopy = title;
			} else if (config === OPTIONS.URL) {
				textToCopy = parseURL(url, {
					withQueryStrings: withQueryStringsOption,
				});
			} else if (config === OPTIONS.YOUTUBE_OR_SPOTIFY_ID) {
				textToCopy = isYouTubePage ? url.searchParams.get("v") : url.pathname.split("/track/")[1];
			} else if (config === OPTIONS.NOTION) {
				textToCopy = `**[${title} | [${getHostName(url)}]](${parseURL(url, {
					withQueryStrings: withQueryStringsOption,
					isYouTubePage,
				})})**`;
			} else if (config === OPTIONS.WEBSITE_MUSIC_PAGE) {
				textToCopy = JSON.stringify({
					text: title,
					url: parseURL(url, {
						withQueryStrings: withQueryStringsOption,
						isYouTubePage,
					}),
					source: isYouTubePage
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
					(isNetflixFilm
						? url.searchParams.get("jbv")
						: isYouTubePage
						? url.searchParams.get("v")
						: "") || ""
				).toLowerCase();

				textToCopy = JSON.stringify({
					id,
					title,
					type: "",
					source: isNetflixFilm ? "Netflix" : "YouTube",
					calification: 3,
					categories: [],
					added_date: getCurrentDate(),
					is_public: true,
					url: "",
					cover: `/assets/images/pages/apps/films/assets/${id}.jpg`,
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
						withQueryStrings: withQueryStringsOption,
						isYouTubePage,
					}),
					is_public: true,
					cover: `/assets/images/pages/apps/books/${id}.jpg`,
				});
			} else if (config === OPTIONS.WEBSITE_CONTACTS_PAGE) {
				textToCopy = JSON.stringify({
					id: generateSlug(title),
					name: title,
					phone: "",
					instagram: replaceAll(url.pathname, "/", ""),
					maps: "",
					menu: "",
					country: "CO",
				});
			} else if (config === OPTIONS.BETS) {
				textToCopy = await bets(browser, tab);
			}

			await navigator.clipboard.writeText(textToCopy);
			console.log(textToCopy);

			$textNode.innerHTML = "Copied to the clipboard!";

			if (errorTimeout) {
				errorTimeout = clearTimeout(errorTimeout);
			}

			errorTimeout = setTimeout(() => {
				$textNode.innerHTML = "";
			}, 2000);
		} catch (error) {
			console.error(error);
			$textNode.innerHTML = `Error: ${error.message}`;
			$textNode.title = `Error: ${error.message}`;
			$textNode.classList.add("error");
		}
	};
}

function onInputChange(event) {
	window.localStorage.setItem(event.target.getAttribute("data-ls-key"), event.target.value);
}

function onCheckboxChange(event) {
	window.localStorage.setItem(event.target.id, event.target.checked);
}

// --- UTILS ---

function getBrowser() {
	if (typeof chrome !== "undefined") {
		if (typeof browser !== "undefined") {
			return browser;
		} else {
			return chrome;
		}
	}

	throw new Error(`Invalid browser`);
}

function getHostName(url) {
	if (url.href.includes("google.com/maps")) {
		return "maps.google.com";
	}

	return url.host.replace("www.", "");
}

function cleanTitle(title, href) {
	if (href.includes("instagram.com")) {
		return title.split(" | Instagram")[0];
	}

	if (
		href.includes(".twitter.com") ||
		href.includes("/twitter.com") ||
		href.includes(".x.com") ||
		href.includes("/x.com")
	) {
		return (
			title
				.split(" ")
				.filter((item) => item.includes("https") === false)
				.join(" ")
				.replace(" / X", '"')
				.replace('""', '"')
				.split("en X:")[1] || ""
		).trim();
	}

	return title.replace(" - Netflix", "").replace(" - YouTube", "").replace(" - Google Maps", "");
}

function parseURL(url, options = { withQueryStrings: false, isYouTubePage }) {
	if (options.withQueryStrings) {
		// return url.href;
		return url.href.split("#:~:text=")[0];
	}

	const WHITELIST_PARAMS = ["v", "viewkey", "t"];
	const params = new URLSearchParams(url.search);
	const parsedParams = [];

	for (let [param, paramValue] of params) {
		if (WHITELIST_PARAMS.includes(param)) {
			parsedParams.push(`${encodeURIComponent(param)}=${encodeURIComponent(paramValue)}`);
		}
	}

	const isYouTubeVideo = params.get("v") !== null;
	if (options.isYouTubePage && isYouTubeVideo) {
		return `https://youtu.be/${url.searchParams.get("v")}${
			url.searchParams.get("t") ? `?t=${url.searchParams.get("t")}` : ""
		}`;
	}

	return `${url.origin}${url.pathname}${url.hash.includes(":~:text=") ? "" : url.hash}${
		parsedParams.length > 0 ? `?${parsedParams.join("&")}` : ""
	}`;
}

function getCurrentDate() {
	const addPadding = (number) => (number < 10 ? `0${number}` : number);
	const newDate = new Date();

	return `${newDate.getFullYear()}/${addPadding(newDate.getMonth() + 1)}/${addPadding(
		newDate.getDate(),
	)}`;
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
	return Array.from(Array(length).keys()).map((value) => value + (start === undefined ? 1 : start));
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

function bets(browser, tab) {
	const isRushbet = tab.url.includes("rushbet");
	const betHouseName = isRushbet ? "rushbet" : "wplay";

	function getHTMLContent(betHouseName) {
		const SELECTORS = {
			rushbet: ".KambiBC-bethistory-tabs__panel",
		};

		return document.querySelector(SELECTORS[betHouseName]).innerHTML;
	}

	return browser.scripting
		.executeScript({
			target: {
				tabId: tab.id,
			},
			func: getHTMLContent,
			args: [betHouseName],
		})
		.then((results) => {
			const config = {
				betHouseName,
				lastBetDate: document.querySelector("input[type='date']").value || "",
				lastBetId: Number(document.querySelector("input[type='number']").value || 0),
			};

			window.localStorage.setItem("LAST_DATE", config.lastBetDate);
			window.localStorage.setItem("LAST_ID", config.lastBetId);

			return BetsService.readBets(results[0].result, config);
		});
}
