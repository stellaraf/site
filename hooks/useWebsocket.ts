import { useEffect, useState } from 'react';

type SendEvent = {
  sent: boolean;
  timeStamp: number;
};

interface UseWebSocketOptions {
  autoConnect?: boolean;
  debug?: boolean;
  onConnect?: () => void;
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
  onSend?: (event: SendEvent) => void;
}

function getReadyState(readyState: number) {
  switch (readyState) {
    case WebSocket.CONNECTING:
      return 'Connecting';
    case WebSocket.OPEN:
      return 'Open';
    case WebSocket.CLOSING:
      return 'Closing';
    case WebSocket.CLOSED:
      return 'Closed';
    default:
      return null;
  }
}

/**
 * Function to pass back for SSR, and as the default if an event callback is undefined.
 */
function fake(data?: any) {}

/**
 * Wrapper to safely run a function with arguments.
 */
function runSafely(func: (...a: any[]) => void, ...args: any[]) {
  if (typeof func === 'function') {
    try {
      func(...args);
    } catch (err) {
      console.error(err);
    }
  }
}

const defaultOptions: UseWebSocketOptions = {
  autoConnect: true,
  debug: false,
  onClose: fake,
  onError: fake,
  onOpen: fake,
  onMessage: fake,
  onSend: fake,
};

/**
 * Open & manage the lifecycle of a websocket.
 *
 * Largely copied from:
 * https://github.com/mehmetkose/react-websocket/blob/master/index.jsx
 */
export function useWebSocket(url: string, options: UseWebSocketOptions = defaultOptions) {
  const {
    autoConnect = true,
    debug = false,
    onClose = fake,
    onOpen = fake,
    onConnect = fake,
    onMessage = fake,
    onError = fake,
    onSend = fake,
  } = options;

  const [data, setData] = useState('');

  // Return empty/fake data for SSR.
  if (typeof window === 'undefined') {
    return { data, sendData: fake, connect: fake, close: fake, socketState: 'closed' };
  }

  /**
   * Log various events if debugging is enabled.
   */
  const log = (...args: any[]) => {
    if (debug) {
      console.log(...args);
    }
  };

  // Create & assign the websocket connection to state.
  const websocket = window.WebSocket && new window.WebSocket(url);
  const [sockState, setSockState] = useState<WebSocket>(websocket);

  log('WebSocket State:', getReadyState(websocket.readyState));

  /**
   * Create a new websocket if the current one is closed.
   */
  const check = () => {
    if ([WebSocket.CLOSED, WebSocket.CLOSING].includes(sockState.readyState)) {
      setSockState(new window.WebSocket(url));
    }
  };

  /**
   * Connect to the websocket and set callbacks.
   */
  const connect = () => {
    check();
    runSafely(onConnect);

    // Open Events
    sockState.onopen = (event: Event) => {
      log('Opened connection to', url);
      runSafely(onOpen, event);
    };

    // Error Events
    sockState.onerror = (event: Event) => {
      console.group('WebSocket Error');
      console.error(event);
      console.error('Closing socket');
      console.groupEnd();
      runSafely(onError, event);
    };

    // Message Events
    sockState.onmessage = (event: MessageEvent) => {
      console.log('Received message:', event.data);
      setData(event.data);
      runSafely(onMessage, event);
    };

    // Close Events
    sockState.onclose = (event: CloseEvent) => {
      log('Closed connection to', url);
      runSafely(onClose, event);
    };
  };

  /**
   * Send data to the websocket server.
   */
  const sendData = (data: string) => {
    let sent = false;
    check();
    if (sockState.readyState === WebSocket.OPEN) {
      sockState.send(data);
      sent = true;
    }
    runSafely(onSend, { sent, timeStamp: new Date().getTime() });
  };
  /**
   * Safely close the websocket connection.
   */
  const close = () => {
    if (
      sockState !== null &&
      typeof sockState.close === 'function' &&
      sockState.readyState === WebSocket.OPEN
    ) {
      sockState.close();
    }
  };
  /**
   * Open the connection on render unless otherwise specified.
   */
  useEffect(() => {
    if (autoConnect) {
      connect();
    }
    return close;
  }, []);

  return {
    data,
    sendData,
    connect,
    close,
    socketState: getReadyState(websocket.readyState)?.toLowerCase(),
  };
}
