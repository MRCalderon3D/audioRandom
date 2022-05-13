import * as MRE from "@microsoft/mixed-reality-extension-sdk";
import { EaseCurve } from "@microsoft/mixed-reality-extension-sdk";
import App from "../app";
import { Utilities } from "./utilities";

export type ButtonDescriptor = {
	resourceId: string;
	pressValue: string;
	
	menuScale: {
		x: number; y: number; z: number;
	};
	menuRotation: {
		x: number; y: number; z: number;
	};
	menuPosition: {
		x: number; y: number; z: number;
	};
};

export enum ButtonsPad {
    button00 = 0,
    button01,
    button02,
    button03,
    button04,
    button05,
    button06,
    button07,
    button08,
    button09,
    buttonOk = 101,
    buttonDelete = 102,
    boxContainer = 103
}


export class AudioManager {

	protected static assets: MRE.Actor;
    public static destroyDuration= 5000;
    
    constructor(audiosDatabase: { [key: string]: ButtonDescriptor }) {
        AudioManager.assets = MRE.Actor.Create(App.Context);
		let x = 0;
    
        (async () => { 
            while(true)
        {
            const audio = Object.values(audiosDatabase)[Object.values(audiosDatabase).length * Math.random() | 0];
            const holder = MRE.Actor.Create(App.Context, {
                actor: {
                    parentId: AudioManager.assets.id,
                    transform: {
                        local: {
                            position: { x: 0, y: 0, z: 0 },
                        },
                    },
                },
            });
            const model = MRE.Actor.CreateFromLibrary(App.Context, {
                resourceId: audio.resourceId,
                actor: {
                    parentId: holder.id,
                },
            });
    
            await new Promise(f => setTimeout(f, AudioManager.destroyDuration));
            
            holder.destroy();

            await new Promise(f => setTimeout(f, 1000));

        }

        })();
	}
}