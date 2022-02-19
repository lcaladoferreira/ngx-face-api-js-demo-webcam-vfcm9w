import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: 'video[userMedia]'
})
export class UserMediaDirective implements OnDestroy, AfterViewInit {

  private mediaStream: Promise<MediaStream>;

  constructor(
    private el: ElementRef<HTMLVideoElement>,
  ) {
    this.mediaStream = navigator.mediaDevices.getUserMedia({ video: true });
  }

  async ngAfterViewInit() {
    this.el.nativeElement.setAttribute('autoplay', '');
    this.el.nativeElement.srcObject = await this.mediaStream;
  }

  async ngOnDestroy() {
    const mediaStream = await this.mediaStream;
    mediaStream.getTracks().forEach(track => track.stop());
  }
}