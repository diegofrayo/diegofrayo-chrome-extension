// src/@diegofrayo/utils/strings.ts
function addLeftPadding(number) {
  return `${number < 10 ? "0" : ""}${number}`;
}

// src/scripts/bets/utils.ts
function formatDate(dateInput) {
  const date = new Date(dateInput);
  return `${date.getFullYear()}/${addLeftPadding(date.getMonth() + 1)}/${addLeftPadding(
    date.getDate()
  )}`;
}
function getTextContent(element) {
  if (!element) {
    return "";
  }
  const TEXT_NODE = 3;
  let text = "";
  for (let i = 0; i < element.childNodes.length; ++i) {
    if (element.childNodes[i].nodeType === TEXT_NODE) {
      text += element.childNodes[i].textContent || "";
    }
  }
  return text.trim();
}
function parseHTML(html) {
  return new DOMParser().parseFromString(html, "text/html");
}

// src/scripts/bets/rushbet.ts
var Rushbet = class {
  constructor() {
    this.COMMON_SELECTORS = {
      BETS: ".KambiBC-react-collapsable-container",
      BET_TYPE: ".KambiBC-my-bets-summary__coupon-top-left .KambiBC-my-bets-summary__title",
      BET_DATE: ".KambiBC-my-bets-summary__coupon-top-right .KambiBC-my-bets-summary__coupon-date",
      BET_NAME: ".KambiBC-my-bets-summary__coupon-bottom-left .KambiBC-my-bets-summary-coupon__event-list-name > span",
      BET_TEAMS: ".KambiBC-my-bets-summary__coupon-bottom-left .KambiBC-my-bets-summary-coupon__outcome-name",
      BET_STAKE: ".KambiBC-my-bets-summary__coupon-bottom-right .KambiBC-my-bets-summary__stake-value",
      BET_PAYMENT: ".KambiBC-my-bets-summary__coupon-bottom-right .KambiBC-my-bets-summary-payout__value"
    };
    this.SIMPLE_BETS_SELECTORS = {
      BET_QUOTA: ".KambiBC-my-bets-summary__coupon-top-left .KambiBC-my-bets-summary__value .KambiBC-my-bets-summary__value"
    };
    this.MULTIPLE_BETS_SELECTORS = {
      BET_QUOTA: ".KambiBC-my-bets-summary__coupon-bottom-left .KambiBC-my-bets-summary__odds-bog .KambiBC-my-bets-summary__value",
      BET_ITEMS: ".KambiBC-my-bets-summary-coupon__event-list > div",
      BET_ITEM_QUOTA: ".KambiBC-my-bets-summary__value"
    };
    this.name = "rushbet";
  }
  getBetsElements(document) {
    return document.querySelectorAll(this.COMMON_SELECTORS.BETS);
  }
  getBetType(betElement) {
    const betType = getTextContent(betElement.querySelector(this.COMMON_SELECTORS.BET_TYPE));
    if (betType === "Sencilla") {
      return betType;
    }
    return "Combinada";
  }
  getBetDate(betElement) {
    return formatDate(
      (betElement.querySelector(this.COMMON_SELECTORS.BET_DATE)?.textContent || "").split(" \u2022 ")[0]
    );
  }
  getBetNameAndDetails(betElement, teamA, teamB) {
    const result = (betElement.querySelector(this.COMMON_SELECTORS.BET_NAME)?.textContent || "").split("@")[0].trim().split(":").map((item) => item.trim());
    const name = result[0];
    const details = result[1].replace("Menos de ", "<").replace("M\xE1s de ", ">").replace(teamA, "Local").replace(teamB, "Visitante");
    return [name, details];
  }
  getBetTeams(betElement) {
    const [teamA, teamB] = (betElement.querySelector(this.COMMON_SELECTORS.BET_TEAMS)?.textContent || "").split(" - ") || ["", ""];
    return [teamA, teamB];
  }
  getBetQuota(betType, betElement) {
    return Number(
      getTextContent(
        betElement.querySelector(
          betType === "Combinada" ? this.MULTIPLE_BETS_SELECTORS.BET_QUOTA : this.SIMPLE_BETS_SELECTORS.BET_QUOTA
        )
      )
    );
  }
  getBetStake(betElement) {
    const stake = Number(
      getTextContent(betElement.querySelector(this.COMMON_SELECTORS.BET_STAKE)).replace(".", "").replace("$", "")
    );
    return stake;
  }
  getBetPayment(betElement, stake) {
    const payment = Number(
      getTextContent(betElement.querySelector(this.COMMON_SELECTORS.BET_PAYMENT)).replace(".", "").replace("$", "")
    );
    if (payment) {
      return payment;
    }
    return stake * -1;
  }
  getMultipleBetItemsElements(betElement) {
    return betElement.querySelectorAll(this.MULTIPLE_BETS_SELECTORS.BET_ITEMS);
  }
  getBetItemQuota(betElement) {
    return Number(
      getTextContent(betElement.querySelector(this.MULTIPLE_BETS_SELECTORS.BET_ITEM_QUOTA))
    );
  }
  parseHTML(html) {
    return parseHTML(html);
  }
};
var rushbet_default = Rushbet;

