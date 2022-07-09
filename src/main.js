const OPTIONS = {
  URL: "URL",
  NOTION: "NOTION",
  NOTION_WITH_SEARCH_PARAMS: "NOTION_WITH_SEARCH_PARAMS",
  MY_WEBSITE: "MY_WEBSITE",
  MY_WEBSITE_MUSIC_PAGE: "MY_WEBSITE_MUSIC_PAGE",
};

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.getElementsByTagName("button");

  buttons[0].addEventListener("click", handleButtonClick(OPTIONS.URL));
  buttons[1].addEventListener("click", handleButtonClick(OPTIONS.NOTION));
  buttons[2].addEventListener(
    "click",
    handleButtonClick(OPTIONS.NOTION_WITH_SEARCH_PARAMS)
  );
  buttons[3].addEventListener("click", handleButtonClick(OPTIONS.MY_WEBSITE));
  buttons[4].addEventListener(
    "click",
    handleButtonClick(OPTIONS.MY_WEBSITE_MUSIC_PAGE)
  );
});

function handleButtonClick(config) {
  return async function handleButtonClick() {
    chrome.tabs.getSelected(null, async function (tab) {
      const $textNode = document.getElementsByTagName("p")[0];
      $textNode.innerHTML = "";

      try {
        const isYouTubeVideo = tab.url.includes("youtube.com");
        const url = new URL(tab.url);
        let textToCopy = "";

        if (config === OPTIONS.URL) {
          textToCopy = `${url.origin}${url.pathname}`;
        } else if (config === OPTIONS.MY_WEBSITE) {
          const newDate = new Date();
          const addPadding = (number) => (number < 10 ? `0${number}` : number);

          textToCopy = JSON.stringify({
            title: tab.title,
            url: url.href.replace("www.", ""),
            date: `${newDate.getFullYear()}/${addPadding(
              newDate.getMonth() + 1
            )}/${addPadding(newDate.getDate())}`,
            done: false,
            starred: false,
          });
        } else if (config.includes("NOTION")) {
          textToCopy = `**[${tab.title} | [${url.host.replace("www.", "")}]](${
            isYouTubeVideo
              ? `https://youtu.be/${url.searchParams.get("v")}`
              : config === OPTIONS.NOTION_WITH_SEARCH_PARAMS
              ? url.href
              : `${url.origin}${url.pathname}`
          })**`;
        } else if (config === OPTIONS.MY_WEBSITE_MUSIC_PAGE) {
          textToCopy = JSON.stringify({
            order: 0,
            text: isYouTubeVideo
              ? tab.title.replace(" - YouTube", "")
              : tab.title,
            url: isYouTubeVideo
              ? `https://youtu.be/${url.searchParams.get("v")}`
              : `${url.origin}${url.pathname}`,
            source: isYouTubeVideo
              ? "youtube"
              : url.href.includes("lacuerda")
              ? "lacuerda"
              : url.href.includes("instagram")
              ? "instagram"
              : "url",
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
      }
    });
  };
}
