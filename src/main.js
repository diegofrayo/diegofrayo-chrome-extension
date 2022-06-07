document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementsByTagName("button")[0]
    .addEventListener("click", async function handleCopyPageTitleClick() {
      const $textNode = document.getElementsByTagName("p")[0];

      try {
        $textNode.innerHTML = "";

        chrome.tabs.getSelected(null, async function (tab) {
          const url = new URL(tab.url);

          await navigator.clipboard.writeText(
            `**[${tab.title} | [${url.host.replace("www.", "")}]](${tab.url})**`
          );

          $textNode.innerHTML = "copied";
          setTimeout(() => {
            $textNode.innerHTML = "";
          }, 2000);
        });
      } catch (error) {
        console.error(error);
        $textNode.innerHTML = error.message;
      }
    });
});
