import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import campaigns from "../data/campaigns.json";
import { loadJourney, saveJourney } from "../services/journeyService";
import {
  advanceDay,
  changeCondition,
  createJourney,
  emptyJourney,
} from "../utils/travel";

// Estado global das viagens: { [idDaCampanha]: { trip, log, updatedAt } }.
// useReducer concentra as regras; o Context entrega o estado a qualquer tela.

const JourneyContext = createContext(null);

function setJourney(state, campaignId, journey) {
  // Carimbo sempre crescente: garante que toda mudança seja detectada e salva,
  // mesmo que duas ações caiam no mesmo milissegundo.
  const previous = state.journeys[campaignId]?.updatedAt ?? 0;
  return {
    ...state,
    journeys: {
      ...state.journeys,
      [campaignId]: {
        ...journey,
        updatedAt: Math.max(Date.now(), previous + 1),
      },
    },
  };
}

function reducer(state, action) {
  const current = state.journeys[action.campaignId] ?? emptyJourney;

  switch (action.type) {
    case "HYDRATE":
      return { ready: true, journeys: action.journeys };
    case "CREATE":
      return setJourney(state, action.campaignId, createJourney(action.form));
    case "CHANGE":
      return setJourney(
        state,
        action.campaignId,
        changeCondition(
          current,
          action.field,
          action.label,
          action.value,
          action.reason
        )
      );
    case "ADVANCE":
      return setJourney(state, action.campaignId, advanceDay(current));
    case "RESET":
      return setJourney(state, action.campaignId, {
        trip: null,
        log: [],
      });
    default:
      return state;
  }
}

export function JourneyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { ready: false, journeys: {} });
  const savedAt = useRef({});

  // 1) Ao abrir o app, carrega as viagens salvas (aparelho e/ou nuvem).
  useEffect(() => {
    let active = true;

    async function hydrate() {
      const entries = await Promise.all(
        campaigns.map(async (campaign) => [
          campaign.id,
          (await loadJourney(campaign.id)) ?? emptyJourney,
        ])
      );
      if (!active) return;

      entries.forEach(([id, journey]) => {
        savedAt.current[id] = journey.updatedAt;
      });
      dispatch({ type: "HYDRATE", journeys: Object.fromEntries(entries) });
    }

    hydrate();
    return () => {
      active = false;
    };
  }, []);

  // 2) Toda mudança de estado é salva automaticamente.
  useEffect(() => {
    if (!state.ready) return;
    Object.entries(state.journeys).forEach(([id, journey]) => {
      if (savedAt.current[id] !== journey.updatedAt) {
        savedAt.current[id] = journey.updatedAt;
        saveJourney(id, journey);
      }
    });
  }, [state]);

  const getJourney = useCallback(
    (campaignId) => state.journeys[campaignId] ?? emptyJourney,
    [state.journeys]
  );

  const value = useMemo(
    () => ({
      ready: state.ready,
      getJourney,
      createTrip: (campaignId, form) =>
        dispatch({ type: "CREATE", campaignId, form }),
      changeCondition: (campaignId, field, label, newValue, reason) =>
        dispatch({
          type: "CHANGE",
          campaignId,
          field,
          label,
          value: newValue,
          reason,
        }),
      advanceDay: (campaignId) => dispatch({ type: "ADVANCE", campaignId }),
      resetTrip: (campaignId) => dispatch({ type: "RESET", campaignId }),
    }),
    [state.ready, getJourney]
  );

  return (
    <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
  );
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error("useJourney precisa estar dentro de <JourneyProvider>.");
  }
  return context;
}
