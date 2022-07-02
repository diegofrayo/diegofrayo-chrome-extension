const OPTIONS = {
  URL: "URL",
  NOTION: "NOTION",
  NOTION_WITH_SEARCH_PARAMS: "NOTION_WITH_SEARCH_PARAMS",
  MY_WEBSITE: "MY_WEBSITE",
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
});

function handleButtonClick(config) {
  return async function handleButtonClick() {
    const $textNode = document.getElementsByTagName("p")[0];

    try {
      $textNode.innerHTML = "";

      chrome.tabs.getSelected(null, async function (tab) {
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
        } else {
          const isYouTubeVideo = url.href.includes("youtube.com");

          textToCopy = `**[${tab.title} | [${url.host.replace("www.", "")}]](${
            config === OPTIONS.NOTION_WITH_SEARCH_PARAMS || isYouTubeVideo
              ? url.href
              : `${url.origin}${url.pathname}`
          })**`;
        }

        await navigator.clipboard.writeText(textToCopy);
        console.log(textToCopy);

        $textNode.innerHTML = "copied";
        setTimeout(() => {
          $textNode.innerHTML = "";
        }, 2000);
      });
    } catch (error) {
      console.error(error);
      $textNode.innerHTML = error.message;
    }
  };
}
