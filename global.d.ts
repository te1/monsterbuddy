import type { Component } from 'vue';

declare module '#app' {
  interface PageMeta {
    sidebarComponent?: Component;
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    sidebarComponent?: Component;
  }
}

export {};