// src/scripts/bets/bethouse.ts
var BetHouse = class {
  constructor(betHouse) {
    this.betHouse = betHouse;
  }
  extractBetsData(document, betHouseName) {
    const bets = [];
    this.betHouse.getBetsElements(document).forEach((betElement) => {
      const betType = this.betHouse.getBetType(betElement);
      if (betType === "Sencilla") {
        const date = this.betHouse.getBetDate(betElement);
        const [teamA, teamB] = this.betHouse.getBetTeams(betElement);
        const [name, details] = this.betHouse.getBetNameAndDetails(betElement, teamA, teamB);
        const quota = this.betHouse.getBetQuota(betType, betElement);
        const stake = this.betHouse.getBetStake(betElement);
        const payment = this.betHouse.getBetPayment(betElement, stake);
        const bet = {
          type: "Sencilla",
          date,
          name,
          details,
          teamA,
          teamB,
          quota,
          stake,
          payment
        };
        bets.push(bet);
      } else {
        const date = this.betHouse.getBetDate(betElement);
        const quota = this.betHouse.getBetQuota(betType, betElement);
        const stake = this.betHouse.getBetStake(betElement);
        const payment = this.betHouse.getBetPayment(betElement, stake);
        const bet = {
          type: "Combinada",
          date,
          quota,
          stake,
          payment,
          bets: []
        };
        this.betHouse.getMultipleBetItemsElements(betElement).forEach((betElement2) => {
          const [teamA, teamB] = this.betHouse.getBetTeams(betElement2);
          const [name, details] = this.betHouse.getBetNameAndDetails(betElement2, teamA, teamB);
          const quota2 = this.betHouse.getBetItemQuota(betElement2);
          bet.bets.push({
            name,
            details,
            teamA,
            teamB,
            quota: quota2
          });
        });
        bets.push(bet);
      }
    });
    return this.toCSV(bets, betHouseName);
  }
  parseHTML(html) {
    return this.betHouse.parseHTML(html);
  }
  toCSV(bets, betHouseName) {
    bets.map((bet, index) => {
      if (bet.type === "Combinada") {
        return bet.bets.map((betItem) => {
          return [
            index,
            betItem.teamA,
            betItem.teamB,
            betItem.name,
            betItem.details,
            bet.quota,
            bet.date,
            betHouseName,
            "NO",
            "",
            bet.stake,
            bet.payment
          ].join(";");
        }).join("\n");
      }
      return [
        index,
        bet.teamA,
        bet.teamB,
        bet.name,
        bet.details,
        bet.quota,
        bet.date,
        betHouseName,
        "NO",
        "",
        bet.stake,
        bet.payment
      ].join(";");
    }).join("\n");
  }
};
var bethouse_default = BetHouse;

// src/scripts/bets/index.ts
var BetsService = {
  readBets: function readBets(betHouseName, domHTML) {
    const BetHouse2 = new bethouse_default(betHouseName === "rushbet" ? new rushbet_default() : new rushbet_default());
    const bets = BetHouse2.extractBetsData(BetHouse2.parseHTML(domHTML), betHouseName);
    return bets;
  }
};
export {
  BetsService
};
//# sourceMappingURL=bets.js.map
