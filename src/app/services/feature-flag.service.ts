import { Injectable } from '@angular/core';
import { AppConfig, AppConfigType } from '../configuration/config';
import { FeatureFlag } from '../models/feature-flag.enum';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {

  /**
   * Check if a feature is enabled
   */
  isFeatureEnabled(flag: FeatureFlag): boolean {
    const featureFlags = (AppConfig as AppConfigType).featureFlags;
    return !!(featureFlags && featureFlags[flag]);
  }

  /**
   * Check if audio playback is enabled
   */
  isAudioPlaybackEnabled(): boolean {
    return this.isFeatureEnabled(FeatureFlag.AudioPlayback);
  }
}
