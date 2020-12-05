let calculatePixelRatio = function() {
  let ctx = document.getElementById('word-canvas').getContext('2d');
  let dpr = window.devicePixelRatio || 1;
  let bsr = ctx.webkitBackingStorePixelRatio || 
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStoePixelRatio ||
            1;
  
  
  return dpr / bsr;
};

let modifyPPICanvasResolution = function(w, h, ratio) {
  if (!ratio) { ratio = PIXEL_RATIO; }
  let canvas = document.getElementById('word-canvas');
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
};

let setupCanvas = function(canvas) {
  let dpr = window.devicePixelRatio || 1;
  let rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  let ctx = canvas.getContext('2d');

  ctx.scale(dpr, dpr);

  return ctx;
};

export { 
  calculatePixelRatio,
  modifyPPICanvasResolution,
  setupCanvas,
};