const formatBalance = (balance) => {
  return Math.round(100 * parseInt(balance) / 10 ** 18) / 100
}

export default formatBalance
