  import { Injectable } from '@angular/core';
  import {BehaviorSubject} from "rxjs";
  import {IProfile} from "../../interfaces/IProfile";
  import {ProfileRequestService} from "./profile-request.service";
  import {ISignin} from "../../interfaces/ISignin";
  import {IAccPro} from "../../interfaces/IAccPro";

  @Injectable({
    providedIn: 'root'
  })
  export class ProfileDataService {

    profileData = new BehaviorSubject<IProfile | null>(null);
    isProfileData$ = this.profileData.asObservable();

    constructor(private httpPro: ProfileRequestService ) {
      this.loadProfile();
    }
    loadProfile() {
      this.httpPro.getAccountProfile().subscribe({
        next: (res: IAccPro) => {
          this.profileData.next(res?.profile);
        },
        error: err => {
          console.error("Errore nel caricamento profilo:", err);
        }
      });
    }

    get currentProfile(): IProfile | null {
      return this.profileData.value;
    }

    setProfile(profile: IProfile) {
      this.profileData.next(profile);
    }
  }
