const formatBalance = (balance) => {
  return numberWithCommas(
    Math.round(100 * parseInt(balance) / 10 ** 18) / 100
  )
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default formatBalance
