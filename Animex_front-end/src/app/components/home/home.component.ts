import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeRequestService } from '../../services/anime/anime-request.service';
import { IAnime, IAnimeRank, IAnimeSample } from '../../interfaces/IAnime';
import { IPage } from '../../interfaces/IPage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  categories: string[] = ['', 'Adventure', 'Drama', 'Action', 'Isekai'];
  animeByCategory: { [category: string]: IAnimeSample[] } = {};

  animeRankList: IAnime[] = [];

  images = [
    {
      url: 'https://preview.redd.it/art-new-bleach-poster-of-ichigo-from-jump-giga-with-art-by-v0-asej2v8xg6w91.jpg?width=1080&crop=smart&auto=webp&s=0387b82d43496265233d6117ad8efecc5d762449',
      name: 'Bleach',
      alt: 'Bleach image',
    },
    {
      url: 'https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/06/ENUS_CyberpunkE_S1_Main_Horizontal_16x9_RGB_PRE.jpg',
      name: 'Cyberpunk 2077 Edgerunners',
      alt: 'cyberpunk 2077 image',
    },
    {
      url: 'https://i5.walmartimages.com/seo/Fullmetal-Alchemist-Brotherhood-Anime-Poster-Wall-Decor-12x18-inches-30-x-46-cm_be312109-eae2-4a08-aa1e-5075222d3317.50e9d871a37ba5e3f99c383c5eb1c2ca.jpeg',
      name: 'Full Metal Alchemist: Brotherhood',
      alt: 'Full Metal Archimist image',
    },
    {
      url: 'https://a.storyblok.com/f/178900/3840x2160/fbf75d51df/my-hero-academia-final-season-key-art-wide.png/m/1200x0/filters:quality(95)format(webp)',
      name: 'My Hero Academia',
      alt: 'My Hero Academy image',
    },
    {
      url: 'https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2025/02/Arcane-Poster-Horizontal-1.png?fit=1920%2C1080&ssl=1',
      name: 'Arcane Season 2',
      alt: 'Arcane image',
    },
    {
      url: 'https://xonomax.com/cdn/shop/files/750187.jpg?v=1721568679',
      name: 'Fire Force Season 3',
      alt: 'Fire Force Image',
    },
  ];

  currentIndex = 0;
  private intervalId: any;

  constructor(
    private router: Router,
    private httpAnime: AnimeRequestService,
  ) {}

  ngOnInit(): void {
    this.startAutoSlide();
    this.loadAnimesByCategory();
    this.animeRank();
  }

  ngOnDestroy(): void {
    this.clearAutoSlide();
  }

  prevImage(): void {
    this.resetAutoSlide();
    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
  }

  nextImage(): void {
    this.resetAutoSlide();
    this.currentIndex =
      this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
  }

  goToImage(index: number): void {
    this.resetAutoSlide();
    this.currentIndex = index;
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextImageSimple();
    }, 3000);
  }

  nextImageSimple(): void {
    this.currentIndex =
      this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
  }

  clearAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resetAutoSlide(): void {
    this.clearAutoSlide();
    this.startAutoSlide();
  }

  loadAnimesByCategory(): void {
    this.categories.forEach((category) => {
      const params = { category: category, size: 8 };

      this.httpAnime.getAllAnime(params).subscribe({
        next: (response) => {
          this.animeByCategory[category] = response.content;
        },
        error: (error) => {
          console.error(
            `Errore nel caricamento della categoria ${category}:`,
            error,
          );
          this.animeByCategory[category] = [];
        },
      });
    });
  }

  viewMore(category: string): void {
    this.router
      .navigate(['/animeHome'], { queryParams: { category: category } })
      .then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
  animeRank() {
    this.httpAnime.animeRank().subscribe({
      next: (res) => {
        this.animeRankList = res.content;
      },
      error: () => {
        console.log('I dati no sono stati caricati con successo');
      },
    });
  }

  getRankClasses(i: number): string {
    if (i === 0)
      return 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-black';
    if (i === 1)
      return 'bg-gradient-to-br from-gray-300 to-gray-500 text-black';
    if (i === 2)
      return 'bg-gradient-to-br from-amber-400 to-amber-600 text-white';
    return 'bg-[#2a3449] text-gray-300';
  }
}
