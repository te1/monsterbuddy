import type { Component } from 'vue';

declare module '#app' {
  interface PageMeta {
    sidebarComponent?: Component;
    mobileHeaderTitle?: string;
    back?: {
      show: boolean;
      fallback: string;
    };
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    sidebarComponent?: Component;
    mobileHeaderTitle?: string;
    back?: {
      show: boolean;
      fallback: string;
    };
  }
}

export {};
