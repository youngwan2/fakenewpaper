export const topNewsRender = (articleEl) => {
  const { link, title, summary, thumbnailImage } = articleEl;
  const aEl = document.createElement("a");

  aEl.setAttribute("href", link);
  aEl.insertAdjacentHTML(
    "beforeend",
    `<article class="content_area">
        <div class ="text_area">
          <h2>${title}</h2>
          <p>${summary}</p>
        </div>
        <img 
            class ="thumbnail"
            src ='${thumbnailImage}' alt='news_image'>
     </article>
    `
  );

  return aEl;
};
