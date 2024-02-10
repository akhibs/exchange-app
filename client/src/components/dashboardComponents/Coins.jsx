import { useEffect, useReducer } from "react";
import styles from "./../../css/dashboard/Coins.module.css";
import coinPrice from "../../utilities/coinsData";
import CoinTile from "./CoinTile";
import CoinContext from "../../context/CoinContext";

const initialState = {
  bitcoin: {
    name: "Bitcoin",
    alias: "Btc",
    price: "0.000",
    logo: "/crypto-logos/bitcoin-logo.png",
  },
  ethereum: {
    name: "Ethereum",
    alias: "Eth",
    price: "0.000",
    logo: "/crypto-logos/ethereum-logo.png",
  },
  binancecoin: {
    name: "Binance Coin",
    alias: "Bnb",
    price: "0.000",
    logo: "/crypto-logos/binancecoin-logo.png",
  },
  ripple: {
    name: "Ripple",
    alias: "xrp",
    price: "0.000",
    logo: "/crypto-logos/ripple-logo.png",
  },
  solana: {
    name: "Solana",
    alias: "sol",
    price: "0.000",
    logo: "/crypto-logos/solana-logo.png",
  },
  cardano: {
    name: "Cardano",
    alias: "ada",
    price: "0.000",
    logo: "/crypto-logos/cardano-logo.png",
  },
  dogecoin: {
    name: "Dogecoin",
    alias: "doge",
    price: "0.000",
    logo: "/crypto-logos/dogecoin-logo.png",
  },
  tron: {
    name: "Tron",
    alias: "trx",
    price: "0.000",
    logo: "/crypto-logos/tron-logo.png",
  },

  chainlink: {
    name: "Chainlink",
    alias: "link",
    price: "0.000",
    logo: "/crypto-logos/chainlink-logo.png",
  },

  litecoin: {
    name: "Litecoin",
    alias: "ltc",
    price: "0.000",
    logo: "/crypto-logos/litecoin-logo.png",
  },
  lastPrice: {
    bitcoin: 0,
    ethereum: 0,
    binancecoin: 0,
    ripple: 0,
    solana: 0,
    cardano: 0,
    dogecoin: 0,
    tron: 0,
    chainlink: 0,
    litecoin: 0,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "bitcoin":
      return {
        ...state,
        bitcoin: {
          ...state.bitcoin,
          price: action.payload[0],
        },
      };
    case "ethereum":
      return {
        ...state,
        ethereum: {
          ...state.ethereum,
          price: action.payload[0],
        },
      };
    case "binancecoin":
      return {
        ...state,
        binancecoin: {
          ...state.binancecoin,
          price: action.payload[0],
        },
      };
    case "ripple":
      return {
        ...state,
        ripple: {
          ...state.ripple,
          price: action.payload[0],
        },
      };
    case "solana":
      return {
        ...state,
        solana: {
          ...state.solana,
          price: action.payload[0],
        },
      };
    case "cardano":
      return {
        ...state,
        cardano: {
          ...state.cardano,
          price: action.payload[0],
        },
      };
    case "dogecoin":
      return {
        ...state,
        dogecoin: {
          ...state.dogecoin,
          price: action.payload[0],
        },
      };
    case "tron":
      return {
        ...state,
        tron: {
          ...state.tron,
          price: action.payload[0],
        },
      };
    case "chainlink":
      return {
        ...state,
        chainlink: {
          ...state.chainlink,
          price: action.payload[0],
        },
      };
    case "litecoin":
      return {
        ...state,
        litecoin: {
          ...state.litecoin,
          price: action.payload[0],
        },
      };
    case "lastPrice":
      return {
        ...state,
        lastPrice: {
          bitcoin: action.payload[0],
          ethereum: action.payload[1],
          binancecoin: action.payload[2],
          ripple: action.payload[3],
          solana: action.payload[4],
          cardano: action.payload[5],
          dogecoin: action.payload[6],
          tron: action.payload[7],
          chainlink: action.payload[8],
          litecoin: action.payload[9],
        },
      };
    default:
      break;
  }
}

