/* ============================================================
   しっぽ便り｜JavaScript
   ------------------------------------------------------------
   このファイルは以下の3つのことだけをしています。
   1. スマートフォン用メニュー（ハンバーガーボタン）の開閉
   2. 画像ファイルが見つからないときに、やさしい表示に切り替える
   3. 「ページの先頭へ戻る」ボタンの表示・非表示

   基本的に、このファイルを編集する必要はありません。
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ------------------------------------------------------------
     1. スマートフォン用メニューの開閉
     ------------------------------------------------------------ */
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("globalNav");

  if (menuBtn && nav) {

    // ボタンを押すとメニューを開閉します
    menuBtn.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      menuBtn.classList.toggle("is-open", isOpen);
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuBtn.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    });

    // メニューの項目を押したら、メニューを閉じます
    var navLinks = nav.querySelectorAll("a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuBtn.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "メニューを開く");
      });
    });
  }


  /* ------------------------------------------------------------
     2. 画像が見つからないときの表示
     ------------------------------------------------------------
     画像の読み込みに失敗したら、画像を包んでいる箱に
     「is-missing」クラスを付けます。
     （見た目の設定は style.css の「3. 写真がまだないときの見た目」）
     ------------------------------------------------------------ */
  var images = document.querySelectorAll("img");

  images.forEach(function (img) {

    function markMissing() {
      var box = img.parentElement;
      if (box) {
        box.classList.add("is-missing");
      }
    }

    // まだ読み込み中の画像 → 失敗したときにマーク
    img.addEventListener("error", markMissing);

    // すでに読み込みが終わっていて失敗していた画像 → いますぐマーク
    if (img.complete && img.naturalWidth === 0) {
      markMissing();
    }
  });


  /* ------------------------------------------------------------
     3. 「ページの先頭へ戻る」ボタン
     ------------------------------------------------------------ */
  var toTop = document.getElementById("toTop");

  if (toTop) {
    window.addEventListener("scroll", function () {
      // 400px より下にスクロールしたら表示します
      if (window.scrollY > 400) {
        toTop.classList.add("is-show");
      } else {
        toTop.classList.remove("is-show");
      }
    }, { passive: true });
  }

});
