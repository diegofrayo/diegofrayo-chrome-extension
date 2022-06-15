document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.getElementsByTagName("button");

  buttons[0].addEventListener("click", handleButtonClick("no-search-params"));
  buttons[1].addEventListener("click", handleButtonClick("with-search-params"));
});

function handleButtonClick(config) {
  return async function handleButtonClick() {
    const $textNode = document.getElementsByTagName("p")[0];

    try {
      $textNode.innerHTML = "";

      chrome.tabs.getSelected(null, async function (tab) {
        const url = new URL(tab.url);

        const textToCopy = `**[${tab.title} | [${url.host.replace(
          "www.",
          ""
        )}]](${
          config === "no-search-params"
            ? `${url.origin}${url.pathname}`
            : url.href
        })**`;

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
