import { config } from "./config";

type EventHandlerSetter = (this: HTMLElement, data: unknown) => void;

interface EventHandlerCreator {
  setup: EventHandlerSetter;
  update: EventHandlerSetter;
}

export function createEventHandler(rawEvent: string): EventHandlerCreator {
  const eventName = rawEvent.split(".")[0];
  const capture = rawEvent.includes(".capture");
  if (rawEvent.includes(".synthetic")) {
    return createSyntheticHandler(eventName, capture);
  } else {
    return createElementHandler(eventName, capture);
  }
}

// Native listener
let nextNativeEventId = 1;
function createElementHandler(evName: string, capture: boolean = false): EventHandlerCreator {
  let eventKey = `__event__${evName}_${nextNativeEventId++}`;
  if (capture) {
    eventKey = `${eventKey}_capture`;
  }

  function listener(ev: Event) {
    const currentTarget = ev.currentTarget;
    if (!currentTarget || !document.contains(currentTarget as HTMLElement)) return;
    const data = (currentTarget as HTMLElement & Record<string, unknown>)[eventKey];
    if (!data) return;
    config.mainEventHandler(data, ev, currentTarget);
  }

  function setup(this: HTMLElement, data: unknown) {
    (this as HTMLElement & Record<string, unknown>)[eventKey] = data;
    this.addEventListener(evName, listener, { capture });
  }

  function update(this: HTMLElement, data: unknown) {
    (this as HTMLElement & Record<string, unknown>)[eventKey] = data;
  }

  return { setup, update };
}

// Synthetic handler: a form of event delegation that allows placing only one
// listener per event type.
let nextSyntheticEventId = 1;
function createSyntheticHandler(evName: string, capture: boolean = false): EventHandlerCreator {
  let eventKey = `__event__synthetic_${evName}`;
  if (capture) {
    eventKey = `${eventKey}_capture`;
  }
  setupSyntheticEvent(evName, eventKey, capture);
  const currentId = nextSyntheticEventId++;
  function setup(this: HTMLElement, data: unknown) {
    const el = this as HTMLElement & Record<string, unknown>;
    const _data = (el[eventKey] as Record<number, unknown>) || {};
    _data[currentId] = data;
    el[eventKey] = _data;
  }
  return { setup, update: setup };
}

function nativeToSyntheticEvent(eventKey: string, event: Event) {
  let dom = event.target;
  while (dom !== null) {
    const _data = (dom as Node & Record<string, unknown>)[eventKey];
    if (_data) {
      for (const data of Object.values(_data)) {
        const stopped = config.mainEventHandler(data, event, dom);
        if (stopped) return;
      }
    }
    dom = (dom as Node).parentNode;
  }
}

const CONFIGURED_SYNTHETIC_EVENTS: { [event: string]: boolean } = {};

function setupSyntheticEvent(evName: string, eventKey: string, capture: boolean = false) {
  if (CONFIGURED_SYNTHETIC_EVENTS[eventKey]) {
    return;
  }
  document.addEventListener(evName, (event) => nativeToSyntheticEvent(eventKey, event), {
    capture,
  });
  CONFIGURED_SYNTHETIC_EVENTS[eventKey] = true;
}
