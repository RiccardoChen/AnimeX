import {Component, HostListener} from '@angular/core';
import {AnimeRequestService} from "../../services/anime/anime-request.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {LoadingStatus} from "../create-anime/create-anime.component";
import {IAnime, IAnimeUpdate} from "../../interfaces/IAnime";
import Swal from "sweetalert2";


@Component({
  selector: 'app-update-anime',
  templateUrl: './update-anime.component.html',
  styleUrls: ['./update-anime.component.css']
})
export class UpdateAnimeComponent {

  id!: number;
  animeName: string = "";

  public isLoading: LoadingStatus = 'none';

  message?: string;
  messageStyle?: string;

  hasImage: boolean = false;
  imagePreviewUrl?: string;

  selectedCategories: string[] = [];
  categoryDropdownOpen: boolean = false;

  categories: string[] = [
    'Adventure', 'Drama', 'Action', 'Fantasy', 'Romance',
    'Isekai', 'Sports', 'Mecha', 'Supernatural',
    'Historical', 'Comedy', 'Slice of Life', 'Mystery'
  ];

  animeNameList: string[] = [];


  constructor(private httpAnime: AnimeRequestService,
              private router: Router,
              private fb: FormBuilder) {

    document.addEventListener('click', this.handleClickOutside.bind(this));
  }
  createAnimeForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    episode: [0, [Validators.required]],
    description: ['', [Validators.required]],
    year: [0, [Validators.required]],
    img: ['', [Validators.required]],
    video: ['', [Validators.required]],
  });


  suggestionAnimeName(){
    this.animeNameList = [];
    this.httpAnime.getNames(this.animeName).subscribe({
      next: (animeList: string[]) => {
        this.animeNameList = animeList;
      },
      error: err => {
        console.log(err);
        this.animeNameList = [];
      }
      }
    )
  }

  onSelectAnime(animeName: string){
    this.animeName = animeName;
    this.searchAnimeByName();
    this.animeNameList = [];
  }


  searchAnimeByName() {
    this.httpAnime.getName(this.animeName).subscribe({
      next: (anime: IAnime) => {

        this.id = anime.id;
        this.createAnimeForm.patchValue({
          name: anime.name,
          episode: anime.episode,
          description: anime.description,
          year: anime.year,
          img: anime.img,
          video: anime.video
        });
        this.imagePreviewUrl = anime.img;
        this.hasImage = !!anime.img;
        this.selectedCategories = anime.category?.split(',').map(c => c.trim()) || [];
      },
      error: err => {
        console.log(err);
      }
    });
  }

  updateAnime() {

    let { name, episode, description, year, img, video } = this.createAnimeForm.getRawValue();

    const episodeStr: string = episode.toString();
    if (episodeStr.length > 1 && episodeStr.startsWith('0')) {
      this.message = 'Il campo episodio non può iniziare con 0.';
      this.messageStyle = 'text-red-500';
      return;
    }

    description = description
      .replace(/\s+/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/"/g, "'")

    const category = this.selectedCategories.join(', ');

    const request: IAnimeUpdate = {
      id: this.id,
      name,
      category,
      episode,
      description,
      year,
      img,
      video: this.videoConverter(video),
    };

    this.isLoading = 'loading';


    this.httpAnime.upDate(request).subscribe({
      next: () => {

        Swal.fire({
          title: 'Anime aggiornato con successo!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: 'text-gray-300',
          },
          background: '#283444',
        });

        setTimeout(() => {
          this.createAnimeForm.reset();
          this.selectedCategories = [];
          this.hasImage = false;
          this.imagePreviewUrl = undefined;
          this.isLoading = 'none';
          this.back();
        }, 1500);
      },
      error: err => {
        this.isLoading = 'err';
        this.message = err?.error?.message || 'Errore generico, riprova più tardi.';
        this.messageStyle = 'text-red-500';

        setTimeout(() => {
          this.message = "";
          this.messageStyle = "";
          this.isLoading = 'none';
        }, 2500);
      }
    })
  }

  onUrlInput(event: any): void {
    const url: string = event.target.value;
    this.hasImage = !!url;
    this.imagePreviewUrl = url;
    this.createAnimeForm.patchValue({ img: url });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
        this.hasImage = true;
        this.createAnimeForm.patchValue({ img: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  private videoConverter(url: string): string {
    if (url.includes('youtu.be/')) {
      const videoId: string = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.categoryDropdownOpen = false;
    }
  }

  toggleDropdown(): void {
    this.categoryDropdownOpen = !this.categoryDropdownOpen;
  }

  selectCategory(category: string): void {
    if (!this.selectedCategories.includes(category)) {
      this.selectedCategories.push(category);
    }
  }

  removeCategory(category: string): void {
    this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
  }


  back(){
    this.router.navigate(['/animeManage']);
  }

  get buttonText(): string {
    switch(this.isLoading) {
      case 'loading': return 'Creating...';
      case 'err': return 'Error';
      default: return 'Update';
    }
  }

  get buttonIcon(): string {
    switch(this.isLoading) {
      case 'loading': return 'pi pi-spin pi-spinner';
      case 'err': return 'pi pi-times';
      default: return 'pi pi-save';
    }
  }

}
