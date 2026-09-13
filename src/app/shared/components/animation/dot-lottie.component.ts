import { AfterViewInit, Component, ElementRef, input, OnDestroy, viewChild } from '@angular/core';
import { DotLottie } from '@lottiefiles/dotlottie-web';

@Component({
  selector: 'app-dot-lottie',
  standalone: true,
  template: `
    <canvas #canvas [style.width.px]="width()" [style.height.px]="height()"></canvas>
  `,
  styles: [`
    :host { display: inline-flex; line-height: 0; }
    canvas { margin: 0 auto; }
  `],
})
export class DotLottieComponent implements AfterViewInit, OnDestroy {
  src = input.required<string>();
  loop = input(true);
  autoplay = input(true);
  width = input(190);
  height = input(190);

  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private player: DotLottie | null = null;

  ngAfterViewInit(): void {
    const canvas = this.canvas()?.nativeElement;
    if (!canvas) return;
    this.player = new DotLottie({
      canvas,
      src: this.src(),
      loop: this.loop(),
      autoplay: this.autoplay(),
    });
  }

  ngOnDestroy(): void {
    this.player?.destroy();
    this.player = null;
  }
}