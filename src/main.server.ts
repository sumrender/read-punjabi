import { bootstrapApplication } from '@angular/platform-browser';
import type { PlatformRef } from '@angular/core';
import { App } from './app/app';
import { appConfig } from './app/app.config';

export default function (context: { platformRef: PlatformRef }) {
  return bootstrapApplication(App, appConfig, {
    platformRef: context.platformRef,
  });
}
