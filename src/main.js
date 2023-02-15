import createSpinner from "./spinner.js";
import { topNewsRender } from "./render/topnewsrender.js";
import { latestRender } from "./render/latestRender.js";

(function () {
  //로딩 상태
  const $aside = document.getElementById('aside')
  let loading = true;
  // 좌측 상단 Top News 부분의 콘텐츠
  const renderTopNews = () => {
    const topNewsList = document.getElementById("topNewList");

    if (loading) {
      createSpinner(topNewsList);
    }
    fetch("./data/json/top.json")
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        const setData = data.articles.map((newEl) => {
          return topNewsRender(newEl, topNewsList);
        });

        topNewsList.append(...setData);
      })
      .finally(() => {
        // 로딩이 완료 되었으면 promise.finally 를 사용하여 마지막에 제거해준다.
        const spinnerArea = document.querySelector(
          ".top_news_section .spinner_area"
        );
        spinnerArea.style.display = "none";
      })
      .catch(console.error);
  };

  // 우측 상단 최신글 영역
  const renderLatestNews = () => {
    const latestNewList = document.getElementById("latest_new_list");

    fetch("./data/json/latest.json")
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        //json 데이터를 map 메서드로 순회하여 각 콘텐츠 내용별로 그려준다.
        const setData = data.articles.map((articlesEl) => {
          return latestRender(articlesEl);
        });
        // 앞서 setData에 담겨 있는 콘텐츠 내용이 담긴 a 태그 요소를 추가할 필요가
        // 부모 태그의 자식요소로 추가한다.
        latestNewList.append(...setData);
      })
      .finally(() => {
        // 로딩이 완료 되었으면 promise.finally 를 사용하여 마지막에 제거해준다.
        const spinnerArea = document.querySelector(
          ".latest_section .spinner_area"
        );
        spinnerArea.style.display = "none";
      })
      .catch(console.error);

    createSpinner(latestNewList);
  };

  //aside 템 숨기기/나타나기
  const hideBtn = document.getElementById("hide_btn");
  let hideState = false
  const hide = () => {
    $aside.classList.toggle('hide')
    hideState =!hideState
    hideState? hideBtn.innerText ="<<" : hideBtn.innerText =">>"
  };

  // 'DOMContentLoaded' : HTML 요소를 브라우저가 모두 파싱하는 즉시 실행(css, img 제외)
  document.addEventListener("DOMContentLoaded", () => {
    renderTopNews();
    renderLatestNews();
  });

  hideBtn.addEventListener("click", hide);
})();
