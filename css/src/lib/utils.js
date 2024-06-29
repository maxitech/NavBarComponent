function scrollIntoView(sectionId, delay = 300) {
  setTimeout(() => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  }, delay);
}

export { scrollIntoView };
