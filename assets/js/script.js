const { heroAttractionSelectors, initInteractions } = window.SerenAIInteractions;
const { initHeroCanvas } = window.SerenAIHeroCanvas;

initInteractions();
initHeroCanvas({ heroAttractionSelectors });
