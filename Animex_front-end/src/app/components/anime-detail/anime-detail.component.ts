import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AnimeRequestService} from "../../services/anime/anime-request.service";
import {IAnime} from "../../interfaces/IAnime";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ProfileDataService} from "../../services/profile/profile-data.service";
import {ProfileRequestService} from "../../services/profile/profile-request.service";
import {IProfile} from "../../interfaces/IProfile";
import {AccRequestService} from "../../services/account/acc-request.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit {

  anime?: IAnime;
  safeVideoUrl!: SafeResourceUrl;

  isSaved: boolean = false;
  isAdmin: boolean = false;


  constructor(private actRouter: ActivatedRoute,
              private router: Router,
              private httpAnime: AnimeRequestService,
              private sanitizer: DomSanitizer,
              private profileData: ProfileDataService,
              private httpPro: ProfileRequestService,
              private httpAcc: AccRequestService,) {
  }

  ngOnInit(): void {
    const routeParams: ParamMap = this.actRouter.snapshot.paramMap;
    const animeId: number = Number(routeParams.get('animeId'));
    this.findAnimeByid(animeId);

    this.httpAcc.isAdmin$.subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    })

    if (localStorage.getItem('token')) {
      this.profileData.isProfileData$.subscribe((profileData: IProfile | null) => {
        this.isSaved = !!profileData?.animeIds?.includes(animeId);
      });
    } else {
      this.isSaved = false;
    }
  }


  findAnimeByid(id: number) {

    this.httpAnime.getId(id).subscribe({
      next: (res: IAnime) => {
        this.anime = res;
        if (this.anime) {
          this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.anime.video);
        }

      },
      error: err => {
        console.log(err.err?.message);
      }
    })

  }

  saveAnime() {
    if (!localStorage.getItem('token')) {
      Swal.fire({
        title: 'Accedi per salvare l\'anime',
        text: 'Devi accedere per continuare',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Accedi',
        cancelButtonText: 'OK',
        reverseButtons: true,
        customClass: {
          confirmButton: 'bg-[#C4BC60] hover:bg-[#B0A750] text-[#1a202c] px-4 py-2 rounded',
          cancelButton: 'bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded ml-2',
          title: 'text-gray-300',
          htmlContainer: 'text-gray-300'
        },
        background: '#283444'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
      return;
    }

    const animeId: number = this.anime!.id;

    const currentProfile: IProfile | null = this.profileData.currentProfile;

    if (!currentProfile) {
      console.error('Profilo non caricato.');
      return;
    }

    const updatedProfile: IProfile = {
      id: currentProfile.id,
      name: currentProfile.name,
      sex: currentProfile.sex,
      birthday: currentProfile.birthday,
      animeIds: [...currentProfile.animeIds, animeId]
    };

    this.httpPro.upDate(updatedProfile).subscribe({
      next: () => {
        Swal.fire({
          title: 'Anime salvato con successo!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            title: 'text-gray-300',
          },
          background: '#283444'
        });
        this.profileData.setProfile(updatedProfile);
        this.isSaved = true;
      },
      error: err => {
        console.error('Errore durante il salvataggio:', err);
        alert('Errore durante il salvataggio dell\"anime.');
      }
    })
  }


}
