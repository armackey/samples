import * as firebase from "nativescript-plugin-firebase";
import { Observable, fromObject } from 'data/observable';
import { SharedService } from "../../../Services/SharedService";

export class Fire {
    static match_left: any;
    static available_listener: any;
    static evlisteners: any = {};
    static match_listener: any;

    static share_game(game): Promise<any> {
        return firebase.setValue(`rooms/${SharedService.match_user.uid}/games/${SharedService.game_manager.room}/new-game`, game);
    }


    static remove_room_event_listeners(): Promise<any> {
        return Promise.resolve(
            Object.keys(Fire.evlisteners).map((path, index) => {
                return firebase.removeEventListeners(
                    Fire.evlisteners[path], // an Array of listeners
                    path// the path the listener was previously listening to
                )
            })
        )

    }

    static room_event_listeners(cb1, cb2, cb3): Promise<any> {
        return Promise.all([
            firebase.addValueEventListener(cb1, `/rooms/${SharedService.user.uid}/games/${SharedService.game_manager.room}/match-left-game`),
            firebase.addValueEventListener(cb2, `/rooms/${SharedService.user.uid}/games/${SharedService.game_manager.room}/new-game`),
            firebase.addValueEventListener(cb3, `/rooms/${SharedService.user.uid}/games/${SharedService.game_manager.room}/liked`),
            // firebase.addValueEventListener(cb4, '/available/' + SharedService.user.uid + '/matched-user')
        ])
            .then((eventListeners) => {
                return eventListeners.map((l, index) => {
                    Fire.evlisteners[eventListeners[index].path] = l.listeners;
                });
            })
    }
}