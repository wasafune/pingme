const domWithClassNext = '<div class="next"></div>';
const domWithoutClassNext = '<div class="before"></div>';
const domWithRepeatedClass3Times = '<img class="mada"/><br class="mada"/><input class="mada">';
const domWithRepeatedTag3Times = '<div></div>'.repeat(3);
const domToExtractData = `<div class="manga_text">
<div class="title"><a href="//www.mangahere.cc/manga/hunter_x_hunter/" title="Hunter X Hunter">Hunter X Hunter</a></div>
<p><i class="star-full"></i><i class="star-full"></i><i class="star-full"></i><i class="star-full"></i><i class="star-full"></i><span>4.90</span></p>
<p>Action, Adventure, Comedy</p>
<p><label>Views:</label>202193</p>
<p><i class="new_red"></i><a class="color_0077" title="Hunter X Hunter 380" href="//www.mangahere.cc/manga/hunter_x_hunter/v30/c380/">Hunter X Hunter 380</a></p>
</div>`;

module.exports = {
  domWithClassNext,
  domWithoutClassNext,
  domWithRepeatedClass3Times,
  domWithRepeatedTag3Times,
  domToExtractData,
};
