import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AnimeRequestService} from "../../services/anime/anime-request.service";
import {IAnime} from "../../interfaces/IAnime";
import {IPage} from "../../interfaces/IPage";
import Swal from "sweetalert2";

@Component({
  selector: 'app-delete-anime',
  templateUrl: './delete-anime.component.html',
  styleUrls: ['./delete-anime.component.css']
})
export class DeleteAnimeComponent implements OnInit{

  id!: number;

  message?: string;
  messageStyle?: string;

  animeList: IAnime[] = [];

  searchName: string = "";

  animeNameList: string[] = [];

  constructor(private router: Router,
              private httpAnime: AnimeRequestService,) {
  }

  ngOnInit(): void {
    this.getAllAnime();

  }

  getAllAnime(name: string = "", page: number = 0, accumulatedAnime: IAnime[] = []): void {
    const request = {
      name: name,
      page: page,
    };

    this.httpAnime.getAllAnime(request).subscribe({
      next: (res: IPage<IAnime>) => {
        const updatedList: IAnime[] = accumulatedAnime.concat(res.content);

        if (res.hasNext) {
          this.getAllAnime(name, page + 1, updatedList);
        } else {
          this.animeList = updatedList;
        }
      },
      error: err => {
        console.log("Errore durante il caricamento:", err);
      }
    });
  }


  showSearchSuggestions(){

    this.animeNameList = [];

    this.httpAnime.getNames(this.searchName).subscribe({
      next: (animeList: string[]) => {
        this.animeNameList = animeList;
      },
      error: err => {
        console.log(err);
      }
    }
    )
  }

  onSelectAnime(animeName: string){
    this.searchName = animeName;
    this.getAllAnime(animeName);
    this.animeNameList = [];
  }

  onClickAnime(){
    this.getAllAnime(this.searchName);
  }


  deleteAnime(id: number){
    this.httpAnime.delete(id).subscribe({
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
        });
        this.animeList = this.animeList.filter((anime: IAnime) => anime.id !== id);
      },
      error: err => {
        console.log(err?.error?.message || 'Errore generico, riprova più tardi.');
      }
      }
    );
  }


  deleteConferm(id: number){

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
        this.deleteAnime(id);
      }
    });
  }



  back(){
    this.router.navigate(['/animeManage']);
  }




}
