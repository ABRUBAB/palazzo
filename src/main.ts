import './styles/tokens.css';
import './styles/base.css';
import './styles/surfaces.css';
import './styles/layout.css';
import './styles/explorer.css';
import './styles/sections.css';
import './styles/overlays.css';

import { initBookingDrawer, openBookingDrawer, renderBookingDrawer } from './components/bookingDrawer';
import { initCalculator, renderCalculator } from './components/calculator';
import { initComparer, renderComparer } from './components/comparer';
import { initDatePicker, openDatePicker } from './components/datePicker';
import { initFloorExplorer, renderFloorExplorer } from './components/floorExplorer';
import { initGalleryAndExperiences, renderGalleryAndExperiences } from './components/gallery';
import { initHeader, renderHeader } from './components/header';
import { initHero, renderHero } from './components/hero';
import { initLocationMap, renderLocationMap } from './components/locationMap';
import { initOverlays, openContactModal, openLegalModal, renderOverlays } from './components/overlays';
import { getState, subscribe } from './state/store';
import { attachMagneticButtons, initScrollAtmosphere, initScrollReveals } from './utils/motion';

function bootstrap(): void {
  document.documentElement.lang = getState().lang;

  initDatePicker();
  initOverlays();
  initHeader(() => openBookingDrawer(1));
  initHero(
    (anchor) => openDatePicker(anchor),
    () => {
      document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' });
    }
  );
  initFloorExplorer(() => openBookingDrawer(1));
  initComparer();
  initCalculator(
    (anchor) => openDatePicker(anchor),
    () => openBookingDrawer(1)
  );
  initGalleryAndExperiences();
  initLocationMap(() => openContactModal());
  initBookingDrawer(
    (anchor) => openDatePicker(anchor),
    (key) => openLegalModal(key)
  );

  document.getElementById('footer-concierge-btn')?.addEventListener('click', openContactModal);

  subscribe(() => {
    renderHeader();
    renderHero();
    renderFloorExplorer();
    renderComparer();
    renderCalculator();
    renderGalleryAndExperiences();
    renderLocationMap();
    renderBookingDrawer();
    renderOverlays();
  });

  initScrollReveals();
  initScrollAtmosphere();
  attachMagneticButtons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
