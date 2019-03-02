export function getBoundingRect(element) {
  var style = window.getComputedStyle(element);
  var margin = {
    left: parseInt(style['margin-left']),
    right: parseInt(style['margin-right']),
    top: parseInt(style['margin-top']),
    bottom: parseInt(style['margin-bottom'])
  };
  var padding = {
    left: parseInt(style['padding-left']),
    right: parseInt(style['padding-right']),
    top: parseInt(style['padding-top']),
    bottom: parseInt(style['padding-bottom'])
  };
  var border = {
    left: parseInt(style['border-left']),
    right: parseInt(style['border-right']),
    top: parseInt(style['border-top']),
    bottom: parseInt(style['border-bottom'])
  };

  var rect = element.getBoundingClientRect();
  rect = {
    left: rect.left - margin.left,
    right: rect.right - margin.right - padding.left - padding.right,
    top: rect.top - margin.top,
    bottom:
      rect.bottom - margin.bottom - padding.top - padding.bottom - border.bottom
  };
  rect.width = rect.right - rect.left;
  rect.height = rect.bottom - rect.top;

  return rect;
}
