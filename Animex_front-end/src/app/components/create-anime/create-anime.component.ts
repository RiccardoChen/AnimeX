import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {IAnimeCreate} from "../../interfaces/IAnime";
import {AnimeRequestService} from "../../services/anime/anime-request.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
export type LoadingStatus = 'none' | 'loading' | 'suc' | 'err';

@Component({
  selector: 'app-create-anime',
  templateUrl: './create-anime.component.html',
  styleUrls: ['./create-anime.component.css']
})
export class CreateAnimeComponent {

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


  constructor(private httpAnime: AnimeRequestService,
              private fb: FormBuilder,
              private router: Router) {
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

  createAnime() {
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


    // const validImgExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    // const imgValid = validImgExtensions.some(ext => img.toLowerCase().endsWith(ext));
    // if (!imgValid && !img.startsWith('data:image')) {
    //   this.message = 'L\'immagine deve essere un file con estensione valida (.jpg, .png, .gif...)';
    //   this.messageStyle = 'text-red-500';
    //   return;
    // }
    const category: string = this.selectedCategories.join(', ');

    const request: IAnimeCreate = {
      name,
      category,
      episode,
      description,
      year,
      img,
      video: this.videoConverter(video),
    };

    this.isLoading = 'loading';

    this.httpAnime.create(request).subscribe({
      next: () => {

        Swal.fire({
          title: 'Anime creato con successo!',
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
      },
    });
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

  back() {
    this.router.navigate(['/animeManage']);
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
    this.selectedCategories = this.selectedCategories.filter((cat: string) => cat !== category);
  }

  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.categoryDropdownOpen = false;
    }
  }

  get buttonText(): string {
    switch(this.isLoading) {
      case 'loading': return 'Creating...';
      case 'err': return 'Error';
      default: return 'Create Anime';
    }
  }

  get buttonIcon(): string {
    switch(this.isLoading) {
      case 'loading': return 'pi pi-spin pi-spinner';
      case 'err': return 'pi pi-times';
      default: return 'pi pi-plus';
    }
  }




}
