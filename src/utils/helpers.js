export const calcTime = time => {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h ${mins}m`;
  };
  
  export const convertMoney = money => {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0
    });
    return formatter.format(money);
  };

  export const ALLMOVIES_APP_LOGGEDIN = "ALLMOVIES_APP_LOGGEDIN";

  export const renderLogin = () => {
    const isLogged = !!localStorage.getItem(ALLMOVIES_APP_LOGGEDIN); //!!pour vérifier si on retourne un booléen
    console.log('isLogged', isLogged);
    return isLogged;
  }

//Constante pour activer l'abonnement et le paiement
export const ENABLE_SUBSCRIPTION = false;