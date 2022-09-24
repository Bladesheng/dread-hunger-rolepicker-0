export const Storage = (() => {
  let selectedPlayers: string[];
  let unselectedPlayers: string[];

  // save everything to local storage
  function _save() {
    localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
    localStorage.setItem("unselectedPlayers", JSON.stringify(unselectedPlayers));
  }

  // retrieve everything from local storage
  function init() {
    // default values
    selectedPlayers = ["Mazarini"];
    unselectedPlayers = [
      "Rewerend",
      "Majklicek",
      "Zwejra",
      "Čuson",
      "Dejv",
      "Timko",
      "Enoušek",
      "Sworde",
      "Pizzak",
      "Desde",
      "BaBca",
      "eRko"
    ];

    // if there is something saved,
    // retrieve it instead of using the default values
    const retrievedSelectedPlayers = localStorage.getItem("selectedPlayers");
    const retrievedUnselectedPlayers = localStorage.getItem("unselectedPlayers");

    if (retrievedSelectedPlayers !== null) {
      selectedPlayers = JSON.parse(retrievedSelectedPlayers);
    }
    if (retrievedUnselectedPlayers !== null) {
      unselectedPlayers = JSON.parse(retrievedUnselectedPlayers);
    }
  }

  return {
    init,

    set selectedPlayers(playersArr: string[]) {
      selectedPlayers = playersArr;
      _save();
    },
    get selectedPlayers() {
      return selectedPlayers;
    },

    set unselectedPlayers(playersArr: string[]) {
      unselectedPlayers = playersArr;
      _save();
    },
    get unselectedPlayers() {
      return unselectedPlayers;
    }
  };
})();
