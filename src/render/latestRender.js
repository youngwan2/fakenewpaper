export const latestRender = (latestEl) => {
  const { title, link, summary } = latestEl;
  const aEl = document.createElement("a");
  aEl.setAttribute("href", link);

  aEl.insertAdjacentHTML(
    "beforeend",
    `
    <article class ="latest_content_area">
    <h4 class ="latest_content_title">${title}</h4>
    <p class ="latest_content_text">${summary}</p>
    </article>
     `
  );

  return aEl;
};