export default function Coins() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //=========================
  useEffect(() => {
    const timer = setInterval(() => {
      coinPrice().then((e) => {
        if (e === "failed") {
          dispatch({ type: "bitcoin", payload: ["loading"] });
          dispatch({ type: "ethereum", payload: ["loading"] });
          dispatch({
            type: "binancecoin",
            payload: ["loading"],
          });
          dispatch({ type: "ripple", payload: ["loading"] });
          dispatch({ type: "solana", payload: ["loading"] });
          dispatch({ type: "cardano", payload: ["loading"] });
          dispatch({ type: "dogecoin", payload: ["loading"] });
          dispatch({ type: "tron", payload: ["loading"] });
          dispatch({ type: "chainlink", payload: ["loading"] });
          dispatch({ type: "litecoin", payload: ["loading"] });
        } else {
          dispatch({
            type: "bitcoin",
            payload: [e.bitcoin.usd],
          });
          dispatch({
            type: "ethereum",
            payload: [e.ethereum.usd],
          });
          dispatch({
            type: "binancecoin",
            payload: [e.binancecoin.usd],
          });
          dispatch({
            type: "ripple",
            payload: [e.ripple.usd],
          });
          dispatch({
            type: "solana",
            payload: [e.solana.usd],
          });
          dispatch({
            type: "cardano",
            payload: [e.cardano.usd],
          });
          dispatch({
            type: "dogecoin",
            payload: [e.dogecoin.usd],
          });
          dispatch({
            type: "tron",
            payload: [e.tron.usd],
          });
          dispatch({
            type: "chainlink",
            payload: [e.chainlink.usd],
          });
          dispatch({
            type: "litecoin",
            payload: [e.litecoin.usd],
          });
        }
      });

      dispatch({
        type: "lastPrice",
        payload: [
          state.bitcoin.price,
          state.ethereum.price,
          state.binancecoin.price,
          state.ripple.price,
          state.solana.price,
          state.cardano.price,
          state.dogecoin.price,
          state.tron.price,
          state.chainlink.price,
          state.litecoin.price,
        ],
      });
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [
    state.lastPrice.bitcoin,
    state.lastPrice.dogecoin,
    state.bitcoin.price,
    state.tron.price,
    state.chainlink.price,
    state.cardano.price,
    state.binancecoin.price,
    state.dogecoin.price,
    state.litecoin.price,
    state.ethereum.price,
    state.ripple.price,
    state.solana.price,
  ]);
  //=========================

  return (
    <div className={styles.Coins}>
      <CoinContext.Provider
        value={{ data: state.bitcoin, lastPrice: state.lastPrice.bitcoin }}
      >
        <CoinTile />
      </CoinContext.Provider>
      <CoinContext.Provider
        value={{ data: state.ethereum, lastPrice: state.lastPrice.ethereum }}
      >
        <CoinTile />
      </CoinContext.Provider>
      <CoinContext.Provider
        value={{
          data: state.binancecoin,
          lastPrice: state.lastPrice.binancecoin,
        }}
      >
        <CoinTile />
      </CoinContext.Provider>
      <CoinContext.Provider
        value={{
          data: state.ripple,
          lastPrice: state.lastPrice.ripple,
        }}
      >
        <CoinTile />
      </CoinContext.Provider>
      <CoinContext.Provider
        value={{
          data: state.solana,
          lastPrice: state.lastPrice.solana,
        }}
      >
        <CoinTile />
      </CoinContext.Provider>
      <CoinContext.Provider
        value={{
          data: state.cardano,
          lastPrice: state.lastPrice.cardano,
        }}
      >
        <CoinTile />
      </CoinContext.Provider>
      <CoinContext.Provider
        value={{
          data: state.dogecoin,
          lastPrice: state.lastPrice.dogecoin,
        }}
      >
        <CoinTile />
      </CoinContext.Provider>
      <CoinContext.Provider
        value={{
          data: state.tron,
          lastPrice: state.lastPrice.tron,
        }}
      >
        <CoinTile />
      </CoinContext.Provider>
      <CoinContext.Provider
        value={{
          data: state.chainlink,
          lastPrice: state.lastPrice.binancecoin,
        }}
      >
        <CoinTile />
      </CoinContext.Provider>
      <CoinContext.Provider
        value={{
          data: state.litecoin,
          lastPrice: state.lastPrice.litecoin,
        }}
      >
        <CoinTile />
      </CoinContext.Provider>
    </div>
  );
}
