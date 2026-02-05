import {Component, OnInit} from '@angular/core';
import {ProfileDataService} from "../../services/profile/profile-data.service";
import {IAnime} from "../../interfaces/IAnime";
import {AnimeRequestService} from "../../services/anime/anime-request.service";
import {concatMap, from} from "rxjs";
import {IProfile} from "../../interfaces/IProfile";
import {ProfileRequestService} from "../../services/profile/profile-request.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  animeList: IAnime[] = [];

  isBtnActive: boolean = false;

  constructor(private profileData: ProfileDataService,
              private httpAnime: AnimeRequestService,
              private httpPro: ProfileRequestService) {
  }

  ngOnInit(): void {
    this.profileData.isProfileData$.subscribe((profile: IProfile | null) => {
      const ids: number[] = profile?.animeIds || [];
      this.animeList = [];

      from(ids).pipe(
        concatMap((id: number) => this.httpAnime.getId(id))
      ).subscribe({
        next: (anime: IAnime) => this.animeList.push(anime),
        error: (err) => console.error("Errore:", err),
      });
    });
  }

  switchBtn() {
    this.isBtnActive = !this.isBtnActive;
  }

  removeAnime(id: number) {

    const currentProfile: IProfile | null = this.profileData.currentProfile

    if (!currentProfile) {
      console.error('Profilo non caricato.');
      return;
    }

    let animeIds: number[] = currentProfile.animeIds.filter((aid: number) => aid !== id);

    const updatedProfile: IProfile = {
      id: currentProfile.id,
      name: currentProfile.name,
      sex: currentProfile.sex,
      birthday: currentProfile.birthday,
      animeIds: animeIds
    };

    this.httpPro.upDate(updatedProfile).subscribe({
      next: () => {
        Swal.fire({
          title: 'Anime cancellato con successo!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: 'text-gray-300',
          },
          background: '#283444',
        })
        this.profileData.setProfile(updatedProfile);
        this.animeList = this.animeList.filter((anime: IAnime) => anime.id !== id);
      },
      error: err => {
        console.error('Errore durante la rimozione:', err);
        alert('Errore durante la rimozione dell\'anime.');
      }
    });
  }

  removeConferm(id: number){
    Swal.fire({
      title: "Sei sicuro di cancellare questo anime?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      reverseButtons: true,
      confirmButtonText: "Cancella",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeAnime(id);
      }
    });
  }



}
