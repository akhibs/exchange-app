export default async function coinPrice() {
  try {
    const req = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Cripple%2Csolana%2Ccardano%2Cdogecoin%2Ctron%2Cchainlink%2Clitecoin&vs_currencies=usd"
    );
    const res = await req.json();

    return res;
  } catch (err) {
    return "failed";
  }
}
