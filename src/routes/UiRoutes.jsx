import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const UiAccordion = lazy(() => import('../pages/ui-accordion'));
const UiAlerts = lazy(() => import('../pages/ui-alerts'));
const UiAvatar = lazy(() => import('../pages/ui-avatar'));
const UiBadges = lazy(() => import('../pages/ui-badges'));
const UiBorders = lazy(() => import('../pages/ui-borders'));
const UiBreadcrumb = lazy(() => import('../pages/ui-breadcrumb'));
const UiButtonsGroup = lazy(() => import('../pages/ui-buttons-group'));
const UiButtons = lazy(() => import('../pages/ui-buttons'));
const UiCards = lazy(() => import('../pages/ui-cards'));
const UiCarousel = lazy(() => import('../pages/ui-carousel'));
const UiClipboard = lazy(() => import('../pages/ui-clipboard'));
const UiCollapse = lazy(() => import('../pages/ui-collapse'));
const UiColors = lazy(() => import('../pages/ui-colors'));
const UiCounter = lazy(() => import('../pages/ui-counter'));
const UiDragDrop = lazy(() => import('../pages/ui-drag-drop'));
const UiDropdowns = lazy(() => import('../pages/ui-dropdowns'));
const UiGrid = lazy(() => import('../pages/ui-grid'));
const UiImages = lazy(() => import('../pages/ui-images'));
const UiLightbox = lazy(() => import('../pages/ui-lightbox'));
const UiLinks = lazy(() => import('../pages/ui-links'));
const UiListGroup = lazy(() => import('../pages/ui-list-group'));
const UiMedia = lazy(() => import('../pages/ui-media'));
const UiModals = lazy(() => import('../pages/ui-modals'));
const UiNavTabs = lazy(() => import('../pages/ui-nav-tabs'));
const UiOffcanvas = lazy(() => import('../pages/ui-offcanvas'));
const UiPagination = lazy(() => import('../pages/ui-pagination'));
const UiPlaceholders = lazy(() => import('../pages/ui-placeholders'));
const UiPopovers = lazy(() => import('../pages/ui-popovers'));
const UiProgress = lazy(() => import('../pages/ui-progress'));
const UiRangeslider = lazy(() => import('../pages/ui-rangeslider'));
const UiRating = lazy(() => import('../pages/ui-rating'));
const UiRatio = lazy(() => import('../pages/ui-ratio'));
const UiRibbon = lazy(() => import('../pages/ui-ribbon'));
const UiScrollbar = lazy(() => import('../pages/ui-scrollbar'));
const UiScrollspy = lazy(() => import('../pages/ui-scrollspy'));
const UiSortable = lazy(() => import('../pages/ui-sortable'));
const UiSpinner = lazy(() => import('../pages/ui-spinner'));
const UiStickynote = lazy(() => import('../pages/ui-stickynote'));
const UiSweetalerts = lazy(() => import('../pages/ui-sweetalerts'));
const UiSwiperjs = lazy(() => import('../pages/ui-swiperjs'));
const UiTextEditor = lazy(() => import('../pages/ui-text-editor'));
const UiTimeline = lazy(() => import('../pages/ui-timeline'));
const UiToasts = lazy(() => import('../pages/ui-toasts'));
const UiTooltips = lazy(() => import('../pages/ui-tooltips'));
const UiTypography = lazy(() => import('../pages/ui-typography'));
const UiUtilities = lazy(() => import('../pages/ui-utilities'));
const UiVideo = lazy(() => import('../pages/ui-video'));

const UiRoutes = () => (
  <Routes>
    {/* Actual UI component routes (Relative to /ui) */}
    <Route path="accordion" element={<UiAccordion />} />
    <Route path="alerts" element={<UiAlerts />} />
    <Route path="avatar" element={<UiAvatar />} />
    <Route path="badges" element={<UiBadges />} />
    <Route path="borders" element={<UiBorders />} />
    <Route path="breadcrumb" element={<UiBreadcrumb />} />
    <Route path="buttons-group" element={<UiButtonsGroup />} />
    <Route path="buttons" element={<UiButtons />} />
    <Route path="cards" element={<UiCards />} />
    <Route path="carousel" element={<UiCarousel />} />
    <Route path="clipboard" element={<UiClipboard />} />
    <Route path="collapse" element={<UiCollapse />} />
    <Route path="colors" element={<UiColors />} />
    <Route path="counter" element={<UiCounter />} />
    <Route path="drag-drop" element={<UiDragDrop />} />
    <Route path="dropdowns" element={<UiDropdowns />} />
    <Route path="grid" element={<UiGrid />} />
    <Route path="images" element={<UiImages />} />
    <Route path="lightbox" element={<UiLightbox />} />
    <Route path="links" element={<UiLinks />} />
    <Route path="list-group" element={<UiListGroup />} />
    <Route path="media" element={<UiMedia />} />
    <Route path="modals" element={<UiModals />} />
    <Route path="nav-tabs" element={<UiNavTabs />} />
    <Route path="offcanvas" element={<UiOffcanvas />} />
    <Route path="pagination" element={<UiPagination />} />
    <Route path="placeholders" element={<UiPlaceholders />} />
    <Route path="popovers" element={<UiPopovers />} />
    <Route path="progress" element={<UiProgress />} />
    <Route path="rangeslider" element={<UiRangeslider />} />
    <Route path="rating" element={<UiRating />} />
    <Route path="ratio" element={<UiRatio />} />
    <Route path="ribbon" element={<UiRibbon />} />
    <Route path="scrollbar" element={<UiScrollbar />} />
    <Route path="scrollspy" element={<UiScrollspy />} />
    <Route path="sortable" element={<UiSortable />} />
    <Route path="spinner" element={<UiSpinner />} />
    <Route path="stickynote" element={<UiStickynote />} />
    <Route path="sweetalerts" element={<UiSweetalerts />} />
    <Route path="swiperjs" element={<UiSwiperjs />} />
    <Route path="text-editor" element={<UiTextEditor />} />
    <Route path="timeline" element={<UiTimeline />} />
    <Route path="toasts" element={<UiToasts />} />
    <Route path="tooltips" element={<UiTooltips />} />
    <Route path="typography" element={<UiTypography />} />
    <Route path="utilities" element={<UiUtilities />} />
    <Route path="video" element={<UiVideo />} />
  </Routes>
);

export default UiRoutes;
