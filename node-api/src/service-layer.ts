import { Subject, shareReplay } from 'rxjs';

const hostSender$ = new Subject();
const playerSender$ = new Subject();

const hostMessages$ = hostSender$.asObservable().pipe(shareReplay(1));
const playerMessages$ = playerSender$.asObservable().pipe(shareReplay(1));

const sendMessageToHostServer = (message: string) =>
  playerSender$.next(message);

const sendMessageToPlayerServer = (message: string) =>
  hostSender$.next(message);

const getMessagesFromHostServer = () => hostSender$.asObservable();
const getMessagesFromPlayerServer = () => hostMessages$;
