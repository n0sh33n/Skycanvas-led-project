function takeSnapshot() {
  const link = document.createElement('a');
  link.download = 'skycanvas_snapshot.png';
  link.href = renderer.domElement.toDataURL('image/png');
  link.click();
}
