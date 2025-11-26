import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioElement: HTMLAudioElement | null = null;
  private currentAudioSrc: string | null = null;

  /**
   * Play audio from the given source
   */
  play(audioSrc: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // If same audio is already playing, restart it
      if (this.audioElement && this.currentAudioSrc === audioSrc) {
        this.audioElement.currentTime = 0;
        this.audioElement.play().then(resolve).catch(reject);
        return;
      }

      // Stop current audio if playing
      this.stop();

      // Create new audio element
      this.audioElement = new Audio(audioSrc);
      this.currentAudioSrc = audioSrc;

      // Preload for faster playback
      this.audioElement.preload = 'auto';

      // Handle successful playback
      const canPlayHandler = () => {
        this.audioElement?.play().then(resolve).catch(reject);
      };
      this.audioElement.addEventListener('canplaythrough', canPlayHandler, { once: true });

      // Handle errors
      const errorHandler = () => {
        reject(new Error('Failed to load audio'));
      };
      this.audioElement.addEventListener('error', errorHandler, { once: true });

      // Load the audio
      this.audioElement.load();
    });
  }

  /**
   * Stop current audio playback
   */
  stop(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement = null;
      this.currentAudioSrc = null;
    }
  }

  /**
   * Pause current audio playback
   */
  pause(): void {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  /**
   * Check if audio is currently playing
   */
  isPlaying(): boolean {
    return this.audioElement !== null && !this.audioElement.paused;
  }
}

