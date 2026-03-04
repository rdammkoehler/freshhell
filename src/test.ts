// This file bootstraps the Angular testing environment for Karma.
// The zone.js import path was updated from `zone.js/dist/zone-testing` to `zone.js/testing`
// as of zone.js 0.13.x. In Angular 17+, the karma builder initialises the test environment
// automatically via the `polyfills` array in angular.json; this file is retained for
// compatibility with any tooling that still references it directly.
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
