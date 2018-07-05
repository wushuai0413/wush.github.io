/**
 * =============================================================================
 *  Scroll spy 滚动监听
 * =============================================================================
 *
 *  当滚动至目标区域时，激活导航中相应链接的样式
 *  Use ECMAScript 5: Array.map, Array.filter
 *  Use DOM 3: querySelectorAll, dataset
 *
 * =============================================================================
 *
 * @author dondevi
 * @create 2014-06-25
 *
 * @update 2017-04-12 dondevi
 *   1.Rebuild
 * @update 2017-09-20 dondevi
 *   1.Rebuild: getTargetsRect()
 *
 */

(function (window, document) {

  "use strict";

  /**
   * Scroll Spy
   * @param  {String} anchorSelector
   * @param  {Number} spyOffset
   * @param  {String} activeClass
   */
  window.scrollSpy = function (anchorSelector, spyOffset, activeClass) {

    anchorSelector = anchorSelector  || "a";    // Select "<a>" elements to spy
    spyOffset      = spyOffset       || 100;       // Offset from top side of viewport
    activeClass    = activeClass     || "active";   // Class name for active state

    var anchors     = getElements(anchorSelector);
    var targetsRect = getTargetsRect(spyOffset);

    // Listen scroll event
    var timer = -1;
    window.onscroll = function (event) {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        checkAnchorActive(anchors, targetsRect, spyOffset, activeClass);
      }, 300);
    };

    // The first time
    window.onscroll();

  };



  /**
   * Check which anchor show be actived
   */
  function checkAnchorActive (anchors, targetsRect, spyOffset, activeClass) {

    var scrollTop = getScrollTop(spyOffset);

    anchors.forEach(function (anchor) {
      var targetId   = anchor.hash.slice(1);
      var targetRect = targetsRect[targetId];
      if (targetRect.top < scrollTop && targetRect.bottom > scrollTop) {
        anchor.classList.add(activeClass);
        anchor.scrollIntoViewIfNeeded();
      } else if (anchor) {
        anchor.classList.remove(activeClass);
      }
    });

  }

  /**
   * Get position of each target elements
   * @return {Object}
   */
  function getTargetsRect () {
    var targets = document.querySelectorAll("[id]");

    var result = {};
    var preId  = null;
    var bottom = document.body.scrollHeight;

    [].forEach.call(targets, function (target) {
      if (!target.offsetParent) {
        return;
      }
      var targetId  = target.id;
      var pageTop = target.offsetTop;
      result[targetId] = { top: pageTop, bottom: bottom };
      if (preId) {
        result[preId].bottom = pageTop;
      }
      preId = targetId;
    });

    return result;
  }

  /**
   * Get menu anchors
   * @param  {String}     selector
   * @return {Array[DOM]}
   */
  function getElements (selector) {
    var elements = document.querySelectorAll(selector);
    return toArray(elements);
  }

  /**
   * Get current scroll top
   * @param  {Number} offset
   * @return {Array}
   */
  function getScrollTop (offset) {
    var scrollTop = document.body.scrollTop ||
                    document.documentElement.scrollTop;
    return scrollTop + (offset || 0);
  }

  /**
   * Convert array-like object to array
   * @param  {Object} arrayLike
   * @return {Array}
   */
  function toArray (arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  }


})(window, document);
